/// <reference types="vite/client" />
import { useState } from 'react';
import { motion } from 'motion/react';
import { Instagram, MapPin, Truck, MessageCircle, ArrowUpRight } from 'lucide-react';

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
          
          <a href={WA} target="_blank" rel="noreferrer" className="rounded-full bg-ink text-white text-sm font-bold px-5 py-2.5 flex items-center gap-2">
            <MessageCircle size={16} />Написать
          </a>
        </div>
      </header>

      <section id="top" className="max-w-6xl mx-auto px-4 pt-10 pb-14 md:pt-16 grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-[0.98] tracking-tight">Ваша <span className="text-vermilion">история</span> на холсте</h1>
          <p className="mt-6 text-lg text-ink/70 max-w-md">Отпечатки рук и картины по номерам. Готово за 1 день.</p>
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
        <div className="rounded-3xl bg-ink text-white p-7 md:p-10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-col gap-3 font-semibold">
            <span className="flex items-center gap-3"><Truck className="text-tangerine" size={22} />Бесплатная доставка по Бишкеку</span>
            <span className="flex items-center gap-3"><MapPin className="text-tangerine" size={22} />Самовывоз: Восток-5 · <a href={MAP} target="_blank" rel="noreferrer" className="underline">2ГИС</a></span>
          </div>
          <a href={WA} target="_blank" rel="noreferrer" className={cta + ' bg-tangerine text-ink'}><MessageCircle size={18} />Написать в WhatsApp</a>
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
