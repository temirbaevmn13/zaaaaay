/// <reference types="vite/client" />
import { useState } from 'react';
import { motion } from 'motion/react';
import { Instagram, MapPin, Truck, MessageCircle, ArrowUpRight, Heart, Camera, Brush } from 'lucide-react';

import HandprintVisualizer from './components/HandprintVisualizer';
import PhotoPbnProcessor from './components/PhotoPbnProcessor';
import CatalogSection from './components/CatalogSection';
import { StickyOrderBar } from './components/SalesBlocks';
import handprintImg from './assets/images/handprint_kit_1782142632713.jpg';
import pbnImg from './assets/images/paint_by_numbers_kit_1782142648892.jpg';

const WA = 'https://wa.me/996707323232';
const IG = 'https://www.instagram.com/palette_bishkek?igsh=MW44MTMyam12OWUyMw==';
const MAP = 'https://2gis.kg/bishkek/search/%D0%92%D0%BE%D1%81%D1%82%D0%BE%D0%BA%205%2020';
type Tab = 'hand' | 'photo' | 'ready';

const cta = 'inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-bold transition-transform hover:-translate-y-0.5';

export default function App() {
  const [tab, setTab] = useState<Tab>('hand');
  const go = (t: Tab) => {
    setTab(t);
    document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth' });
  };
  const tabs: [Tab, string][] = [['hand', 'Отпечатки рук'], ['photo', 'Картина по фото'], ['ready', 'Готовые наборы']];

  return (
    <div className="min-h-screen overflow-x-hidden antialiased">
      <header className="sticky top-0 z-40 bg-canvas-cream/90 backdrop-blur border-b border-ink/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#top" className="font-display font-extrabold text-xl tracking-tight">palette<span className="text-vermilion">.</span>bishkek</a>
          <nav className="hidden md:flex gap-7 text-sm font-semibold">
            <button onClick={() => go('hand')}>Отпечатки</button>
            <button onClick={() => go('photo')}>По фото</button>
            <button onClick={() => go('ready')}>В наличии</button>
            <a href="#delivery">Доставка</a>
          </nav>
          <a href={WA} target="_blank" rel="noreferrer" className="rounded-full bg-ink text-white text-sm font-bold px-5 py-2.5 flex items-center gap-2">
            <MessageCircle size={16} />Написать
          </a>
        </div>
      </header>

      <section id="top" className="max-w-6xl mx-auto px-4 pt-10 pb-14 md:pt-16 grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="inline-flex items-center gap-2 rounded-full bg-sand px-4 py-1.5 text-sm font-semibold mb-6"><span className="w-2 h-2 rounded-full bg-vermilion" />Бишкек · готово за 1 день</p>
          <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-[0.98] tracking-tight">Ваша <span className="text-vermilion">история</span> на холсте</h1>
          <p className="mt-6 text-lg text-ink/70 max-w-md">Наборы для отпечатков рук влюблённых и картины по номерам. Доставка по Бишкеку бесплатно.</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button onClick={() => go('hand')} className={cta + ' bg-ink text-white'}>Собрать набор <ArrowUpRight size={18} /></button>
            <a href={WA} target="_blank" rel="noreferrer" className={cta + ' border-2 border-ink/20'}><MessageCircle size={18} />WhatsApp</a>
            <span className="font-display font-bold text-lg ml-2">от 890 сом</span>
          </div>
        </motion.div>
        <div className="relative flex items-end justify-center gap-4 h-[360px] md:h-[500px]">
          <div className="absolute left-1/2 top-4 -translate-x-1/2 w-44 h-44 rounded-full bg-tangerine/30 blur-2xl" />
          <img src={handprintImg} alt="Набор для отпечатков рук" className="relative w-1/2 h-[88%] object-cover rounded-t-[999px] rounded-b-3xl" />
          <img src={pbnImg} alt="Картина по номерам" className="relative w-1/2 h-[72%] object-cover rounded-t-[999px] rounded-b-3xl" />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-14 grid md:grid-cols-3 gap-4">
        {[
          { id: 'hand' as Tab, Icon: Heart, h: 'Отпечатки рук', p: '1 холст 20×30 — 890 сом. 2 холста — 1190 сом. Глиттер +70 сом.' },
          { id: 'photo' as Tab, Icon: Camera, h: 'Картина по вашему фото', p: 'Размеры 30×40, 40×50 и 50×70 см, от 26 до 52 цветов.' },
          { id: 'ready' as Tab, Icon: Brush, h: 'Готовые картины', p: 'От 1250 сом. Три картины: третья в подарок или скидка 15%.' },
        ].map(({ id, Icon, h, p }) => (
          <button key={id} onClick={() => go(id)} className="bg-white text-ink border border-ink/10 hover:border-ink text-left rounded-3xl p-7 min-h-56 flex flex-col justify-between transition-colors">
            <span className="w-12 h-12 rounded-full bg-sand text-vermilion flex items-center justify-center"><Icon size={24} /></span>
            <div>
              <h3 className="font-display font-bold text-xl mb-2">{h}</h3>
              <p className="text-ink/70">{p}</p>
            </div>
          </button>
        ))}
      </section>

      <section id="builder" className="max-w-6xl mx-auto px-4 pb-14">
        <div className="rounded-3xl bg-canvas-clay p-5 md:p-12">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl mb-6 tracking-tight">Соберите свой набор</h2>
          <div role="tablist" className="inline-flex flex-wrap gap-2 mb-8">
            {tabs.map(([id, label]) => (
              <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)}
                className={`rounded-full px-5 py-2.5 font-bold border-2 ${tab === id ? 'bg-ink text-white border-ink' : 'border-ink/15 hover:border-ink'}`}>{label}</button>
            ))}
          </div>
          {tab === 'hand' && <HandprintVisualizer onOrder={() => {}} />}
          {tab === 'photo' && <PhotoPbnProcessor />}
          {tab === 'ready' && <CatalogSection />}
        </div>
      </section>

      <section id="delivery" className="max-w-6xl mx-auto px-4 pb-14">
        <div className="rounded-3xl bg-ink text-white p-7 md:p-14">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl mb-8 tracking-tight">Как получить заказ</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-3xl bg-white/10 p-7">
              <Truck className="text-tangerine mb-3" size={28} />
              <h3 className="font-display font-bold text-xl mb-2">Бесплатная доставка по Бишкеку</h3>
              <p className="text-white/70 mb-5">Напишите адрес в WhatsApp, и мы договоримся о времени.</p>
              <a href={WA} target="_blank" rel="noreferrer" className={cta + ' bg-tangerine text-ink'}>Написать в WhatsApp</a>
            </div>
            <div className="rounded-3xl bg-white/10 p-7">
              <MapPin className="text-tangerine mb-3" size={28} />
              <h3 className="font-display font-bold text-xl mb-2">Самовывоз: Восток-5</h3>
              <p className="text-white/70 mb-5">Откройте точку на карте 2ГИС и заберите готовый заказ.</p>
              <a href={MAP} target="_blank" rel="noreferrer" className={cta + ' bg-white text-ink'}>Открыть в 2ГИС</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-4 py-8 flex flex-wrap items-center justify-between gap-3 text-sm text-ink/60">
        <span className="font-display font-extrabold text-ink">palette.bishkek</span>
        <a href={IG} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-semibold text-ink"><Instagram size={16} />@palette_bishkek</a>
      </footer>
      <StickyOrderBar />
    </div>
  );
}
