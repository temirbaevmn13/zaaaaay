import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ShoppingCart, Percent, Sparkles, Send, Trash2, ArrowRight } from 'lucide-react';

const CATALOG_PAINTINGS = [
  { id: 'p1', title: 'Нежность вечера', category: 'Романтика', url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&q=80&fit=crop' },
  { id: 'p2', title: 'Магия Ала-Арчи', category: 'Природа', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&q=80&fit=crop' },
  { id: 'p3', title: 'Взгляд кота', category: 'Животные', url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&q=80&fit=crop' },
  { id: 'p4', title: 'Золотая абстракция', category: 'Современное', url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&q=80&fit=crop' },
  { id: 'p5', title: 'Свидание под дождем', category: 'Романтика', url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&q=80&fit=crop' },
  { id: 'p6', title: 'Бишкекские тюльпаны', category: 'Цветы', url: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=500&q=80&fit=crop' },
];

export default function CatalogSection() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [promoChoice, setPromoChoice] = useState<'free_item' | 'discount_15'>('free_item');

  const unitPrice = 1250;
  const rawTotal = selectedItems.length * unitPrice;
  
  // Promotion logic
  let finalPrice = rawTotal;
  let savings = 0;
  let activePromoText = '';

  if (selectedItems.length >= 3) {
    if (promoChoice === 'free_item') {
      // 2 + 1 free calculation
      const numFreeItems = Math.floor(selectedItems.length / 3);
      savings = numFreeItems * unitPrice;
      finalPrice = rawTotal - savings;
      activePromoText = `Применена акция «2+1»: ${numFreeItems} картин(а) в подарок!`;
    } else {
      // 15% discount calculation
      savings = Math.round(rawTotal * 0.15);
      finalPrice = rawTotal - savings;
      activePromoText = `Применена скидка 15% (акция «Выгода 15%» вместо третьей бесплатной картины).`;
    }
  }

  const toggleItem = (id: string) => {
    setSelectedItems((prev) => {
      const isSelected = prev.includes(id);
      if (isSelected) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const clearCart = () => {
    setSelectedItems([]);
  };

  const handleWhatsAppCheckout = () => {
    const listTitles = selectedItems
      .map((id) => {
        const item = CATALOG_PAINTINGS.find((p) => p.id === id);
        return `• ${item?.title} (Категория: ${item?.category})`;
      })
      .join('\n');

    const message = `Добрый день! Хочу заказать картины по номерам из каталога Palette Bishkek:
📦 *Выбранные картины (${selectedItems.length} шт)*:
${listTitles}

🔥 *Выбранное спецпредложение*: ${
      selectedItems.length >= 3 
        ? (promoChoice === 'free_item' ? 'Акция «2+1» (Каждая 3-я бесплатно)' : 'Альтернативная скидка 15%')
        : 'Скидка не применяется (нужно выбрать от 3х картин)'
    }
🎁 *Подарочная упаковка*: Бесплатная к картинам
🚚 *Доставка*: Бесплатная по Бишкеку
📉 *Ваша экономия*: ${savings} сом
💵 *Итоговая сумма к оплате*: *${finalPrice} сом*`;

    const encodedText = encodeURIComponent(message);
    window.open(`https://wa.me/996707323232?text=${encodedText}`, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 border border-stone-100 shadow-2xs" id="catalog-stock">
      <div className="max-w-6xl mx-auto">
        
        {/* Catalog header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">Каталог в наличии 💌</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
              Картины по номерам (40 × 50 см)
            </h3>
            <p className="text-stone-500 text-xs mt-1 leading-relaxed">
              Все картины укомплектованы свежими акриловыми красками, кистями и подарочной упаковкой. Доставка бесплатная!
            </p>
          </div>

          <div className="mt-4 md:mt-0 bg-stone-50 py-2.5 px-4 rounded-xl border border-stone-200 text-right animate-fade-in">
            <span className="text-[11px] text-stone-500 block">Стоимость картины:</span>
            <div className="flex items-baseline gap-1 mt-0.5 justify-end">
              <span className="text-xl font-serif font-bold text-[#3d2c29]">1 250 сом</span>
              <span className="text-[11px] text-stone-500 font-semibold">Доставка бесплатная🚚</span>
            </div>
          </div>
        </div>

        {/* Special Offers Banner */}
        <div className="mb-8 p-4 bg-gradient-to-r from-brand-terracotta/5 to-brand-brick/5 rounded-2xl border border-brand-terracotta/15 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Sparkles className="text-brand-terracotta mt-1 shrink-0 animate-bounce" size={18} />
            <div>
              <span className="text-xs font-bold text-brand-brick uppercase tracking-wider block">Специальное предложение❤️</span>
              <p className="text-xs text-stone-600 mt-0.5 leading-normal">
                Покупайте <strong>2 картины</strong>, и забирайте <strong>третью картину абсолютно в подарок (2+1)</strong>, либо выберите <strong>скидку 15%</strong> на весь заказ вместо подарка!
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <span className="px-3 py-1.5 bg-white border border-brand-terracotta/20 text-brand-brick rounded-lg text-xs font-bold leading-none flex items-center justify-center shadow-2xs">
              Каждая 3-я бесплатно
            </span>
            <span className="px-3 py-1.5 bg-[#e48b6f] text-white rounded-lg text-xs font-bold leading-none flex items-center justify-center shadow-2xs">
              Или -15%
            </span>
          </div>
        </div>

        {/* Grid of stock paintings */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          {CATALOG_PAINTINGS.map((painting) => {
            const isSelected = selectedItems.includes(painting.id);
            return (
              <div 
                key={painting.id}
                onClick={() => toggleItem(painting.id)}
                className={`group rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer flex flex-col bg-stone-55 relative ${
                  isSelected 
                    ? 'border-brand-terracotta ring-2 ring-brand-terracotta/10 shadow-xs' 
                    : 'border-stone-205 hover:border-stone-300 hover:shadow-xs'
                }`}
              >
                {/* Visual marker of selection */}
                {isSelected && (
                  <div className="absolute top-2 right-2 z-20 bg-brand-brick text-white p-1 rounded-full shadow-md">
                    <Check size={14} className="stroke-3" />
                  </div>
                )}

                {/* Cover image */}
                <div className="aspect-4/3 overflow-hidden relative bg-stone-200">
                  <img 
                    src={painting.url} 
                    alt={painting.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase backdrop-blur-xs">
                    {painting.category}
                  </div>
                </div>

                {/* Details */}
                <div className="p-3.5 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h5 className="font-bold text-xs md:text-sm text-stone-900 group-hover:text-brand-brick transition-colors">
                      {painting.title}
                    </h5>
                    <p className="text-[10px] text-stone-400 mt-0.5">В комплекте: картина 40*50см, краски, 3 кисти</p>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-100">
                    <span className="text-xs font-serif font-bold text-[#3d2c29]">1 250 сом</span>
                    <span className="text-[10px] font-bold text-[#e48b6f] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                      {isSelected ? 'Убрать' : '+ Добавить'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Counter & Promotion Interactive calculations */}
        {selectedItems.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-[#3d2c29] text-white rounded-2xl relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              <div className="md:col-span-12 lg:col-span-5 border-stone-800 lg:border-r lg:pr-6">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-bold text-amber-200 flex items-center gap-2">
                    <ShoppingCart size={15} />
                    Выбрано для заказа: {selectedItems.length} картины
                  </h4>
                  <button 
                    onClick={clearCart}
                    className="text-[10px] text-stone-300 hover:text-red-400 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Trash2 size={11} /> Очистить
                  </button>
                </div>
                <div className="text-xs text-stone-200 leading-relaxed max-h-24 overflow-y-auto space-y-1.5 thin-scrollbar">
                  {selectedItems.map((id, index) => {
                    const item = CATALOG_PAINTINGS.find((p) => p.id === id);
                    return (
                      <div key={id} className="flex justify-between items-center py-0.5">
                        <span className="truncate pr-4 text-stone-250">{index + 1}. {item?.title}</span>
                        <span className="shrink-0 font-serif text-[11px] font-bold text-stone-300">1 250 сом</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Promotion Selector */}
              <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-2">
                <span className="text-[10px] font-bold text-stone-300 uppercase tracking-wider block">Режим акции:</span>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPromoChoice('free_item')}
                    className={`py-2 px-3 text-left rounded-lg text-xs font-bold transition-all border ${
                      promoChoice === 'free_item'
                        ? 'bg-[#c45d44] text-white border-[#c45d44]'
                        : 'bg-stone-900/40 text-stone-340 border-stone-800 hover:bg-stone-800'
                    }`}
                  >
                    <span>🎁 Акция 2+1</span>
                    <span className="block text-[9px] font-medium opacity-70 mt-0.5">3-я картина бесплатно</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPromoChoice('discount_15')}
                    className={`py-2 px-3 text-left rounded-lg text-xs font-bold transition-all border ${
                      promoChoice === 'discount_15'
                        ? 'bg-[#c45d44] text-white border-[#c45d44]'
                        : 'bg-stone-900/40 text-stone-340 border-stone-800 hover:bg-stone-800'
                    }`}
                  >
                    <span>📉 Скидка 15%</span>
                    <span className="block text-[9px] font-medium opacity-70 mt-0.5">Вместо подарка</span>
                  </button>
                </div>

                {selectedItems.length < 3 && (
                  <p className="text-[10px] text-amber-200/80 mt-1 leading-normal">
                    💡 Добавьте еще {3 - selectedItems.length} картин(ы) для активации суперакций!
                  </p>
                )}
              </div>

              {/* Final calculation panel */}
              <div className="md:col-span-12 lg:col-span-3 lg:text-right">
                <div className="text-[10px] text-stone-300">Сумма без скидки: {rawTotal} сом</div>
                
                {savings > 0 && (
                  <div className="text-xs text-[#e48b6f] font-bold mt-0.5">
                    Экономия: -{savings} сом
                  </div>
                )}

                <div className="mt-1 flex items-baseline lg:justify-end gap-1">
                  <span className="text-2xl font-serif text-amber-200">{finalPrice} сом</span>
                  <span className="text-[10px] text-emerald-400">доставка бесплатная🚚</span>
                </div>

                {activePromoText && (
                  <div className="text-[9px] text-stone-200 italic block mt-1">
                    {activePromoText}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="w-full mt-3 py-2.5 px-4 bg-[#e48b6f] hover:bg-[#c45d44] text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <Send size={12} />
                  Подтвердить в WhatsApp
                </button>
              </div>

            </div>
          </motion.div>
        ) : (
          <div className="p-8 text-center bg-stone-50 border border-stone-200 border-dashed rounded-2xl">
            <p className="text-xs text-stone-500">
              Пожалуйста, выберите картины в каталоге выше, кликнув на понравившиеся варианты.
            </p>
            <div className="flex justify-center mt-3 text-stone-400 animate-pulse">
              <ArrowRight size={16} />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
