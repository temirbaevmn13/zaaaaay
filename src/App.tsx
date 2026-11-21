/// <reference types="vite/client" />
import { useEffect, useRef, type CSSProperties } from 'react';
import handprintImg from './assets/images/handprint.jpg';
import pbnImg from './assets/images/pbn.jpg';

const WA = 'https://wa.me/996709322111';
const IG = 'https://www.instagram.com/palette_bishkek/';
const MAP = 'https://2gis.kg/bishkek/search/%D0%92%D0%BE%D1%81%D1%82%D0%BE%D0%BA%205%2020';
const wa = (text: string) => `${WA}?text=${encodeURIComponent(text)}`;

type Row = { name: string; price: string; msg: string };
type Card = { title: string; text: string; rows: Row[]; note?: string };

const CARDS: Card[] = [
  {
    title: 'Отпечатки рук',
    text: 'Холст с отпечатками ваших рук. Кисти и краски в комплекте.',
    rows: [
      { name: 'Набор №1\n1 холст 20×30, 4 кисти, 3 краски', price: '890 сом', msg: 'Здравствуйте! Хочу набор №1 для отпечатков рук (1 холст 20×30 см) за 890 сом.' },
      { name: 'Набор №2\n2 холста 20×30, 4 кисти, краски', price: '1 190 сом', msg: 'Здравствуйте! Хочу набор №2 для отпечатков рук (2 холста 20×30 см) за 1190 сом.' },
      { name: 'Сияющий блеск, добавка', price: '+70 сом', msg: 'Здравствуйте! Хочу добавить блеск (глиттер) к набору для отпечатков рук, +70 сом.' },
    ],
  },
  {
    title: 'Картина по вашему фото',
    text: 'Вы присылаете фото, мы делаем картину по номерам. От 26 до 52 цветов.',
    rows: [
      { name: '30 × 40 см', price: '1 950 сом', msg: 'Здравствуйте! Хочу картину по моему фото, размер 30×40 см, 1950 сом.' },
      { name: '40 × 50 см', price: '2 450 сом', msg: 'Здравствуйте! Хочу картину по моему фото, размер 40×50 см, 2450 сом.' },
      { name: '50 × 70 см', price: '3 250 сом', msg: 'Здравствуйте! Хочу картину по моему фото, размер 50×70 см, 3250 сом.' },
    ],
    note: 'Предоплата 50%, после неё отмена невозможна.',
  },
  {
    title: 'Готовые картины',
    text: 'Выбор эскизов в наличии.',
    rows: [
      { name: '1 картина', price: '1 250 сом', msg: 'Здравствуйте! Хочу готовую картину по номерам за 1250 сом. Расскажите, какие есть в наличии.' },
      { name: '3 картины\nтретья в подарок или скидка 15%', price: 'акция', msg: 'Здравствуйте! Хочу заказать 3 готовые картины. Хочу узнать про скидку: третья в подарок или 15%.' },
    ],
  },
];

const BAND = ['Готово за 1 день', 'Бесплатная доставка по Бишкеку', 'Самовывоз: Восток-5', 'Картины по фото: предоплата 50%'];

const BOKEH: [string, string, string, string, string][] = [
  ['4%', '6%', '90px', '#2d6bff', '9s'],
  ['14%', '28%', '120px', '#ffa42e', '11s'],
  ['82%', '4%', '110px', '#8fe04a', '10s'],
  ['60%', '12%', '70px', '#ff3ea5', '8s'],
  ['90%', '34%', '130px', '#8fe04a', '12s'],
  ['2%', '50%', '100px', '#18d6d6', '9.5s'],
  ['70%', '55%', '90px', '#ffa42e', '10.5s'],
  ['38%', '66%', '80px', '#2d6bff', '8.5s'],
  ['88%', '72%', '120px', '#ff3ea5', '11.5s'],
  ['20%', '82%', '100px', '#8fe04a', '9s'],
  ['52%', '88%', '140px', '#ffa42e', '12.5s'],
  ['6%', '92%', '90px', '#ff3ea5', '10s'],
];

const SPLAT_COLORS = ['#ff3ea5', '#2d6bff', '#ffa42e', '#8fe04a', '#ffffff'];

type Dot = { x: number; y: number; vx: number; vy: number; r: number; life: number; decay: number; c: string };

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} aria-hidden="true">
      <use href="#ig" />
    </svg>
  );
}

export default function App() {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Paint splats in the hero: tap the background to leave a mark.
  useEffect(() => {
    const hero = heroRef.current;
    const cv = canvasRef.current;
    if (!hero || !cv) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    let dots: Dot[] = [];
    let running = false;
    let raf = 0;
    const timers: number[] = [];

    const fit = () => {
      const r = hero.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(r.width * dpr);
      cv.height = Math.round(r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const tick = () => {
      const r = hero.getBoundingClientRect();
      ctx.clearRect(0, 0, r.width, r.height);
      dots = dots.filter((d) => d.life > 0);
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        d.vx *= 0.9;
        d.vy *= 0.9;
        d.life -= d.decay;
        ctx.globalAlpha = Math.max(d.life, 0) * 0.85;
        ctx.fillStyle = d.c;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * (0.6 + 0.4 * Math.max(d.life, 0)), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (dots.length) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
        ctx.clearRect(0, 0, r.width, r.height);
      }
    };

    const spawn = (x: number, y: number) => {
      const main = SPLAT_COLORS[Math.floor(Math.random() * 3)];
      dots.push({ x, y, vx: 0, vy: 0, r: 16 + Math.random() * 14, life: 1, decay: 0.006, c: main });
      for (let i = 0; i < 16; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = 2 + Math.random() * 6;
        dots.push({
          x, y,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,
          r: 3 + Math.random() * 9,
          life: 1,
          decay: 0.008 + Math.random() * 0.008,
          c: Math.random() < 0.6 ? main : SPLAT_COLORS[Math.floor(Math.random() * SPLAT_COLORS.length)],
        });
      }
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onDown = (e: PointerEvent) => {
      if ((e.target as Element).closest('a,button')) return;
      const r = hero.getBoundingClientRect();
      spawn(e.clientX - r.left, e.clientY - r.top);
    };

    fit();
    window.addEventListener('resize', fit);
    hero.addEventListener('pointerdown', onDown);
    timers.push(
      window.setTimeout(() => {
        const r = hero.getBoundingClientRect();
        spawn(r.width * 0.62, r.height * 0.3);
        timers.push(window.setTimeout(() => spawn(r.width * 0.8, r.height * 0.62), 350));
      }, 1100),
    );

    return () => {
      window.removeEventListener('resize', fit);
      hero.removeEventListener('pointerdown', onDown);
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
    };
  }, []);

  const orderLink = wa('Здравствуйте! Хочу заказать набор.');

  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
        <symbol id="ig" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="5.5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="17.3" cy="6.7" r="1.3" fill="currentColor" />
        </symbol>
      </svg>

      <div className="bg" aria-hidden="true">
        <div className="bokeh">
          {BOKEH.map(([x, y, s, c, d], i) => (
            <span key={i} style={{ '--x': x, '--y': y, '--s': s, '--c': c, '--d': d } as CSSProperties} />
          ))}
        </div>
      </div>

      <header className="top">
        <div className="wrap">
          <a className="logo" href="#top">palette<i>.</i>bishkek</a>
          <div className="top-actions">
            <a className="ig-btn" href={IG} target="_blank" rel="noopener noreferrer" aria-label="Instagram palette_bishkek">
              <InstagramIcon />
            </a>
            <a className="btn btn-dark btn-small" href={orderLink} target="_blank" rel="noopener noreferrer">Написать в WhatsApp</a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero" id="hero" ref={heroRef}>
          <canvas className="splat" ref={canvasRef} aria-hidden="true" />
          <div className="wrap hero-grid">
            <div>
              <h1 className="r r1">
                Ваша{' '}
                <span className="mark">
                  история
                  <svg viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true">
                    <path pathLength={1} d="M3 13 C 38 3, 78 17, 118 8 S 176 12, 197 6" />
                  </svg>
                </span>{' '}
                на холсте
              </h1>
              <p className="lead r r2">Отпечатки рук и картины по номерам. Готово за 1 день.</p>
              <div className="cta r r3">
                <a className="btn btn-hot" href={orderLink} target="_blank" rel="noopener noreferrer">Заказать в WhatsApp</a>
                <a className="btn btn-line" href="#prices">Смотреть цены</a>
                <a className="btn btn-line" href={IG} target="_blank" rel="noopener noreferrer">
                  <InstagramIcon className="ig-ico" />Instagram
                </a>
              </div>
              <p className="hint r r4">Нажмите на фон, чтобы оставить мазок краски.</p>
            </div>
            <div className="art">
              <div className="glow" aria-hidden="true" />
              <div className="tag t1">от 890 сом</div>
              <div className="tag t2">Готово за 1 день</div>
              <div className="tag t3">Доставка бесплатно</div>
              <img className="arch a1" src={handprintImg} alt="Холст с золотым и белым отпечатками рук и красным сердцем" width={821} height={1100} />
              <img className="arch a2" src={pbnImg} alt="Картина по номерам с красками и кистью" width={821} height={1100} />
            </div>
          </div>
        </section>

        <div className="band" aria-label="Условия заказа">
          <div className="track">
            {BAND.map((t) => <span key={t}>{t}</span>)}
            {BAND.map((t) => <span key={`d-${t}`} className="dup" aria-hidden="true">{t}</span>)}
          </div>
        </div>

        <section className="prices" id="prices">
          <div className="wrap">
            <h2>Что заказать</h2>
            <p className="sub">Нажмите на строку, и откроется WhatsApp с готовым сообщением.</p>
            <div className="cards">
              {CARDS.map((card) => (
                <article className="card" key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                  <div className="rows">
                    {card.rows.map((row) => (
                      <a className="row" key={row.name} href={wa(row.msg)} target="_blank" rel="noopener noreferrer">
                        <span>
                          {row.name.split('\n').map((line, i) => (
                            <span key={i} style={{ display: 'block' }}>{line}</span>
                          ))}
                        </span>
                        <b>{row.price}</b>
                      </a>
                    ))}
                  </div>
                  {card.note && <p className="note">{card.note}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="deliver" id="delivery">
          <div className="wrap">
            <div className="panel">
              <ul>
                <li>Бесплатная доставка по Бишкеку</li>
                <li>
                  Самовывоз: Восток-5,{' '}
                  <a className="map" href={MAP} target="_blank" rel="noopener noreferrer">открыть в 2ГИС</a>
                </li>
              </ul>
              <a className="btn btn-hot" href={wa('Здравствуйте! Хочу заказать доставку по Бишкеку.')} target="_blank" rel="noopener noreferrer">Написать в WhatsApp</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap">
          <span>palette.bishkek · WhatsApp +996 709 322 111</span>
          <a href={IG} target="_blank" rel="noopener noreferrer">Instagram @palette_bishkek</a>
        </div>
      </footer>

      <div className="bar">
        <a className="ig-btn" href={IG} target="_blank" rel="noopener noreferrer" aria-label="Instagram palette_bishkek">
          <InstagramIcon />
        </a>
        <a className="btn btn-hot" href={orderLink} target="_blank" rel="noopener noreferrer">Заказать в WhatsApp</a>
      </div>
    </>
  );
}
