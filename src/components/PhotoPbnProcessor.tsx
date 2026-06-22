import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Upload, HelpCircle, Eye, Sliders, Calendar, HelpCircle as InfoIcon, Check, Send } from 'lucide-react';
import { PbnPhotoSize } from '../types';

const SIZE_PRESETS = [
  { id: '30x40', name: '30 × 40 см', desc: 'Уютный размер', basePrice: 1950 },
  { id: '40x50', name: '40 × 50 см', desc: 'Классический стандарт', basePrice: 2450 },
  { id: '50x70', name: '50 × 70 см', desc: 'Премиум галерея', basePrice: 3250 },
];

export default function PhotoPbnProcessor() {
  const [selectedSize, setSelectedSize] = useState<PbnPhotoSize>('40x50');
  const [colorsCount, setColorsCount] = useState<number>(36);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [viewMode, setViewMode] = useState<'original' | 'pbn'>('pbn');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load a beautiful default couple template on start if no image is uploaded yet
  useEffect(() => {
    const defaultImg = new Image();
    defaultImg.crossOrigin = 'anonymous';
    defaultImg.src = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop';
    defaultImg.onload = () => {
      setOriginalImage(defaultImg);
      setImageSrc(defaultImg.src);
    };
  }, []);

  // Canvas processing algorithm (Posterization & Contouring)
  useEffect(() => {
    if (!originalImage || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    setIsProcessing(true);
    const canvas = canvasRef.current;
    
    // Scale image down slightly for real-time performance inside bounds
    const maxDim = 400;
    let width = originalImage.naturalWidth || originalImage.width;
    let height = originalImage.naturalHeight || originalImage.height;

    if (width > maxDim || height > maxDim) {
      if (width > height) {
        height = Math.round((height * maxDim) / width);
        width = maxDim;
      } else {
        width = Math.round((width * maxDim) / height);
        height = maxDim;
      }
    }

    canvas.width = width;
    canvas.height = height;

    // Draw original image
    ctx.drawImage(originalImage, 0, 0, width, height);

    if (viewMode === 'pbn') {
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;

      // 1. Posterization: cluster colors
      const levels = Math.min(Math.max(Math.floor(colorsCount / 6), 3), 8); // Cluster size based on color choices
      const step = Math.floor(255 / levels);

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Group into buckets
        data[i] = Math.round(r / step) * step;
        data[i + 1] = Math.round(g / step) * step;
        data[i + 2] = Math.round(b / step) * step;
      }
      ctx.putImageData(imgData, 0, 0);

      // 2. Edge Detection & Sketches
      // Copy image data to detect borders
      const outlineData = ctx.getImageData(0, 0, width, height);
      const outlinePixels = outlineData.data;
      const finalImgData = ctx.createImageData(width, height);
      const finalPixels = finalImgData.data;

      // Simple Sobel edge & coloring overlay
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const idx = (y * width + x) * 4;
          
          // Neighbor pixels
          const rightIdx = (y * width + (x + 1)) * 4;
          const bottomIdx = ((y + 1) * width + x) * 4;

          // Color delta
          const dr = Math.abs(outlinePixels[idx] - outlinePixels[rightIdx]);
          const dg = Math.abs(outlinePixels[idx + 1] - outlinePixels[rightIdx + 1]);
          const db = Math.abs(outlinePixels[idx + 2] - outlinePixels[rightIdx + 2]);
          
          const drb = Math.abs(outlinePixels[idx] - outlinePixels[bottomIdx]);
          const dgb = Math.abs(outlinePixels[idx + 1] - outlinePixels[bottomIdx + 1]);
          const dbb = Math.abs(outlinePixels[idx + 2] - outlinePixels[bottomIdx + 2]);

          const diff = Math.max(dr, dg, db, drb, dgb, dbb);

          if (diff > 25) {
            // Draw slate contour
            finalPixels[idx] = 70;
            finalPixels[idx + 1] = 70;
            finalPixels[idx + 2] = 70;
            finalPixels[idx + 3] = 200; // Visible contour
          } else {
            // Keep pastel colored background with a bit of opacity to feel like a numbering draft
            finalPixels[idx] = Math.floor(outlinePixels[idx] * 0.45 + 130);
            finalPixels[idx + 1] = Math.floor(outlinePixels[idx + 1] * 0.45 + 130);
            finalPixels[idx + 2] = Math.floor(outlinePixels[idx + 2] * 0.45 + 130);
            finalPixels[idx + 3] = 255;
          }
        }
      }
      ctx.putImageData(finalImgData, 0, 0);

      // 3. Draw random little numbers over cells
      ctx.fillStyle = 'rgba(60,60,60,0.65)';
      ctx.font = '7px Courier New';
      const cellGap = 16;
      for (let y = cellGap; y < height - cellGap; y += cellGap + Math.floor(Math.random() * 8)) {
        for (let x = cellGap; x < width - cellGap; x += cellGap + Math.floor(Math.random() * 8)) {
          const colorNumber = Math.floor((x + y) % colorsCount) + 1;
          ctx.fillText(colorNumber.toString(), x, y);
        }
      }
    }
    setIsProcessing(false);
  }, [originalImage, colorsCount, viewMode]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        setOriginalImage(img);
        setImageSrc(event.target?.result as string);
        setViewMode('pbn');
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const currentPreset = SIZE_PRESETS.find((p) => p.id === selectedSize) || SIZE_PRESETS[1];
  const prepayment = Math.round(currentPreset.basePrice * 0.5);

  const handleWhatsAppOrder = () => {
    const textDesc = `Добрый день! Хочу сделать заказ на Картину по Номерам ПО ФОТО:
📸 *Индивидуальное фото заказчика* (отправлено в диалог)
📏 *Желаемый размер*: ${currentPreset.name} (${currentPreset.desc})
🎨 *Количество цветов*: ${colorsCount} цветов
⏳ *Срок изготовления*: 12-18 дней
💰 *Полная стоимость*: ${currentPreset.basePrice} сом
💳 *Предоплата 50%*: ${prepayment} сом (отмена невозможна)
🚚 *Доставка по Бишкеку*: Бесплатная`;

    const encodedText = encodeURIComponent(textDesc);
    window.open(`https://wa.me/996707323232?text=${encodedText}`, '_blank');
  };

  return (
    <div className="bg-[#fbfcfa] rounded-3xl p-6 md:p-10 border border-stone-100/80" id="photo-pbn">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-10 font-sans">
          <span className="px-3 py-1 text-xs font-semibold bg-brand-terracotta/10 text-brand-brick rounded-full">Ваше персональное чудо</span>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mt-3 mb-2">
            Картина по номерам по вашей фотографии!
          </h3>
          <p className="text-stone-500 max-w-xl mx-auto text-sm">
            Загрузите свой любимый снимок, и мы превратим его в подробный художественый холст. Оживите воспоминания своими руками!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Upload and Real-time simulator */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            {/* Simulator Window */}
            <div className="w-full bg-white rounded-2xl p-4 border border-stone-200 shadow-sm relative">
              <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-stone-100">
                <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                  <Sliders size={13} className="text-brand-terracotta" />
                  Визуализатор холста
                </span>
                
                {/* View toggle original / sketch */}
                <div className="flex bg-stone-100 p-0.5 rounded-lg">
                  <button
                    onClick={() => setViewMode('pbn')}
                    className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 ${
                      viewMode === 'pbn' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'
                    }`}
                  >
                    <Eye size={12} />
                    Схема
                  </button>
                  <button
                    onClick={() => setViewMode('original')}
                    className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 ${
                      viewMode === 'original' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'
                    }`}
                  >
                    Оригинал
                  </button>
                </div>
              </div>

              {/* Target Canvas Container */}
              <div className="aspect-square bg-stone-55 rounded-xl overflow-hidden flex items-center justify-center border border-stone-100 relative group">
                <canvas 
                  ref={canvasRef} 
                  className={`max-w-full max-h-full object-contain rounded-md transition-all duration-300 ${
                    isProcessing ? 'opacity-30' : 'opacity-100'
                  }`}
                  style={{ display: viewMode === 'pbn' ? 'block' : 'none' }}
                />

                {viewMode === 'original' && imageSrc && (
                  <img 
                    src={imageSrc} 
                    alt="Original Upload preview" 
                    referrerPolicy="no-referrer"
                    className="max-w-full max-h-full object-contain rounded-md"
                  />
                )}

                {isProcessing && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-stone-300 border-t-brand-terracotta animate-spin" />
                  </div>
                )}
              </div>

              {/* Color details counter */}
              <div className="mt-3.5 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span>Палитра картины: <strong className="text-brand-brick font-serif">{colorsCount} цветов</strong></span>
                <span className="italic">12–18 дней на изготовление</span>
              </div>
            </div>

            {/* Drag & Drop File Upload Area */}
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`w-full mt-4 p-5 rounded-xl border-2 border-dashed text-center cursor-pointer transition-all ${
                isDragging 
                  ? 'border-brand-terracotta bg-brand-terracotta/5' 
                  : 'border-stone-300 hover:border-brand-terracotta hover:bg-stone-100/50'
              }`}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept="image/*" 
                className="hidden" 
              />
              <Upload size={24} className="mx-auto text-stone-400 mb-2" />
              <p className="text-xs font-bold text-stone-700">Перетащите сюда фото или нажмите для загрузки</p>
              <p className="text-[10px] text-stone-400 mt-1">Поддерживаются форматы JPG, PNG. Рекомендуется светлый четкий кадр.</p>
            </div>

          </div>

          {/* Right panel: Custom size prices, terms, disclaimers */}
          <div className="lg:col-span-6 flex flex-col justify-between self-stretch">
            <div>
              <span className="text-[10px] font-bold text-brand-brick uppercase tracking-wider block mb-2">Настройка комплекта</span>
              <h4 className="text-xl font-bold text-stone-900 mb-4">Выберите размеры и детализации:</h4>

              {/* Preset Sizes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                {SIZE_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedSize(preset.id as PbnPhotoSize)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      selectedSize === preset.id
                        ? 'border-brand-terracotta bg-brand-terracotta/5 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-gray-900">{preset.name}</div>
                    <div className="text-[10px] text-stone-400 mt-0.5">{preset.desc}</div>
                    <div className="text-xs font-serif font-bold mt-3 text-brand-brick">{preset.basePrice} сом</div>
                  </button>
                ))}
              </div>

              {/* Slider for colors */}
              <div className="mb-6 bg-white p-4 rounded-xl border border-stone-200">
                <div className="flex justify-between text-xs font-bold text-stone-700 mb-2">
                  <span>Детализация красок (Сложность)</span>
                  <span className="text-brand-brick font-serif">{colorsCount} цветов</span>
                </div>
                <input
                  type="range"
                  min="26"
                  max="52"
                  value={colorsCount}
                  onChange={(e) => setColorsCount(Number(e.target.value))}
                  className="w-full accent-brand-terracotta cursor-ew-resize h-1 bg-stone-200 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                  <span>Мягкие тона (26 цв)</span>
                  <span>Тонкие детали (52 цв)</span>
                </div>
              </div>

              {/* What is included section */}
              <div className="mb-6">
                <span className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2.5">Что входит в комплект:</span>
                <ul className="grid grid-cols-2 gap-2 text-xs text-stone-600">
                  <li className="flex items-center gap-1.5">
                    <Check size={14} className="text-green-500 shrink-0" />
                    Холст с вашим фото
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check size={14} className="text-green-500 shrink-0" />
                    Акриловые краски
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check size={14} className="text-green-500 shrink-0" />
                    Кисти (3–6 шт.)
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check size={14} className="text-green-500 shrink-0" />
                    Подарочная упаковка 🫶🏻
                  </li>
                </ul>
              </div>

              {/* Purchase Rules Accordion / Disclaimers (Strict Rules!) */}
              <div className="p-4 bg-red-50/50 rounded-xl border border-red-100/80 mb-6 text-xs text-stone-700">
                <span className="font-bold text-red-800 flex items-center gap-1 mb-1.5">
                  <InfoIcon size={14} />
                  Важно знать перед отправкой:
                </span>
                <ul className="space-y-1 text-[11px] leading-relaxed text-stone-600 list-disc list-inside">
                  <li>Срок производства составляет <strong className="text-red-700">12–18 дней</strong>.</li>
                  <li>Оплата производится в размере <strong className="text-red-700">50% предоплаты</strong> для запуска.</li>
                  <li><strong className="text-red-700">Отмена заказа невозможна</strong> после внесения — предоплата не возвращается.</li>
                  <li>Возврат возможен только в случае выявления заводского брака холста.</li>
                </ul>
              </div>
            </div>

            {/* Calculations & Order Trigger */}
            <div className="bg-stone-800 p-5 rounded-2xl text-white">
              <div className="flex justify-between items-baseline mb-4 text-xs">
                <span>Общая стоимость изготовления:</span>
                <span className="text-xl font-serif text-[#f2ddd8]">{currentPreset.basePrice} сом</span>
              </div>
              <div className="flex justify-between items-baseline mb-4 border-b border-white/10 pb-4 text-xs text-stone-300">
                <span>Предоплата (50% для запуска):</span>
                <span className="font-serif text-white">{prepayment} сом</span>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="text-stone-400 text-[10px] leading-normal text-left flex-1">
                  Нажмите кнопку ниже, отправьте свою фотографию, и мы рассчитаем точные оттенки и утвердим макет!
                </div>
                
                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="w-full md:w-auto py-3 px-5 bg-[#e48b6f] hover:bg-[#c45d44] text-white font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider transition-colors shadow-xs shrink-0"
                >
                  <Send size={14} />
                  Отправить фото на оценку
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
