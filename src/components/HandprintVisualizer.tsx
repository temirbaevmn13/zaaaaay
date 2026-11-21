import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Calendar, Check, Send } from 'lucide-react';
import { HandprintConfig, CanvasColor } from '../types';

const PAINTS = [
  { id: 'gold', name: 'Золотая роскошь', hex: '#d4af37', textClass: 'text-[#d4af37]' },
  { id: 'silver', name: 'Серебряное сияние', hex: '#b0b3b4', textClass: 'text-[#9fa1a3]' },
  { id: 'crimson', name: 'Пылкий красный', hex: '#b33939', textClass: 'text-[#b33939]' },
  { id: 'white', name: 'Белоснежный', hex: '#ffffff', textClass: 'text-gray-400' },
  { id: 'teal', name: 'Изумрудный чай', hex: '#2f847c', textClass: 'text-[#2f847c]' },
  { id: 'blush', name: 'Нежная роза', hex: '#e09f9d', textClass: 'text-[#e09f9d]' },
  { id: 'lavender', name: 'Лавандовый вечер', hex: '#c2afd6', textClass: 'text-[#c2afd6]' },
  { id: 'black', name: 'Глубокий черный', hex: '#151413', textClass: 'text-black' },
];

interface HandprintVisualizerProps {
  onOrder: (config: HandprintConfig) => void;
}

export default function HandprintVisualizer({ onOrder }: HandprintVisualizerProps) {
  const [config, setConfig] = useState<HandprintConfig>({
    canvasColor: 'black',
    setOption: 1,
    leftHandColor: '#d4af37',
    leftHandName: 'Золотая роскошь',
    rightHandColor: '#ffffff',
    rightHandName: 'Белоснежный',
    heartColor: 'red',
    customDate: new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }),
    withGlitter: false,
  });

  const basePrice = config.setOption === 1 ? 890 : 1190;
  const totalPrice = basePrice + (config.withGlitter ? 70 : 0);

  const handlePaintSelect = (hand: 'left' | 'right', item: typeof PAINTS[0]) => {
    setConfig((prev) => ({
      ...prev,
      [`${hand}HandColor`]: item.hex,
      [`${hand}HandName`]: item.name,
    }));
  };

  const handleWhatsAppSubmit = () => {
    const textOption = config.setOption === 1 
      ? 'Набор №1 (1 холст 20*30см, 4 кисти, 3 краски, подарок) за 890 сом' 
      : 'Набор №2 (2 холста 20*30см, 4 кисти, краски, подарок) за 1190 сом';

    const message = `Добрый день! Хочу заказать Набор для отпечатков рук от Palette Bishkek:
🎨 *Выбранный набор*: ${textOption}
🖤 *Цвет холста*: ${config.canvasColor === 'black' ? 'Черный холст' : 'Белый холст'}
🖌️ *Краска левой руки*: ${config.leftHandName}
🖌️ *Краска правой руки*: ${config.rightHandName}
❤️ *Сердечко*: ${config.heartColor === 'red' ? 'Красное' : config.heartColor === 'gold' ? 'Золотое' : 'Без сердечка'}
📅 *Текст/дата на холсте*: "${config.customDate || 'Нет'}"
✨ *Добавить блеск (+70 сом)*: ${config.withGlitter ? 'Да' : 'Нет'}
🚚 *Доставка*: Бесплатная по Бишкеку
💵 *К оплате*: *${totalPrice} сом*`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/996709322111?text=${encodedMessage}`, '_blank'); // Standard Kyrgyzstan sales number placeholder
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100" id="handprints-builder">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Real-time Interactive Simulator Canvas */}
        <div className="lg:col-span-5 bg-stone-900 p-8 flex flex-col justify-between items-center text-white relative min-h-[480px]">
          <div className="absolute inset-0 bg-radial from-stone-800 to-stone-950 opacity-50 pointer-events-none" />
          
          <div className="z-10 text-center w-full">
            <span className="text-[10px] tracking-widest text-stone-400 font-display uppercase">Интерактивный предпросмотр</span>
            <h4 className="text-sm font-serif italic text-amber-100/80">«Отпечаток вашей любви на холсте»</h4>
          </div>

          {/* Canvas Board simulation */}
          <div className="my-auto z-10">
            <motion.div 
              layout
              className={`relative rounded-xl shadow-2xl overflow-hidden border transition-all duration-500`}
              style={{
                width: '240px',
                height: '320px',
                backgroundColor: config.canvasColor === 'black' ? '#151413' : '#faf9f6',
                borderColor: config.canvasColor === 'black' ? '#2c2a29' : '#e4e2dd',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
              }}
            >
              {/* Canvas texture overlay */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none" 
                style={{
                  backgroundImage: `radial-gradient(var(--color-canvas-charcoal) 0.5px, transparent 0.5px), radial-gradient(var(--color-canvas-charcoal) 0.5px, #000000 0.5px)`,
                  backgroundSize: '3px 3px',
                  backgroundPosition: '0 0, 1.5px 1.5px',
                  mixBlendMode: config.canvasColor === 'white' ? 'difference' : 'normal'
                }}
              />

              {/* Subtle glittering gold sparkle overlay if enabled */}
              {config.withGlitter && (
                <div className="absolute inset-0 z-20 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-amber-200"
                      style={{
                        top: `${Math.sin(i * 45) * 40 + 50}%`,
                        left: `${Math.cos(i * 45) * 40 + 50}%`,
                        width: i % 2 === 0 ? '3px' : '5px',
                        height: i % 2 === 0 ? '3px' : '5px',
                        boxShadow: '0 0 8px #fcd34d'
                      }}
                      animate={{
                        opacity: [0.2, 1, 0.2],
                        scale: [0.8, 1.2, 0.8]
                      }}
                      transition={{
                        duration: 1.5 + (i % 3),
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Heart Painting */}
              {config.heartColor !== 'none' && (
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.85 }}
                  className="absolute top-[18%] left-1/2 -translate-x-1/2 z-30"
                >
                  <Heart 
                    size={40} 
                    fill={config.heartColor === 'red' ? '#cd3434' : '#d4af37'} 
                    stroke="none"
                    className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                  />
                </motion.div>
              )}

              {/* Left Handprint (Female representation, rotated left) */}
              <motion.div 
                animate={{ rotate: -15, scale: 0.95 }}
                className="absolute top-[32%] left-[18%] opacity-90 origin-center z-10"
                style={{ color: config.leftHandColor }}
              >
                <svg width="110" height="130" viewBox="0 0 24 24" fill="currentColor">
                  {/* Organic hand silhouette path */}
                  <path d="M12 2C11.4 2 11 2.4 11 3v6.1L9.1 7.2c-.4-.4-1.1-.4-1.5 0s-.4 1.1 0 1.5l2.6 2.6c.1.1.2.2.3.2V17c0 .6.4 1 1 1s1-.4 1-1v-5.5l1.9-1.9c.4-.4.4-1.1 0-1.5s-1.1-.4-1.5 0L13 9.1V3c0-.6-.4-1-1-1zm0 18c-3.3 0-6 2.7-6 6h12c0-3.3-2.7-6-6-6zM5.5 10c-.3 0-.6.1-.8.4c-.4.4-.4 1.1 0 1.5l3.3 3.3c.4.4.4 1.1 0 1.5c-.4.4-1.1.4-1.5 0l-3.3-3.3C2.8 13 2 12.1 2 11c0-1.7 1.3-3 3-3c.8 0 1.5.3 2.1.8c.4.4.4 1.1 0 1.5c-.3.4-.6.7-1.1.7h-.5zm13 0h-.5c-.5 0-.8-.3-1.1-.7c-.4-.4-.4-1.1 0-1.5c.6-.5 1.3-.8 2.1-.8c1.7 0 3 1.3 3 3c0 1.1-.8 2-1.2 2.4l-3.3 3.3c-.4.4-1.1.4-1.5 0s-.4-1.1 0-1.5l3.3-3.3c.4-.4.4-1.1 0-1.5c-.2-.3-.5-.4-.8-.4z" />
                </svg>
              </motion.div>

              {/* Right Handprint (Male representation, layered slightly right & higher) */}
              <motion.div 
                animate={{ rotate: 12, scale: 1.05 }}
                className="absolute top-[36%] right-[14%] opacity-85 origin-center z-20"
                style={{ color: config.rightHandColor }}
              >
                <svg width="120" height="140" viewBox="0 0 24 24" fill="currentColor">
                  {/* Organic hand silhouette path */}
                  <path d="M12 1a1.2 1.2 0 0 0-1.2 1.2v6.2L8.5 6.1c-.5-.5-1.3-.5-1.8 0a1.2 1.2 0 0 0 0 1.8l3 3c.1.1.2.2.3.2V17a1.2 1.2 0 0 0 2.4 0v-5.7l2.2-2.2c.5-.5.5-1.3 0-1.8s-1.3-.5-1.8 0l-1.3 1.3V2.2A1.2 1.2 0 0 0 12 1zm0 19a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7zM4.6 9.8c-.4 0-.8.2-1 .5a1.2 1.2 0 0 0 0 1.8l3.8 3.8a1.2 1.2 0 0 0 0 1.8a1.2 1.2 0 0 0-1.7 0l-3.8-3.8c-.5-.5-1.4-1.4-1.4-2.6A3.4 3.4 0 0 1 3.9 8c1 0 1.8.4 2.5 1c.5.5.5 1.3 0 1.8c-.3.4-.8.8-1.3.8H4.6zm14.8 0h-.5c-.5 0-1-.4-1.3-.8c-.5-.5-.5-1.3 0-1.8c.7-.6 1.5-1 2.5-1c2 0 3.5 1.5 3.5 3.4c0 1.2-.9 2.1-1.4 2.6l-3.8 3.8c-.5.5-1.3.5-1.7 0a1.2 1.2 0 0 0 0-1.8l3.8-3.8c.5-.5.5-1.3 0-1.8c-.2-.3-.6-.5-1-.5z" />
                </svg>
              </motion.div>

              {/* Dynamic Date written on bottom right */}
              {config.customDate && (
                <div 
                  className="absolute bottom-[8%] right-[10%] text-xs font-creative font-bold select-none drop-shadow-sm transition-colors duration-500 z-30"
                  style={{ color: config.canvasColor === 'black' ? '#ffffff' : '#151413', opacity: 0.75 }}
                >
                  {config.customDate}
                </div>
              )}
            </motion.div>
          </div>

          <div className="z-10 w-full text-center text-xs text-stone-400">
            Размер холста в наборе: 20 × 30 см
          </div>
        </div>

        {/* Customization Details form */}
        <div className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-xs font-semibold bg-brand-terracotta/10 text-brand-brick rounded-full">Индивидуальный заказ</span>
              <span className="text-gray-400 text-xs">· Бесплатная доставка Бишкек</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">
              Конструктор Творческого Набора
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Создайте уникальную историю вашей любви своими руками. Мы доставим всё необходимое в фирменной подарочной упаковке.
            </p>

            <hr className="border-stone-100 mb-6" />

            {/* Step 1: Canvas selection */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-terracotta mb-3">
                Шаг 1: Выберите набор и количество
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setConfig((prev) => ({ ...prev, setOption: 1 }))}
                  className={`p-4 rounded-xl border text-left transition-all relative ${
                    config.setOption === 1
                      ? 'border-brand-terracotta bg-brand-terracotta/5 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {config.setOption === 1 && (
                    <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-brand-terracotta text-white flex items-center justify-center text-xs font-bold">
                      ✓
                    </span>
                  )}
                  <h5 className="font-bold text-sm text-gray-900">Набор №1 (Один холст)</h5>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    1 холст 20х30 см, 4 кисти, 3 краски на ваш выбор, подарок.
                  </p>
                  <span className="inline-block mt-3 font-serif font-bold text-brand-brick">890 сом</span>
                </button>

                <button
                  type="button"
                  onClick={() => setConfig((prev) => ({ ...prev, setOption: 2 }))}
                  className={`p-4 rounded-xl border text-left transition-all relative ${
                    config.setOption === 2
                      ? 'border-brand-terracotta bg-brand-terracotta/5 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {config.setOption === 2 && (
                    <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-brand-terracotta text-white flex items-center justify-center text-xs font-bold">
                      ✓
                    </span>
                  )}
                  <h5 className="font-bold text-sm text-gray-900">Набор №2 (Два холста)</h5>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    2 холста 20х30 см (для парных работ), 4 кисти, краски, подарок.
                  </p>
                  <span className="inline-block mt-3 font-serif font-bold text-brand-brick">1190 сом</span>
                </button>
              </div>
            </div>

            {/* Step 2: Canvas Background Color */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-terracotta mb-3">
                Шаг 2: Цвет холста
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setConfig((prev) => ({ ...prev, canvasColor: 'black' }))}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg border text-xs font-medium transition-all ${
                    config.canvasColor === 'black'
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="w-4 h-4 rounded bg-stone-950 border border-stone-880" />
                  Черный холст (В наличии 💌)
                </button>

                <button
                  type="button"
                  onClick={() => setConfig((prev) => ({ ...prev, canvasColor: 'white' }))}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg border text-xs font-medium transition-all ${
                    config.canvasColor === 'white'
                      ? 'bg-white text-stone-900 border-stone-400'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="w-4 h-4 rounded bg-stone-50 border border-stone-300" />
                  Белый холст (В наличии 💌)
                </button>
              </div>
            </div>

            {/* Step 3: Choose Acrylic Paints */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-terracotta mb-2">
                Шаг 3: Цвета красок (Вы будете красить руки)
              </label>
              <p className="text-xs text-stone-500 mb-3">Укажите желаемые основные оттенки для него и для нее.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left hand selection */}
                <div>
                  <span className="block text-xs text-stone-600 font-semibold mb-2">Левая рука (Она): {config.leftHandName}</span>
                  <div className="grid grid-cols-4 gap-2">
                    {PAINTS.map((paint) => (
                      <button
                        key={`left-${paint.id}`}
                        type="button"
                        onClick={() => handlePaintSelect('left', paint)}
                        className={`w-full aspect-square rounded-lg border-2 transition-transform hover:scale-105 relative flex items-center justify-center`}
                        style={{ 
                          backgroundColor: paint.hex,
                          borderColor: config.leftHandColor === paint.hex ? '#c45d44' : '#e5e7eb' 
                        }}
                        title={paint.name}
                      >
                        {config.leftHandColor === paint.hex && (
                          <div className="absolute inset-0 bg-black/25 flex items-center justify-center rounded-md">
                            <Check size={14} className="text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right hand selection */}
                <div>
                  <span className="block text-xs text-stone-600 font-semibold mb-2">Правая рука (Он): {config.rightHandName}</span>
                  <div className="grid grid-cols-4 gap-2">
                    {PAINTS.map((paint) => (
                      <button
                        key={`right-${paint.id}`}
                        type="button"
                        onClick={() => handlePaintSelect('right', paint)}
                        className={`w-full aspect-square rounded-lg border-2 transition-transform hover:scale-105 relative flex items-center justify-center`}
                        style={{ 
                          backgroundColor: paint.hex,
                          borderColor: config.rightHandColor === paint.hex ? '#c45d44' : '#e5e7eb' 
                        }}
                        title={paint.name}
                      >
                        {config.rightHandColor === paint.hex && (
                          <div className="absolute inset-0 bg-black/25 flex items-center justify-center rounded-md">
                            <Check size={14} className="text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Heart and Custom Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-terracotta mb-2">
                  Рисунок: Сердечко на холсте
                </label>
                <div className="flex gap-2">
                  {(['red', 'gold', 'none'] as const).map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setConfig((prev) => ({ ...prev, heartColor: color }))}
                      className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-all ${
                        config.heartColor === color
                          ? 'border-brand-terracotta bg-brand-terracotta/5 text-brand-brick'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      {color === 'red' ? '❤️ Красное' : color === 'gold' ? '💛 Золотое' : 'Без него'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-terracotta mb-2">
                  Текст или Дата (Будет внизу)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 text-stone-400" size={16} />
                  <input
                    type="text"
                    value={config.customDate}
                    onChange={(e) => setConfig((prev) => ({ ...prev, customDate: e.target.value }))}
                    placeholder="Например: 18.04"
                    maxLength={12}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400 font-creative"
                  />
                </div>
              </div>
            </div>

            {/* Extra Glitter addition */}
            <div className="p-4 bg-amber-50/40 rounded-xl border border-amber-100 flex items-center justify-between mb-8">
              <div className="flex items-start gap-3">
                <Sparkles className="text-amber-500 mt-1 shrink-0" size={18} />
                <div>
                  <h6 className="font-bold text-xs text-stone-800">Добавить блеск для украшения (+70 сом)</h6>
                  <p className="text-[11px] text-stone-500 leading-normal">
                    Золотой или серебристый сухой глиттер, чтобы придать картине сказочное мерцание.
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.withGlitter}
                  onChange={(e) => setConfig((prev) => ({ ...prev, withGlitter: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-stone-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-amber-300 dark:bg-stone-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500" />
              </label>
            </div>
          </div>

          {/* Pricing and Action Order Button */}
          <div className="pt-4 border-t border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-stone-500 font-medium">Общая стоимость:</span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-3xl font-serif text-[#3d2c29]">{totalPrice} сом</span>
                <span className="text-xs text-brand-brick font-medium uppercase tracking-wider">бесплатная доставка🚚</span>
              </div>
            </div>

            <button
              onClick={handleWhatsAppSubmit}
              className="py-3 px-6 bg-[#e48b6f] hover:bg-[#c45d44] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all text-xs uppercase tracking-wider cursor-pointer"
            >
              <Send size={16} />
              Заказать через WhatsApp
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
