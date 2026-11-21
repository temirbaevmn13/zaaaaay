import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Instagram, 
  MapPin, 
  Sparkles, 
  Clock, 
  Heart, 
  Camera, 
  Brush, 
  Gift, 
  Truck, 
  MessageSquare, 
  ExternalLink,
  ChevronRight,
  Map,
  ShieldCheck,
  PackageCheck
} from 'lucide-react';

import HandprintVisualizer from './components/HandprintVisualizer';
import PhotoPbnProcessor from './components/PhotoPbnProcessor';
import CatalogSection from './components/CatalogSection';

// Import images so Vite bundles them correctly on GitHub Pages and other hosts.
import HERO_BANNER_IMG from './assets/images/palette_hero_banner_1782142616832.jpg';
import HANDPRINT_PROD_IMG from './assets/images/handprint_kit_1782142632713.jpg';
import PBN_PROD_IMG from './assets/images/paint_by_numbers_kit_1782142648892.jpg';

export default function App() {
  const [activeSection, setActiveSection] = useState<'handprints' | 'custom-photo' | 'catalog'>('handprints');

  // Fast scroll helper
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-canvas-cream font-sans selection:bg-[#e48b6f]/20 selection:text-brand-brick overflow-x-hidden antialiased text-canvas-charcoal">
      
      {/* 🚀 FLOAT HEADER */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#3d2c29]/10 shadow-3xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <motion.div 
              whileHover={{ rotate: 15 }} 
              className="w-10 h-10 rounded-full bg-brand-terracotta flex items-center justify-center text-white shadow-xs"
            >
              <span className="font-serif font-bold text-xl">P</span>
            </motion.div>
            <div>
              <span className="font-serif italic tracking-tight text-canvas-charcoal text-xl block">Palette Bishkek</span>
              <span className="text-[9px] font-bold text-[#3d2c29]/50 tracking-widest uppercase block -mt-1">Творческая мастерская</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-stone-600">
            <button 
              onClick={() => scrollToId('handprints-builder')} 
              className="hover:text-brand-brick transition-colors cursor-pointer flex items-center gap-1"
            >
              <Heart size={13} className="text-brand-terracotta" /> Отпечатки Рук
            </button>
            <button 
              onClick={() => scrollToId('photo-pbn')} 
              className="hover:text-brand-brick transition-colors cursor-pointer flex items-center gap-1"
            >
              <Camera size={13} className="text-brand-terracotta" /> Картины по Фото
            </button>
            <button 
              onClick={() => scrollToId('catalog-stock')} 
              className="hover:text-brand-brick transition-colors cursor-pointer flex items-center gap-1"
            >
              <Brush size={13} className="text-brand-terracotta" /> Наборы в наличии
            </button>
            <button 
              onClick={() => scrollToId('delivery-info')} 
              className="hover:text-brand-brick transition-colors cursor-pointer flex items-center gap-1"
            >
              <Truck size={13} className="text-brand-terracotta" /> Доставка & Адрес
            </button>
          </nav>

          {/* Right actions: Instagram & WhatsApp */}
          <div className="flex items-center gap-2">
            <a 
              href="https://www.instagram.com/palette_bishkek?igsh=MW44MTMyam12OWUyMw=="
              target="_blank"
              rel="noreferrer"
              className="p-2 sm:p-2.5 rounded-full bg-[#fdfaf5] hover:bg-[#f8f1eb] text-stone-600 hover:text-stone-950 border border-stone-200 transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
              title="Наш Instagram"
            >
              <Instagram size={15} className="text-brand-terracotta" />
              <span className="hidden sm:inline">Instagram</span>
              <ExternalLink size={10} className="opacity-60" />
            </a>

            <a 
              href="https://wa.me/996709322111"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 sm:py-2.5 rounded-full bg-brand-terracotta hover:bg-brand-brick text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs transition-transform cursor-pointer hover:scale-[1.02]"
            >
              <MessageSquare size={14} />
              <span>Чат</span>
            </a>
          </div>

        </div>
      </header>

      {/* 🎯 HERO COVER SECTION */}
      <section className="relative bg-stone-900 py-20 sm:py-28 md:py-36 text-white overflow-hidden shadow-md">
        {/* Real photo background with styled glassmorphic overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={HERO_BANNER_IMG} 
            alt="Palette Bishkek Art Studio Background" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/80 to-stone-950/70" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 25 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-xs text-brand-terracotta font-semibold mb-6"
          >
            <Sparkles size={13} className="text-brand-terracotta animate-spin" />
            Изготовление отпечатков вашей любви за 1 день в Бишкеке
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif leading-[1.1] text-white mb-6"
          >
            Отпечаток вашей <br className="hidden md:inline" />
            <span className="italic text-brand-terracotta">любви</span> на холсте в Бишкеке
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1, delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg text-stone-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            Творческая интернет-мастерская Palette Bishkek. Наборы для неповторимых отпечатков рук вашей пары и картины по номерам (в наличии и под заказ по вашему фото) с бесплатной доставкой! 🚚💌
          </motion.p>

          {/* Quick Selection Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto"
          >
            <button 
              onClick={() => scrollToId('handprints-builder')}
              className="w-full sm:w-auto px-6 py-3.5 bg-brand-terracotta hover:bg-brand-brick text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Heart size={15} />
              Отпечатки рук
            </button>

            <button 
              onClick={() => scrollToId('photo-pbn')}
              className="w-full sm:w-auto px-6 py-3.5 bg-stone-800 hover:bg-stone-750 text-white border border-stone-700 font-bold text-xs uppercase tracking-widest rounded-full transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Camera size={15} className="text-brand-terracotta" />
              Картина по фото
            </button>
          </motion.div>

        </div>
      </section>

      {/* ✨ CORE FEATURES BENTO SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {/* Intro */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold italic text-brand-terracotta uppercase tracking-widest block mb-1">Наш Ассортимент</span>
          <h2 className="text-3xl md:text-5xl font-serif text-canvas-charcoal">Что мы создаем для вас:</h2>
          <div className="w-12 h-0.5 bg-brand-terracotta mx-auto mt-4 rounded-full" />
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Card 1: Handprint kit */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xs border border-[#3d2c29]/10 group hover:shadow-xs transition-shadow flex flex-col justify-between">
            <div className="aspect-4/3 relative overflow-hidden bg-stone-100">
              <img 
                src={HANDPRINT_PROD_IMG} 
                alt="Набор для отпечатков рук Palette bishkek" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-brand-brick text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                Хит продаж 💌
              </span>
            </div>

            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-serif italic text-brand-terracotta block mb-1">Ручная память</span>
                <h3 className="text-2xl font-serif font-bold text-[#3d2c29] mb-3">
                  Парные отпечатки рук на холсте
                </h3>
                <p className="text-stone-500 text-xs leading-relaxed mb-6">
                  Наборы для снятия текстур рук влюбленных. Включают в себя роскошные холсты 20*30 см, 4 гибкие кисти, свежие наливные краски по вашему выбору и стильную подарочную упаковку. Оформим за день!
                </p>

                {/* Characteristics bullet lists */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-stone-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-terracotta" />
                    <strong>Набор №1 (890 сом)</strong>: 1 холст 20*30, 4 кисточки, 3 краски
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-terracotta" />
                    <strong>Набор №2 (1190 сом)</strong>: 2 холста 20*30, 4 кисточки, краски
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-terracotta" />
                    <strong>Доп. декор (+70 сом)</strong>: Сухой сияющий блеск (глиттер)
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase font-bold tracking-wider">Цена набора от:</span>
                  <span className="text-2xl font-serif text-[#3d2c29]">890 сом</span>
                </div>

                <button 
                  onClick={() => scrollToId('handprints-builder')}
                  className="py-2.5 px-5 bg-stone-950 text-white rounded-full text-[10px] uppercase tracking-wider font-bold hover:bg-brand-brick transition-all cursor-pointer"
                >
                  Настроить цвета
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Paint by numbers */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xs border border-[#3d2c29]/10 group hover:shadow-xs transition-shadow flex flex-col justify-between">
            <div className="aspect-4/3 relative overflow-hidden bg-stone-100">
              <img 
                src={PBN_PROD_IMG} 
                alt="Картина по номерам Palette bishkek" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-brand-terracotta text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                Твой уютный вечер ✨
              </span>
            </div>

            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-serif italic text-brand-terracotta block mb-1">Художественные холсты</span>
                <h3 className="text-2xl font-serif font-bold text-[#3d2c29] mb-3">
                  Картины по номерам (40 × 50 см)
                </h3>
                <p className="text-stone-500 text-xs leading-relaxed mb-6">
                  Картины на качественных натянутых холстах большого формата. В комплекте собраны насыщенные акриловые пигменты, кисти и подарочная обертка. Доступны готовые эскизы со склада, либо индивидуальное изготовление по вашей личной фотографии!
                </p>

                {/* Characteristics bullet lists */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-stone-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-terracotta" />
                    <strong>Картины в наличии (1250 сом)</strong>: Огромный выбор эскизов
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-terracotta" />
                    <strong>По вашей фотографии</strong>: От 26 до 52 цветов (12-18 дней)
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-terracotta" />
                    <strong>Специальное предложение</strong>: Каждая 3-я бесплатно (2+1) или скидка 15%
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase font-bold tracking-wider">Размер картины:</span>
                  <span className="text-2xl font-serif text-[#3d2c29]">40 × 50 см</span>
                </div>

                <button 
                  onClick={() => scrollToId('photo-pbn')}
                  className="py-2.5 px-5 bg-stone-950 text-white rounded-full text-[10px] uppercase tracking-wider font-bold hover:bg-brand-brick transition-all cursor-pointer"
                >
                  Картина по фото
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 🔮 CUSTOMIZER INTERACTIVE ZONE */}
      <section className="bg-gradient-to-b from-stone-50 to-white py-16 md:py-24 border-y border-[#3d2c29]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Quick tab switcher */}
          <div className="flex justify-center mb-10 max-w-md mx-auto bg-stone-250 p-1.5 rounded-full border border-stone-300/30">
            <button
              onClick={() => {
                setActiveSection('handprints');
                scrollToId('handprints-builder');
              }}
              className={`flex-1 py-3 text-xs uppercase tracking-wider font-bold rounded-full transition-all cursor-pointer ${
                activeSection === 'handprints' 
                  ? 'bg-brand-terracotta text-white shadow-sm' 
                  : 'text-[#3d2c29]/60 hover:text-stone-900'
              }`}
            >
              ❤️ Отпечатки
            </button>
            <button
              onClick={() => {
                setActiveSection('custom-photo');
                scrollToId('photo-pbn');
              }}
              className={`flex-1 py-3 text-xs uppercase tracking-wider font-bold rounded-full transition-all cursor-pointer ${
                activeSection === 'custom-photo' 
                  ? 'bg-brand-terracotta text-white shadow-sm' 
                  : 'text-[#3d2c29]/60 hover:text-stone-900'
              }`}
            >
              📸 По фото
            </button>
          </div>

          {/* Interactive Component Render */}
          <div className="space-y-16">
            
            {/* Visualizer 1 */}
            <HandprintVisualizer onOrder={() => {}} />

            {/* Visualizer 2 */}
            <PhotoPbnProcessor />

            {/* Visualizer 3 */}
            <CatalogSection />

          </div>

        </div>
      </section>

      {/* 🚚 DELIVERY & SELF PULL (SAMOVYVOZ) */}
      <section id="delivery-info" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        <div className="text-center mb-12">
          <span className="text-xs font-semibold italic text-brand-terracotta uppercase tracking-widest block mb-2">Логистика & Адрес</span>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#3d2c29]">Выдача заказов в Бишкеке</h3>
          <div className="w-12 h-0.5 bg-brand-terracotta mx-auto mt-2 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Box 1: Delivery info */}
          <div className="bg-[#f8f1eb] p-8 rounded-3xl border border-[#3d2c29]/5 flex flex-col justify-between shadow-2xs">
            <div className="mb-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl mb-4 shadow-3xs">
                🚚
              </div>
              <h4 className="text-lg font-serif italic text-stone-950 mb-2">Бесплатная доставка по городу</h4>
              <p className="text-[#3d2c29]/80 text-xs leading-relaxed mb-4">
                Все заказы Palette Bishkek (индивидуальные наборы отпечатков рук, картины по вашим фотографиям) доставляются курьерами абсолютно <strong>бесплатно по всей территории Бишкека!</strong>
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs text-brand-brick font-semibold bg-white px-2.5 py-1 rounded-full shadow-3xs">
                <ShieldCheck size={14} className="text-brand-terracotta" /> Бережная доставка
              </span>
            </div>
            
            <a 
              href="https://wa.me/996709322111"
              target="_blank"
              rel="noreferrer"
              className="mt-4 text-xs font-bold text-brand-brick hover:text-stone-950 transition-colors flex items-center gap-1 text-left"
            >
              Узнать у менеджера <ChevronRight size={13} />
            </a>
          </div>

          {/* Box 2: Self Pull address (Samovyvoz vostok 5/20) */}
          <div className="bg-white p-8 rounded-3xl border border-[#3d2c29]/15 flex flex-col justify-between shadow-2xs">
            <div className="mb-6">
              <div className="w-12 h-12 bg-[#f8f1eb] rounded-full flex items-center justify-center text-xl mb-4">
                📍
              </div>
              <h4 className="text-lg font-serif italic text-[#3d2c29] mb-2">Самовывоз (Восток-5)</h4>
              <p className="text-stone-600 text-xs leading-relaxed mb-4">
                Вы также можете забрать готовые наборы самостоятельно из нашей точки выдачи по адресу: <br />
                <strong className="text-stone-850 text-sm">г. Бишкек, микрорайон Восток-5, д. 20</strong>
              </p>
              <div className="text-[11px] text-[#3d2c29]/80 leading-normal bg-[#f8f1eb] p-3 rounded-xl border border-[#3d2c29]/5">
                ⭐ Точка самовывоза находится в Восток-5 (дом 20). Удобная транспортная развязка и бесплатная парковка!
              </div>
            </div>

            <a 
              href="https://2gis.kg/bishkek/search/%D0%92%D0%BE%D1%81%D1%82%D0%BE%D0%BA%205%2020" 
              target="_blank" 
              rel="noreferrer"
              className="mt-4 text-xs font-bold text-brand-brick hover:text-stone-950 transition-colors flex items-center gap-1 pointer-events-auto"
            >
              Открыть в 2ГИС Карты <ChevronRight size={13} />
            </a>
          </div>

        </div>
      </section>

      {/* 🤝 TRUST AND GUARANTEES BANNER */}
      <section className="bg-stone-950 py-12 text-stone-400 border-t border-stone-850">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3 text-brand-terracotta">
              <Clock size={18} />
            </div>
            <h5 className="font-bold text-xs text-white mb-1">Быстрое оформление</h5>
            <p className="text-[10px] leading-relaxed max-w-xxs text-stone-500">
              Наборы для отпечатков собираем и передаем курьеру в день вашего обращения!
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3 text-brand-terracotta">
              <PackageCheck size={18} />
            </div>
            <h5 className="font-bold text-xs text-white mb-1">Свежие акриловые пигменты</h5>
            <p className="text-[10px] leading-relaxed max-w-xxs text-stone-500">
              Только премиальные долговечные краски высокой укрывистости — ваши руки не будут шелушиться, а картина не поблекнет.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3 text-brand-terracotta">
              <Gift size={18} />
            </div>
            <h5 className="font-bold text-xs text-white mb-1">Праздничное настроение</h5>
            <p className="text-[10px] leading-relaxed max-w-xxs text-stone-500">
              Каждый набор бесплатно упакован в подарочную бумагу, создавая ощущение настоящего праздника уже в момент вручения курьером.
            </p>
          </div>
        </div>
      </section>

      {/* 📜 FOOTER */}
      <footer className="bg-stone-900 text-stone-500 py-12 border-t border-stone-850 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 pb-8 border-b border-stone-800">
            {/* Branding logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-terracotta flex items-center justify-center text-white text-sm font-serif font-bold shadow-sm">
                P
              </div>
              <div>
                <span className="font-serif italic text-white text-md tracking-wider block">Palette Bishkek</span>
                <span className="text-[8px] text-stone-400 block tracking-widest uppercase">Интернет-магазин искусства</span>
              </div>
            </div>

            {/* Instagram links and socials */}
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/palette_bishkek?igsh=MW44MTMyam12OWUyMw=="
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Instagram
              </a>
              <span className="text-stone-700">|</span>
              <a 
                href="https://wa.me/996709322111"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                WhatsApp Поддержка
              </a>
              <span className="text-stone-700">|</span>
              <span className="text-stone-400">Адрес: Восток-5, д. 20</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-stone-600">
            <p>© {new Date().getFullYear()} Palette Bishkek — Творческий интернет-магазин. Все права защищены.</p>
            <p>Тепло и искусство в каждой сделанной вами детали 🎨🤍</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
