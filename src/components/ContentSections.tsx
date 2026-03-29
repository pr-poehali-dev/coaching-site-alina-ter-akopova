import { useState } from "react";
import Icon from "@/components/ui/icon";

const CLIENTS = [
  { name: "Мария Соколова", role: "CEO, TechVenture", text: "Работа с Алиной изменила мой подход к управлению командой. За 3 месяца мы выросли на 40%." },
  { name: "Дмитрий Власов", role: "Основатель, BuildGroup", text: "Алина помогла мне выйти из операционной ловушки и наконец сосредоточиться на стратегии." },
  { name: "Наталья Жук", role: "Директор по маркетингу", text: "Чёткие инструменты, конкретные результаты. Никакой воды — только работающие решения." },
  { name: "Андрей Карпов", role: "Предприниматель", text: "Через месяц коучинга закрыл сделку, которую тянул два года. Алина меняет угол зрения." },
];

const PRODUCTS = [
  { icon: "User", title: "Индивидуальный коучинг", desc: "Персональные сессии 1:1, разработка стратегии роста, работа с ограничивающими убеждениями. Фокус на конкретном результате.", duration: "60 мин / сессия" },
  { icon: "Users", title: "Коучинг для команд", desc: "Работа с управленческими командами: построение доверия, снятие конфликтов, коммуникация.", duration: "90 мин / сессия" },
  { icon: "TrendingUp", title: "Карьерный трекинг", desc: "Программа на 3 месяца для руководителей, переходящих на новый уровень. Стратегия, личный бренд.", duration: "3 месяца" },
  { icon: "Target", title: "VIP-интенсив", desc: "Однодневная глубокая работа для быстрого решения ключевого запроса: стратегия и план.", duration: "1 день" },
];

const PRICES = [
  { name: "Стартовый", price: "15 000 ₽", period: "за сессию", features: ["1 сессия 60 мин", "Аудиозапись встречи", "Резюме по итогам", "Поддержка 3 дня"], highlight: false },
  { name: "Месячный пакет", price: "50 000 ₽", period: "4 сессии", features: ["4 сессии по 60 мин", "Поддержка между сессиями", "Домашние задания", "Приоритетное расписание", "Материалы"], highlight: true },
  { name: "Карьерный трекинг", price: "120 000 ₽", period: "3 месяца", features: ["12 сессий по 60 мин", "Еженедельный чек-ин", "Личный план развития", "Работа с резюме", "Подготовка к переговорам"], highlight: false },
];

const FAQS = [
  { q: "Как проходят сессии?", a: "Онлайн в Zoom или очно в Москве. 60–90 минут. После встречи — краткое резюме и задание." },
  { q: "Как быстро появятся результаты?", a: "Первые изменения — после 2–3 сессий. Глубокая трансформация — 1–3 месяца. Всё зависит от вашей готовности к действиям." },
  { q: "Чем коучинг отличается от консультации?", a: "Консультант даёт готовые ответы. Коуч помогает найти ваши собственные решения — те, что действительно работают." },
  { q: "Можно ли перенести сессию?", a: "Да. Перенос возможен при уведомлении за 24 часа." },
  { q: "Есть ли бесплатная пробная сессия?", a: "Да — бесплатная 20-минутная встреча-знакомство, чтобы почувствовать формат." },
];

const BG = "#0d1f1a";
const BG2 = "#112018";
const BG3 = "#162820";
const GOLD = "hsl(40,55%,52%)";
const BORDER = "rgba(255,255,255,0.08)";

interface ContentSectionsProps {
  scrollTo: (id: string) => void;
}

export default function ContentSections({ scrollTo }: ContentSectionsProps) {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <>
      {/* CLIENTS / STATS */}
      <section id="клиенты" className="py-20" style={{ background: BG2 }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: BORDER }}>
            {[
              ["35+", "стартапов"],
              ["20+", "корпораций"],
              ["200+", "клиентов"],
              ["94%", "достигают цели"],
            ].map(([num, label]) => (
              <div key={label} className="px-10 py-12 text-center" style={{ background: BG2 }}>
                <div className="font-black text-5xl mb-2" style={{ color: GOLD }}>{num}</div>
                <div className="text-xs font-light uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-4">
            {[
              ["Яндекс", "Развитие менеджеров продукта"],
              ["Сбер", "Командный коучинг"],
              ["МТС", "VIP-сессии для C-level"],
              ["Ozon", "Карьерный трекинг директоров"],
              ["ВТБ", "Лидерство и управление изменениями"],
              ["Авито", "Индивидуальные программы"],
            ].map(([name, desc]) => (
              <div
                key={name}
                className="p-6 rounded-sm transition-all duration-300 group cursor-default"
                style={{ background: BG3, border: `1px solid ${BORDER}` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = GOLD)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = BORDER)}
              >
                <div className="font-bold text-base mb-1" style={{ color: "#fff" }}>{name}</div>
                <div className="text-xs font-light" style={{ color: "rgba(255,255,255,0.45)" }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="рекомендации" className="py-24" style={{ background: BG }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-12">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>Отзывы</p>
            <h2 className="font-black text-4xl md:text-5xl uppercase" style={{ color: "#fff" }}>Рекомендации</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {CLIENTS.map((c, i) => (
              <div key={i} className="p-8 rounded-sm" style={{ background: BG3, border: `1px solid ${BORDER}` }}>
                <p className="text-base font-light leading-relaxed mb-8 italic" style={{ color: "rgba(255,255,255,0.75)" }}>
                  «{c.text}»
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-px" style={{ background: GOLD }} />
                  <div>
                    <div className="font-semibold text-sm" style={{ color: "#fff" }}>{c.name}</div>
                    <div className="text-xs font-light mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{c.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="продукты" className="py-24" style={{ background: BG2 }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-12">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>Форматы</p>
            <h2 className="font-black text-4xl md:text-5xl uppercase" style={{ color: "#fff" }}>Продукты</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {PRODUCTS.map((p, i) => (
              <div
                key={i}
                className="p-8 rounded-sm transition-all duration-300"
                style={{ background: BG3, border: `1px solid ${BORDER}` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = GOLD)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = BORDER)}
              >
                <Icon name={p.icon} size={22} style={{ color: GOLD }} className="mb-5" />
                <h3 className="font-bold text-base mb-2" style={{ color: "#fff" }}>{p.title}</h3>
                <p className="text-sm font-light leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>{p.desc}</p>
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: GOLD }}>{p.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="стоимость" className="py-24" style={{ background: BG }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-12">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>Инвестиции</p>
            <h2 className="font-black text-4xl md:text-5xl uppercase" style={{ color: "#fff" }}>Стоимость</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PRICES.map((p, i) => (
              <div
                key={i}
                className="p-8 rounded-sm flex flex-col"
                style={{
                  background: p.highlight ? BG3 : BG2,
                  border: `1px solid ${p.highlight ? GOLD : BORDER}`,
                }}
              >
                {p.highlight && (
                  <span className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-6" style={{ color: GOLD }}>★ Популярный выбор</span>
                )}
                <h3 className="font-semibold text-sm uppercase tracking-wide mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>{p.name}</h3>
                <div className="font-black text-4xl mb-1" style={{ color: "#fff" }}>{p.price}</div>
                <div className="text-xs font-light mb-8" style={{ color: "rgba(255,255,255,0.3)" }}>{p.period}</div>
                <ul className="space-y-3 flex-1 mb-8">
                  {p.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-3">
                      <span style={{ color: GOLD }}>—</span>
                      <span className="text-sm font-light" style={{ color: "rgba(255,255,255,0.6)" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollTo("контакты")}
                  className="w-full py-3 text-xs font-semibold uppercase tracking-widest rounded-sm transition-all duration-300"
                  style={p.highlight
                    ? { background: GOLD, color: BG }
                    : { border: `1px solid ${GOLD}`, color: GOLD, background: "transparent" }
                  }
                  onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = BG; }}
                  onMouseLeave={e => {
                    if (p.highlight) { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = BG; }
                    else { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = GOLD; }
                  }}
                >
                  Выбрать
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs font-light mt-6" style={{ color: "rgba(255,255,255,0.3)" }}>
            Первая ознакомительная встреча — бесплатно. Онлайн и очно в Москве.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="вопросы" className="py-24" style={{ background: BG2 }}>
        <div className="max-w-3xl mx-auto px-8">
          <div className="mb-12">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>FAQ</p>
            <h2 className="font-black text-4xl md:text-5xl uppercase" style={{ color: "#fff" }}>Частые вопросы</h2>
          </div>
          <div style={{ borderTop: `1px solid ${BORDER}` }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${BORDER}` }}>
                <button
                  className="w-full flex items-center justify-between py-5 text-left"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                >
                  <span className="font-semibold text-sm pr-8" style={{ color: "#fff" }}>{faq.q}</span>
                  <Icon name={faqOpen === i ? "Minus" : "Plus"} size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                </button>
                {faqOpen === i && (
                  <div className="pb-5">
                    <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
