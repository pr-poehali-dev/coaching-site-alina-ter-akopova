import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/2d30cba3-c867-4b7e-a3dd-90b59ba425fb/bucket/d154da29-d981-47f6-90c2-c47b15ba31aa.jpg";

const G = "hsl(40,55%,52%)"; // gold

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

const MONTHS = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
const DAYS_SHORT = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];
const AVAILABLE_DAYS: Record<string, number[]> = {
  "2026-3": [2, 4, 7, 9, 14, 16, 21, 23, 28, 30],
  "2026-4": [1, 3, 6, 8, 13, 15, 20, 22, 27, 29],
};
const TIMES = ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

// Цвета темы
const BG = "#0d1f1a";        // основной фон — тёмно-зелёный
const BG2 = "#112018";       // чуть темнее
const BG3 = "#162820";       // карточки
const GOLD = "hsl(40,55%,52%)";
const BORDER = "rgba(255,255,255,0.08)";

export default function Index() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [calMonth, setCalMonth] = useState(2);
  const [calYear, setCalYear] = useState(2026);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingDone, setBookingDone] = useState(false);

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => {
    const d = new Date(year, month, 1).getDay();
    return d === 0 ? 6 : d - 1;
  };

  const availableKey = `${calYear}-${calMonth + 1}`;
  const availDays = AVAILABLE_DAYS[availableKey] || [];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen font-body" style={{ background: BG, color: "#f0f0f0" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: BG2, borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center"
            style={{ border: `2px solid ${GOLD}` }}
          >
            <span className="font-bold text-sm leading-none" style={{ color: GOLD }}>АТ</span>
          </button>

          <div className="hidden md:flex items-center gap-9">
            {[
              ["Клиенты", "клиенты"],
              ["Рекомендации", "рекомендации"],
              ["Продукты", "продукты"],
              ["Стоимость", "стоимость"],
              ["Вопросы", "вопросы"],
              ["Контакты", "контакты"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-sm font-light transition-colors"
                style={{ color: "rgba(255,255,255,0.65)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("контакты")}
            className="text-sm font-semibold px-6 py-2 rounded-sm transition-all duration-300"
            style={{ background: "rgba(255,255,255,0.12)", color: "#fff" }}
            onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = BG; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#fff"; }}
          >
            Записаться
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-16 min-h-screen flex relative overflow-hidden">
        {/* фоновый градиент */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 60% 80% at 70% 50%, rgba(20,60,40,0.6) 0%, transparent 70%)`
        }} />

        <div className="max-w-7xl mx-auto px-8 w-full grid md:grid-cols-2 items-center relative z-10">
          {/* ТЕКСТ — слева */}
          <div className="py-24 animate-fade-in order-2 md:order-1" style={{ animationDelay: "0.1s" }}>
            <h1 className="font-black text-5xl md:text-6xl lg:text-7xl uppercase leading-tight mb-4" style={{ color: "#fff", letterSpacing: "-0.01em" }}>
              Алина<br />Тер-Акопова
            </h1>
            <h2 className="font-bold text-xl md:text-2xl uppercase leading-snug mb-5" style={{ color: "rgba(255,255,255,0.75)", letterSpacing: "0.02em" }}>
              Executive коуч,<br />фасилитатор,<br />бизнес-тренер
            </h2>
            <p className="text-base font-light mb-10" style={{ color: "rgba(255,255,255,0.6)" }}>
              Для топ-руководителей и их команд
            </p>

            <div className="flex flex-wrap gap-4 mb-14">
              <button
                onClick={() => scrollTo("контакты")}
                className="px-8 py-3.5 font-semibold text-sm rounded-sm transition-all duration-300"
                style={{ background: GOLD, color: BG }}
                onMouseEnter={e => (e.currentTarget.style.background = "hsl(40,65%,62%)")}
                onMouseLeave={e => (e.currentTarget.style.background = GOLD)}
              >
                Записаться на сессию
              </button>
              <button
                onClick={() => scrollTo("продукты")}
                className="px-8 py-3.5 font-semibold text-sm rounded-sm transition-all duration-300"
                style={{ border: `2px solid ${GOLD}`, color: GOLD, background: "transparent" }}
                onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = BG; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = GOLD; }}
              >
                Узнать об экспертизе
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: "1.5rem" }}>
              {[
                ["Более 12", "Количество лет\nв практике"],
                ["В списках Forbes", "Самый известный\nклиент"],
                ["СК «Олимпийский»", "Самая большая\nаудитория"],
              ].map(([val, label]) => (
                <div key={val}>
                  <div className="font-bold text-base leading-tight mb-1" style={{ color: "#fff" }}>{val}</div>
                  <div className="text-xs font-light leading-snug whitespace-pre-line" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ФОТО — справа */}
          <div className="relative hidden md:flex justify-center items-end h-full animate-fade-in order-1 md:order-2" style={{ animationDelay: "0.3s" }}>
            <img
              src={HERO_IMAGE}
              alt="Алина Тер-Акопова"
              className="object-cover object-top w-full"
              style={{ maxHeight: "90vh", maskImage: "linear-gradient(to bottom, white 70%, transparent 100%)" }}
            />
            {/* бейдж */}
            <div className="absolute bottom-10 right-0 rounded-lg px-5 py-4 max-w-[220px]"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)", border: `1px solid ${BORDER}` }}>
              <p className="text-sm font-light leading-snug" style={{ color: "rgba(255,255,255,0.85)" }}>
                Более 1500 часов индивидуального коучинга за последние 5 лет
              </p>
            </div>
          </div>
        </div>
      </section>

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

      {/* CALENDAR */}
      <section className="py-24" style={{ background: BG }}>
        <div className="max-w-2xl mx-auto px-8">
          <div className="mb-12">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>Расписание</p>
            <h2 className="font-black text-4xl uppercase" style={{ color: "#fff" }}>Выбрать время</h2>
          </div>

          {!bookingDone ? (
            <div className="p-8 rounded-sm" style={{ background: BG3, border: `1px solid ${BORDER}` }}>
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); } else setCalMonth(m => m - 1); setSelectedDay(null); setSelectedTime(null); }}
                  className="w-9 h-9 flex items-center justify-center transition-colors"
                  style={{ border: `1px solid ${BORDER}`, color: "rgba(255,255,255,0.6)" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = GOLD)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = BORDER)}
                >
                  <Icon name="ChevronLeft" size={14} />
                </button>
                <span className="font-bold text-sm uppercase tracking-widest" style={{ color: "#fff" }}>
                  {MONTHS[calMonth]} {calYear}
                </span>
                <button
                  onClick={() => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); } else setCalMonth(m => m + 1); setSelectedDay(null); setSelectedTime(null); }}
                  className="w-9 h-9 flex items-center justify-center transition-colors"
                  style={{ border: `1px solid ${BORDER}`, color: "rgba(255,255,255,0.6)" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = GOLD)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = BORDER)}
                >
                  <Icon name="ChevronRight" size={14} />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS_SHORT.map(d => (
                  <div key={d} className="text-center text-[10px] uppercase tracking-widest py-2" style={{ color: "rgba(255,255,255,0.3)" }}>{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: getFirstDayOfMonth(calYear, calMonth) }).map((_, i) => (
                  <div key={`e-${i}`} className="h-9" />
                ))}
                {Array.from({ length: getDaysInMonth(calYear, calMonth) }, (_, i) => i + 1).map(day => {
                  const isAvail = availDays.includes(day);
                  const isSel = selectedDay === day;
                  return (
                    <button
                      key={day}
                      disabled={!isAvail}
                      onClick={() => { setSelectedDay(day); setSelectedTime(null); }}
                      className="h-9 text-xs transition-all duration-200"
                      style={
                        isSel
                          ? { background: GOLD, color: BG, fontWeight: 700 }
                          : isAvail
                          ? { background: "rgba(255,255,255,0.07)", color: "#fff", border: `1px solid ${BORDER}` }
                          : { color: "rgba(255,255,255,0.2)", cursor: "default" }
                      }
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {selectedDay && (
                <div className="mt-8 pt-6" style={{ borderTop: `1px solid ${BORDER}` }}>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {selectedDay} {MONTHS[calMonth]} — выберите время
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {TIMES.map(t => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className="py-2.5 text-xs transition-all duration-200"
                        style={selectedTime === t
                          ? { background: GOLD, color: BG, fontWeight: 700 }
                          : { border: `1px solid ${BORDER}`, color: "rgba(255,255,255,0.6)" }
                        }
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedDay && selectedTime && (
                <div className="mt-6 flex items-center justify-between p-5 rounded-sm" style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${GOLD}` }}>
                  <div>
                    <div className="font-bold text-sm" style={{ color: "#fff" }}>{selectedDay} {MONTHS[calMonth]}, {selectedTime}</div>
                    <div className="text-xs font-light mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Консультация 60 мин</div>
                  </div>
                  <button
                    onClick={() => { if (selectedDay && selectedTime) setBookingDone(true); }}
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all duration-300"
                    style={{ background: GOLD, color: BG }}
                  >
                    Подтвердить
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="py-16 text-center rounded-sm" style={{ background: BG3, border: `1px solid ${GOLD}` }}>
              <div className="w-12 h-12 flex items-center justify-center mx-auto mb-6 rounded-full" style={{ border: `2px solid ${GOLD}` }}>
                <Icon name="Check" size={20} style={{ color: GOLD }} />
              </div>
              <h3 className="font-black text-2xl uppercase mb-3" style={{ color: "#fff" }}>Запись подтверждена</h3>
              <p className="text-sm font-light mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>{selectedDay} {MONTHS[calMonth]}, {selectedTime}</p>
              <p className="text-xs font-light" style={{ color: "rgba(255,255,255,0.3)" }}>Алина свяжется с вами для подтверждения деталей.</p>
              <button
                onClick={() => { setBookingDone(false); setSelectedDay(null); setSelectedTime(null); }}
                className="mt-8 text-xs font-light underline underline-offset-4 transition-colors"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Выбрать другое время
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CONTACTS */}
      <section id="контакты" className="py-24" style={{ background: BG2 }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-6" style={{ color: GOLD }}>Связь</p>
              <h2 className="font-black text-4xl md:text-5xl uppercase mb-8" style={{ color: "#fff" }}>Напишите мне</h2>
              <p className="text-base font-light leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.5)" }}>
                Обсудим ваш запрос и определим, как я могу помочь.<br />Первая встреча-знакомство — бесплатно.
              </p>
              <div className="space-y-5">
                {[
                  { icon: "Mail", label: "Email", value: "alina@ter-akopova.ru" },
                  { icon: "Phone", label: "Телефон", value: "+7 (999) 000-00-00" },
                  { icon: "MapPin", label: "Локация", value: "Москва / Онлайн" },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <Icon name={icon} size={14} style={{ color: GOLD }} />
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-widest mb-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{label}</div>
                      <div className="text-sm font-light" style={{ color: "rgba(255,255,255,0.8)" }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Сообщение отправлено!"); }}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Имя", type: "text", placeholder: "Ваше имя" },
                  { label: "Телефон", type: "tel", placeholder: "+7 (---) ---" },
                ].map(({ label, type, placeholder }) => (
                  <div key={label}>
                    <label className="text-[10px] font-semibold uppercase tracking-widest block mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>{label}</label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      className="w-full text-sm font-light px-4 py-3.5 focus:outline-none transition-colors"
                      style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER}`, color: "#fff" }}
                      onFocus={e => (e.currentTarget.style.borderColor = GOLD)}
                      onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-widest block mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>Email</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full text-sm font-light px-4 py-3.5 focus:outline-none transition-colors"
                  style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER}`, color: "#fff" }}
                  onFocus={e => (e.currentTarget.style.borderColor = GOLD)}
                  onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-widest block mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>Запрос</label>
                <textarea
                  rows={4}
                  placeholder="Опишите кратко, с чем хотите поработать..."
                  className="w-full text-sm font-light px-4 py-3.5 focus:outline-none transition-colors resize-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER}`, color: "#fff" }}
                  onFocus={e => (e.currentTarget.style.borderColor = GOLD)}
                  onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-300 rounded-sm"
                style={{ background: GOLD, color: BG }}
                onMouseEnter={e => (e.currentTarget.style.background = "hsl(40,65%,62%)")}
                onMouseLeave={e => (e.currentTarget.style.background = GOLD)}
              >
                Отправить заявку
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8" style={{ background: BG2, borderTop: `1px solid ${BORDER}` }}>
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-bold text-sm uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Алина Тер-Акопова</div>
          <div className="text-[10px] font-light" style={{ color: "rgba(255,255,255,0.2)" }}>© 2026 Все права защищены</div>
          <div className="flex gap-8">
            {[["Продукты","продукты"],["Стоимость","стоимость"],["Контакты","контакты"]].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-[10px] uppercase tracking-widest transition-colors"
                style={{ color: "rgba(255,255,255,0.25)" }}
                onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}