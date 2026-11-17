import { MessageCircle, Zap, Truck, MapPin, Gift } from 'lucide-react';

const WA = 'https://wa.me/996707323232';
const wa = (t: string) => `${WA}?text=${encodeURIComponent(t)}`;
const btn = 'inline-flex items-center justify-center gap-2 rounded-full bg-brand-terracotta hover:bg-brand-brick text-white font-bold px-6 py-3 transition-colors';

const trust = [
  { Icon: Zap, t: 'Готово за 1 день' },
  { Icon: Truck, t: 'Бесплатная доставка по Бишкеку' },
  { Icon: MapPin, t: 'Самовывоз: Восток-5' },
  { Icon: MessageCircle, t: 'Заказ в WhatsApp за 2 минуты' },
];
const steps = [
  ['Выберите набор', 'Отпечатки рук, картина по вашему фото или готовая картина из наличия.'],
  ['Напишите нам в WhatsApp', 'Уточним детали, цвета и дату. Для картин по фото нужна предоплата.'],
  ['Получите заказ', 'Бесплатная доставка по Бишкеку или самовывоз на Восток-5.'],
];
const occasions = ['Годовщину', 'Свадьбу', '14 февраля', '8 Марта', 'Нооруз', 'Рождение ребёнка'];
const faq = [
  ['Как быстро будет готов набор?', 'Отпечатки рук изготавливаем за 1 день в Бишкеке.'],
  ['Сколько стоят наборы?', 'Набор №1 с одним холстом 20×30 — 890 сом, набор №2 с двумя холстами — 1190 сом, глиттер +70 сом. Готовые картины — от 1250 сом.'],
  ['Есть ли скидки?', 'При заказе трёх готовых картин третья в подарок или скидка 15% — на ваш выбор.'],
  ['Как получить заказ?', 'Бесплатная доставка по городу или самовывоз на Восток-5. Адрес открывается в 2ГИС ниже на странице.'],
];

export function SalesBlocks() {
  return (
    <>
      <section className="bg-white border-b border-[#3d2c29]/10">
        <div className="max-w-6xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {trust.map(({ Icon, t }) => (
            <div key={t} className="flex items-center gap-2 text-sm font-semibold text-canvas-charcoal">
              <Icon size={20} className="text-brand-terracotta shrink-0" />{t}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-14">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-8">Как заказать</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {steps.map(([h, p], i) => (
            <div key={h} className="bg-white rounded-2xl p-6 border border-[#3d2c29]/10">
              <div className="w-9 h-9 rounded-full bg-brand-terracotta text-white font-bold flex items-center justify-center mb-3">{i + 1}</div>
              <h3 className="font-serif font-bold text-xl mb-1">{h}</h3>
              <p className="text-stone-600">{p}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a className={btn} href={wa('Здравствуйте! Хочу заказать набор.')} target="_blank" rel="noreferrer">
            <MessageCircle size={18} />Заказать в WhatsApp
          </a>
        </div>
      </section>

      <section className="bg-white border-y border-[#3d2c29]/10 py-14">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-2 flex items-center justify-center gap-2"><Gift className="text-brand-terracotta" />Подарок на любой повод</h2>
          <p className="text-stone-600 mb-6">Выберите повод — мы сразу подготовим сообщение для WhatsApp.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {occasions.map((o) => (
              <a key={o} href={wa(`Здравствуйте! Хочу набор в подарок на ${o}.`)} target="_blank" rel="noreferrer"
                 className="px-5 py-2.5 rounded-full border border-brand-terracotta text-brand-brick font-semibold hover:bg-brand-terracotta hover:text-white transition-colors">{o}</a>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-14">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-6">Частые вопросы</h2>
        {faq.map(([q, a]) => (
          <details key={q} className="bg-white rounded-xl border border-[#3d2c29]/10 p-4 mb-3">
            <summary className="font-semibold cursor-pointer">{q}</summary>
            <p className="mt-2 text-stone-600">{a}</p>
          </details>
        ))}
      </section>
    </>
  );
}

export function StickyOrderBar() {
  return (
    <>
      <div className="h-20 md:hidden" />
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-t border-[#3d2c29]/10 px-4 pt-3" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)' }}>
        <a className={btn + ' w-full'} href={wa('Здравствуйте! Хочу заказать набор.')} target="_blank" rel="noreferrer">
          <MessageCircle size={18} />Заказать в WhatsApp
        </a>
      </div>
    </>
  );
}
