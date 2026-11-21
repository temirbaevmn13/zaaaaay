import { useEffect, useRef } from 'react';
import type { PointerEvent as ReactPointerEvent, RefObject, ReactNode } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Camera, Gift, Heart, Instagram, MapPin, MessageCircle, Paintbrush2, Sparkles, Truck } from 'lucide-react';
import handprintImage from './assets/images/handprint_kit_1782142632713.jpg';
import paintingImage from './assets/images/paint_by_numbers_kit_1782142648892.jpg';

const WHATSAPP = '996709322111';
const INSTAGRAM = 'https://www.instagram.com/palette_bishkek/';
const MAP_URL = 'https://2gis.kg/bishkek/search/%D0%92%D0%BE%D1%81%D1%82%D0%BE%D0%BA%205%2020';
const wa = (message: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
const generalOrder = wa('Здравствуйте! Хочу сделать заказ в Palette Bishkek. Подскажите, пожалуйста, что есть в наличии?');

const products = [
  {
    id: 'hands',
    number: '01 / подарок с чувствами',
    title: 'Отпечатки рук',
    description: 'Холст с отпечатками ваших рук. Кисти и краски в комплекте.',
    color: 'pink',
    Icon: Heart,
    rows: [
      { name: 'Набор №1', detail: '1 холст 20×30 · 4 кисти · 3 краски', price: '890 сом', message: 'Здравствуйте! Хочу заказать набор №1 для отпечатков рук: 1 холст 20×30, 4 кисти, 3 краски. Цена: 890 сом.' },
      { name: 'Набор №2', detail: '2 холста 20×30 · 4 кисти · краски', price: '1 190 сом', message: 'Здравствуйте! Хочу заказать набор №2 для отпечатков рук: 2 холста 20×30, 4 кисти, краски. Цена: 1 190 сом.' },
      { name: 'Сияющий блеск', detail: 'Дополнение к набору', price: '+70 сом', message: 'Здравствуйте! Хочу добавить сияющий блеск за 70 сом к набору для отпечатков рук.' },
    ],
    note: 'Подарок, сделанный своими руками.',
  },
  {
    id: 'photo',
    number: '02 / ваша фотография',
    title: 'Картина по вашему фото',
    description: 'Вы присылаете фото, мы делаем картину по номерам. От 26 до 52 цветов.',
    color: 'blue',
    Icon: Camera,
    rows: [
      { name: '30 × 40 см', detail: 'Картина по вашему фото', price: '1 950 сом', message: 'Здравствуйте! Хочу заказать картину по номерам по моей фотографии, размер 30×40 см, цена 1 950 сом. Пришлю фото отдельным сообщением.' },
      { name: '40 × 50 см', detail: 'Картина по вашему фото', price: '2 450 сом', message: 'Здравствуйте! Хочу заказать картину по номерам по моей фотографии, размер 40×50 см, цена 2 450 сом. Пришлю фото отдельным сообщением.' },
      { name: '50 × 70 см', detail: 'Картина по вашему фото', price: '3 250 сом', message: 'Здравствуйте! Хочу заказать картину по номерам по моей фотографии, размер 50×70 см, цена 3 250 сом. Пришлю фото отдельным сообщением.' },
    ],
    note: 'Предоплата 50%. После неё отмена невозможна. Срок — 12–18 дней.',
  },
  {
    id: 'ready',
    number: '03 / творческий вечер',
    title: 'Готовые картины',
    description: 'Выбирайте сюжет из доступных эскизов — и создавайте своё маленькое искусство.',
    color: 'orange',
    Icon: Paintbrush2,
    rows: [
      { name: '1 картина', detail: 'Картина по номерам 40×50 см', price: '1 250 сом', message: 'Здравствуйте! Хочу заказать одну готовую картину по номерам 40×50 см за 1 250 сом. Какие сюжеты есть в наличии?' },
      { name: '3 картины', detail: 'Третья в подарок или скидка 15%', price: 'АКЦИЯ', message: 'Здравствуйте! Интересует акция на 3 картины по номерам: третья в подарок или скидка 15%. Подскажите доступные сюжеты.' },
    ],
    note: 'Уточняйте наличие выбранного сюжета.',
  },
];

const marqueeItems = [
  'Готово за 1 день',
  'Бесплатная доставка по Бишкеку',
  'Самовывоз: Восток-5',
  'Картины по фото: предоплата 50%',
];

const splashColors = ['#ff3ea5', '#2d6bff', '#ffa42e', '#8fe04a', '#ffffff'];
type Particle = { x: number; y: number; vx: number; vy: number; radius: number; age: number; life: number; color: string };

function PaintSplash({ hostRef, burstRef }: { hostRef: RefObject<HTMLElement | null>; burstRef: RefObject<(x: number, y: number) => void> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let particles: Particle[] = [];
    let frame: number | null = null;
    let last = 0;
    let w = 0;
    let h = 0;
    let timerOne: number | undefined;
    let timerTwo: number | undefined;
    let pixelRatio = 1;

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      w = bounds.width;
      h = bounds.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * pixelRatio);
      canvas.height = Math.round(h * pixelRatio);
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const render = (now: number) => {
      const delta = Math.min((now - (last || now)) / 16.67, 2);
      last = now;
      ctx.clearRect(0, 0, w, h);
      particles = particles.filter((particle) => particle.age < particle.life);
      for (const particle of particles) {
        particle.age += delta;
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;
        particle.vy += 0.04 * delta;
        const progress = Math.min(particle.age / particle.life, 1);
        ctx.beginPath();
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = (1 - progress) ** 1.4 * 0.76;
        ctx.arc(particle.x, particle.y, Math.max(0.1, particle.radius * (1 - progress * 0.35)), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      frame = particles.length ? window.requestAnimationFrame(render) : null;
    };

    const splash = (x: number, y: number) => {
      if (reducedMotion.matches) return;
      for (let i = 0; i < 28; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 5;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 3 + Math.random() * 13,
          age: 0,
          life: 34 + Math.random() * 33,
          color: splashColors[i % splashColors.length],
        });
      }
      if (frame === null) {
        last = 0;
        frame = window.requestAnimationFrame(render);
      }
    };

    burstRef.current = splash;
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    if (!reducedMotion.matches) {
      timerOne = window.setTimeout(() => splash(w * 0.25, h * 0.35), 1000);
      timerTwo = window.setTimeout(() => splash(w * 0.78, h * 0.62), 1400);
    }
    return () => {
      observer.disconnect();
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.clearTimeout(timerOne);
      window.clearTimeout(timerTwo);
      burstRef.current = () => {};
    };
  }, [hostRef, burstRef]);

  return <canvas ref={canvasRef} aria-hidden="true" className="paint-canvas" />;
}

function InstagramIcon({ label = 'Открыть Instagram', small = false }: { label?: string; small?: boolean }) {
  return (
    <a className={`instagram-icon ${small ? 'instagram-icon--small' : ''}`} href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label={label}>
      <Instagram size={small ? 18 : 20} strokeWidth={2.2} aria-hidden="true" />
    </a>
  );
}

function GlossyButton({ children, href, className = '' }: { children: ReactNode; href: string; className?: string }) {
  return (
    <a className={`button button--pink ${className}`} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default function App() {
  const heroRef = useRef<HTMLElement>(null);
  const burstRef = useRef<(x: number, y: number) => void>(() => {});

  const handleHeroPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.target instanceof Element && event.target.closest('a, button')) return;
    const box = heroRef.current?.getBoundingClientRect();
    if (box) burstRef.current(event.clientX - box.left, event.clientY - box.top);
  };

  return (
    <div className="site-shell">
      <div className="bokeh bokeh--blue" aria-hidden="true" />
      <div className="bokeh bokeh--orange" aria-hidden="true" />
      <div className="bokeh bokeh--lime" aria-hidden="true" />
      <div className="bokeh bokeh--pink" aria-hidden="true" />
      <div className="bokeh bokeh--aqua" aria-hidden="true" />

      <header className="site-header">
        <div className="container header-inner">
          <a className="wordmark" href="#top" aria-label="Palette Bishkek — на главную">
            palette<span className="wordmark-dot">.</span>bishkek
          </a>
          <div className="header-actions">
            <InstagramIcon />
            <GlossyButton href={generalOrder} className="header-whatsapp">
              <MessageCircle size={18} strokeWidth={2.4} aria-hidden="true" />
              <span>Написать в WhatsApp</span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </GlossyButton>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero" ref={heroRef} onPointerDown={handleHeroPointerDown}>
          <PaintSplash hostRef={heroRef} burstRef={burstRef} />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow enter enter--one"><span className="eyebrow-star">✳</span> ТВОРЧЕСКАЯ МАСТЕРСКАЯ В БИШКЕКЕ</div>
              <h1 className="hero-title enter enter--two">Ваша <span className="story-word">история<svg className="squiggle" viewBox="0 0 390 36" fill="none" preserveAspectRatio="none" aria-hidden="true"><path d="M5 25C48 2 72 9 110 20S175 29 214 15 276 10 315 20 359 19 385 9" stroke="currentColor" strokeWidth="10" strokeLinecap="round" /></svg></span> на холсте<span className="hero-title-dot">.</span></h1>
              <p className="hero-description enter enter--three">Отпечатки рук и картины по номерам.<br />Готово за 1 день.</p>
              <div className="hero-actions enter enter--four">
                <GlossyButton href={generalOrder} className="hero-primary"><MessageCircle size={19} aria-hidden="true" />Заказать в WhatsApp<ArrowUpRight size={17} aria-hidden="true" /></GlossyButton>
                <a className="button button--glass" href="#prices">Смотреть цены <ArrowDown size={18} aria-hidden="true" /></a>
                <a className="button button--glass hero-instagram" href={INSTAGRAM} target="_blank" rel="noopener noreferrer"><Instagram size={19} aria-hidden="true" /> Instagram</a>
              </div>
              <p className="hero-hint enter enter--five"><span className="hint-star" aria-hidden="true">✳</span> Нажмите на фон, чтобы оставить мазок краски.</p>
            </div>

            <div className="hero-art enter enter--three" aria-label="Набор для отпечатков рук и картина по номерам">
              <div className="orbit orbit--large" aria-hidden="true" />
              <div className="orbit orbit--small" aria-hidden="true" />
              <div className="photo-arch photo-arch--left"><img src={handprintImage} alt="Набор для отпечатков рук на холсте" loading="eager" /></div>
              <div className="photo-arch photo-arch--right"><img src={paintingImage} alt="Картина по номерам с красками и кистями" loading="eager" /></div>
              <div className="float-label float-label--price"><span className="label-sparkle">✦</span> от 890 сом</div>
              <div className="float-label float-label--ready"><span className="label-dot label-dot--lime" /> Готово за 1 день</div>
              <div className="float-label float-label--delivery"><Truck size={17} aria-hidden="true" /> Доставка бесплатно</div>
              <div className="hero-decoration decoration--one" aria-hidden="true">✷</div>
              <div className="hero-decoration decoration--two" aria-hidden="true">✳</div>
            </div>
          </div>
        </section>

        <div className="marquee" aria-label={marqueeItems.join(' · ')}>
          <div className="marquee-track" aria-hidden="true">
            {[0, 1, 2, 3].map((set) => (
              <div className="marquee-group" key={set}>
                {marqueeItems.map((item, index) => <span className="marquee-item" key={`${set}-${index}`}><span className={`marquee-dot marquee-dot--${index}`} />{item}</span>)}
              </div>
            ))}
          </div>
        </div>

        <section className="prices-section" id="prices">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="section-kicker"><Sparkles size={17} aria-hidden="true" /> ВЫБИРАЙТЕ СВОЁ</span>
                <h2>Что <span>заказать</span><span className="section-dot">?</span></h2>
              </div>
              <p>Нажмите на строку, и откроется WhatsApp с готовым сообщением.</p>
            </div>
            <div className="product-grid">
              {products.map(({ id, number, title, description, color, Icon, rows, note }) => (
                <article className={`product-card product-card--${color}`} key={id}>
                  <div className="product-topline"><span>{number}</span><ArrowUpRight size={17} aria-hidden="true" /></div>
                  <div className={`product-orb product-orb--${color}`}><Icon size={28} strokeWidth={1.85} aria-hidden="true" /></div>
                  <h3>{title}</h3>
                  <p className="product-description">{description}</p>
                  <div className="product-rows">
                    {rows.map((row) => (
                      <a className="price-row" key={row.name} href={wa(row.message)} target="_blank" rel="noopener noreferrer" aria-label={`Заказать: ${row.name}, ${row.price} через WhatsApp`}>
                        <span className="row-copy"><strong>{row.name}</strong><small>{row.detail}</small></span>
                        <span className={`row-price ${row.price === 'АКЦИЯ' ? 'row-price--promo' : ''}`}>{row.price}</span>
                        <ArrowUpRight className="row-arrow" size={17} aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                  <p className="product-note"><span aria-hidden="true">✳</span>{note}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="delivery-section">
          <div className="container">
            <div className="delivery-panel">
              <div className="delivery-symbol"><Gift size={34} aria-hidden="true" /></div>
              <div className="delivery-copy"><span className="delivery-kicker">ДОСТАВИМ С ЛЮБОВЬЮ</span><h2>Бесплатная доставка<br />по Бишкеку</h2><a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="map-link"><MapPin size={17} aria-hidden="true" /> Самовывоз: Восток-5 <span>· открыть в 2ГИС</span><ArrowUpRight size={15} aria-hidden="true" /></a></div>
              <GlossyButton href={generalOrder} className="delivery-cta"><MessageCircle size={19} aria-hidden="true" />Написать в WhatsApp <ArrowUpRight size={17} aria-hidden="true" /></GlossyButton>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-inner"><span><strong>palette<span className="wordmark-dot">.</span>bishkek</strong> <span className="footer-divider">·</span> WhatsApp <a className="footer-phone" href={generalOrder} target="_blank" rel="noopener noreferrer">+996 709 322 111</a></span><a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="footer-instagram">Instagram @palette_bishkek <ArrowUpRight size={16} aria-hidden="true" /></a></div></footer>

      <nav className="mobile-order-bar" aria-label="Быстрый заказ"><InstagramIcon label="Наш Instagram" small /><GlossyButton href={generalOrder} className="mobile-order-button"><MessageCircle size={19} aria-hidden="true" />Заказать в WhatsApp<ArrowUpRight size={17} aria-hidden="true" /></GlossyButton></nav>
    </div>
  );
}