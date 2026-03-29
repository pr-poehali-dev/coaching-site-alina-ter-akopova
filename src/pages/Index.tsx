import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/2d30cba3-c867-4b7e-a3dd-90b59ba425fb/bucket/d154da29-d981-47f6-90c2-c47b15ba31aa.jpg";

const CLIENTS = [
  { name: "Мария Соколова", role: "CEO, TechVenture", text: "Работа с Алиной изменила мой подход к управлению командой. За 3 месяца мы выросли на 40%." },
  { name: "Дмитрий Власов", role: "Основатель, BuildGroup", text: "Алина помогла мне выйти из операционной ловушки и наконец сосредоточиться на стратегии." },
  { name: "Наталья Жук", role: "Директор по маркетингу", text: "Чёткие инструменты, конкретные результаты. Никакой воды — только работающие решения." },
  { name: "Андрей Карпов", role: "Предприниматель", text: "Через месяц коучинга закрыл сделку, которую тянул два года. Алина меняет угол зрения." },
];

const PRODUCTS = [
  {
    icon: "User",
    title: "Индивидуальный коучинг",
    desc: "Персональные сессии 1:1, разработка стратегии роста, работа с ограничивающими убеждениями. Фокус на конкретном результате.",
    duration: "60 мин / сессия",
  },
  {
    icon: "Users",
    title: "Коучинг для команд",
    desc: "Работа с управленческими командами: построение доверия, снятие конфликтов, повышение эффективности коммуникации.",
    duration: "90 мин / сессия",
  },
  {
    icon: "TrendingUp",
    title: "Карьерный трекинг",
    desc: "Программа на 3 месяца для руководителей, переходящих на новый уровень. Карьерная стратегия, личный бренд, переговоры.",
    duration: "3 месяца",
  },
  {
    icon: "Target",
    title: "VIP-интенсив",
    desc: "Однодневная глубокая работа для быстрого решения ключевого запроса: стратегия, решение, план действий.",
    duration: "1 день",
  },
];

const PRICES = [
  {
    name: "Стартовый",
    price: "15 000 ₽",
    period: "за сессию",
    features: ["1 сессия 60 мин", "Аудиозапись встречи", "Резюме по итогам", "Поддержка в мессенджере 3 дня"],
    highlight: false,
  },
  {
    name: "Месячный пакет",
    price: "50 000 ₽",
    period: "4 сессии",
    features: ["4 сессии по 60 мин", "Поддержка между сессиями", "Домашние задания", "Приоритетное расписание", "Материалы и инструменты"],
    highlight: true,
  },
  {
    name: "Карьерный трекинг",
    price: "120 000 ₽",
    period: "3 месяца",
    features: ["12 сессий по 60 мин", "Еженедельный чек-ин", "Личный план развития", "Работа с резюме и LinkedIn", "Подготовка к переговорам"],
    highlight: false,
  },
];

const FAQS = [
  { q: "Как проходят сессии?", a: "Сессии проводятся онлайн в Zoom или очно в Москве. Длительность — 60 или 90 минут в зависимости от формата. После каждой встречи вы получаете краткое резюме и задание." },
  { q: "Как быстро появятся результаты?", a: "Первые изменения заметны уже после 2–3 сессий. Глубокая трансформация требует 1–3 месяцев работы. Всё зависит от вашей готовности к действиям." },
  { q: "Чем коучинг отличается от консультации?", a: "Консультант даёт готовые ответы. Коуч помогает вам найти ваши собственные решения — те, которые действительно работают для вас. Это делает результат устойчивым." },
  { q: "Можно ли перенести сессию?", a: "Да. Перенос возможен при уведомлении за 24 часа. Мы всегда найдём удобное время." },
  { q: "Есть ли бесплатная пробная сессия?", a: "Да, я провожу бесплатную 20-минутную встречу-знакомство, чтобы вы могли почувствовать формат и понять, подходим ли мы друг другу." },
];

const MONTHS = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
const DAYS_SHORT = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];

const AVAILABLE_DAYS: Record<string, number[]> = {
  "2026-3": [2, 4, 7, 9, 14, 16, 21, 23, 28, 30],
  "2026-4": [1, 3, 6, 8, 13, 15, 20, 22, 27, 29],
};

const TIMES = ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

export default function Index() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [calMonth, setCalMonth] = useState(2);
  const [calYear, setCalYear] = useState(2026);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingDone, setBookingDone] = useState(false);

  const navItems = ["Клиенты", "Рекомендации", "Продукты", "Стоимость", "Вопросы", "Контакты"];

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => {
    const d = new Date(year, month, 1).getDay();
    return d === 0 ? 6 : d - 1;
  };

  const availableKey = `${calYear}-${calMonth + 1}`;
  const availDays = AVAILABLE_DAYS[availableKey] || [];

  const handleBook = () => {
    if (selectedDay && selectedTime) setBookingDone(true);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-cream font-body">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display text-xl font-semibold text-navy tracking-wide"
          >
            А. Тер-Акопова
          </button>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-sm font-body text-muted-foreground hover:text-navy transition-colors tracking-wide"
              >
                {item}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollTo("контакты")}
            className="bg-navy text-cream text-sm px-5 py-2 hover:bg-gold hover:text-navy transition-all duration-300 font-body tracking-wide"
          >
            Записаться
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-16 min-h-screen flex items-center bg-navy relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(255,255,255,0.3) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(255,255,255,0.3) 60px)" }}
        />
        <div className="max-w-6xl mx-auto px-6 w-full py-20 grid md:grid-cols-2 gap-16 items-center">
          {/* ФОТО — слева */}
          <div className="relative animate-fade-in hidden md:block" style={{ animationDelay: "0.1s" }}>
            <div className="absolute -inset-4 border border-gold/20" />
            <div className="absolute -inset-8 border border-gold/10" />
            <img
              src={HERO_IMAGE}
              alt="Алина Тер-Акопова"
              className="relative w-full object-cover object-top aspect-[3/4]"
              style={{ objectPosition: "50% 10%" }}
            />
            <div className="absolute bottom-6 -right-6 bg-gold px-6 py-4">
              <div className="font-display text-2xl font-semibold text-navy">ICF</div>
              <div className="text-navy/70 text-xs font-body tracking-wide mt-0.5">Сертифицированный коуч</div>
            </div>
          </div>
          {/* ТЕКСТ — справа */}
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-gold" />
              <span className="text-gold font-body text-sm tracking-[0.2em] uppercase">Алина Тер-Акопова</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-light text-cream leading-tight mb-3">
              Executive коуч,
            </h1>
            <h1 className="font-display text-4xl md:text-5xl font-light text-cream leading-tight mb-3">
              фасилитатор,
            </h1>
            <h1 className="font-display text-4xl md:text-5xl italic font-normal text-gold leading-tight mb-8">
              Бизнес-тренер
            </h1>
            <p className="text-cream/70 font-body text-lg leading-relaxed mb-10">
              Для топ-руководителей и их команд
            </p>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollTo("продукты")}
                className="border border-gold text-gold font-body px-8 py-3.5 hover:bg-gold hover:text-navy transition-all duration-300 text-sm tracking-wide text-left"
              >
                Узнать подробнее об экспертизе
              </button>
              <button
                onClick={() => scrollTo("контакты")}
                className="bg-gold text-navy font-body font-semibold px-8 py-3.5 hover:bg-cream transition-all duration-300 tracking-wide text-sm text-left"
              >
                Записаться на химическую сессию
              </button>
            </div>
            <div className="mt-14 flex gap-10">
              {[["8+", "лет практики"], ["200+", "клиентов"], ["94%", "достигают цели"]].map(([num, label]) => (
                <div key={label}>
                  <div className="font-display text-3xl font-semibold text-gold">{num}</div>
                  <div className="text-cream/50 text-xs font-body mt-1 tracking-wide">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section id="клиенты" className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold text-xs tracking-[0.25em] uppercase font-body">Портфолио</span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-navy mt-3">Клиенты</h2>
            <div className="section-divider mt-6" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {[
              ["Стартапы", "35+", "проектов"],
              ["Корпорации", "20+", "компаний"],
              ["Топ-менеджеры", "80+", "клиентов"],
              ["Предприниматели", "65+", "историй"],
            ].map(([cat, num, sub]) => (
              <div key={cat} className="bg-cream p-10 text-center hover:bg-secondary transition-colors duration-300">
                <div className="font-display text-5xl font-light text-navy mb-2">{num}</div>
                <div className="text-gold text-xs tracking-[0.2em] uppercase font-body mb-1">{sub}</div>
                <div className="text-muted-foreground text-sm font-body">{cat}</div>
              </div>
            ))}
          </div>
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              { name: "Яндекс", desc: "Программа развития для менеджеров продукта" },
              { name: "Сбер", desc: "Командный коучинг для отдела стратегии" },
              { name: "МТС", desc: "VIP-сессии для топ-руководителей" },
              { name: "Ozon", desc: "Карьерный трекинг для директоров" },
              { name: "ВТБ", desc: "Коучинг лидерства и управления изменениями" },
              { name: "Авито", desc: "Индивидуальные программы для C-level" },
            ].map(({ name, desc }) => (
              <div key={name} className="border border-border p-6 hover:border-gold transition-colors duration-300 group">
                <div className="font-display text-2xl font-semibold text-navy group-hover:text-gold transition-colors">{name}</div>
                <div className="text-muted-foreground text-sm font-body mt-2">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="рекомендации" className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 border border-gold/10 -translate-x-1/2 -translate-y-1/2 rounded-full" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold text-xs tracking-[0.25em] uppercase font-body">Отзывы</span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-cream mt-3">Рекомендации</h2>
            <div className="section-divider mt-6" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {CLIENTS.map((c, i) => (
              <div key={i} className="border border-cream/10 p-8 hover:border-gold/40 transition-all duration-300 group relative">
                <div className="font-display text-7xl text-gold/20 absolute top-4 right-6 leading-none select-none">"</div>
                <p className="text-cream/80 font-body leading-relaxed text-base mb-8 relative z-10">
                  {c.text}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gold/20 border border-gold/40 flex items-center justify-center">
                    <span className="font-display text-gold font-semibold text-lg">{c.name[0]}</span>
                  </div>
                  <div>
                    <div className="text-cream font-body font-semibold text-sm">{c.name}</div>
                    <div className="text-cream/50 font-body text-xs mt-0.5">{c.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="продукты" className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold text-xs tracking-[0.25em] uppercase font-body">Форматы работы</span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-navy mt-3">Продукты</h2>
            <div className="section-divider mt-6" />
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-border">
            {PRODUCTS.map((p, i) => (
              <div key={i} className="bg-cream p-10 hover:bg-secondary transition-colors duration-300 group">
                <div className="w-12 h-12 border border-gold/40 flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors">
                  <Icon name={p.icon} size={20} className="text-gold" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-navy mb-3">{p.title}</h3>
                <p className="text-muted-foreground font-body leading-relaxed text-sm mb-6">{p.desc}</p>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={14} className="text-gold" />
                  <span className="text-gold text-xs font-body tracking-wide">{p.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="стоимость" className="py-24 bg-secondary/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold text-xs tracking-[0.25em] uppercase font-body">Инвестиции</span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-navy mt-3">Стоимость</h2>
            <div className="section-divider mt-6" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {PRICES.map((p, i) => (
              <div
                key={i}
                className={`p-8 border relative flex flex-col transition-all duration-300 ${
                  p.highlight
                    ? "bg-navy border-navy text-cream"
                    : "bg-cream border-border hover:border-gold"
                }`}
              >
                {p.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold px-5 py-1">
                    <span className="text-navy text-xs font-body font-semibold tracking-wide uppercase">Популярный</span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className={`font-display text-2xl font-semibold mb-2 ${p.highlight ? "text-cream" : "text-navy"}`}>
                    {p.name}
                  </h3>
                  <div className={`font-display text-4xl font-light ${p.highlight ? "text-gold" : "text-navy"}`}>
                    {p.price}
                  </div>
                  <div className={`text-xs font-body mt-1 tracking-wide ${p.highlight ? "text-cream/60" : "text-muted-foreground"}`}>
                    {p.period}
                  </div>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {p.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-3">
                      <Icon name="Check" size={14} className="mt-1 flex-shrink-0 text-gold" />
                      <span className={`text-sm font-body ${p.highlight ? "text-cream/80" : "text-muted-foreground"}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollTo("контакты")}
                  className={`w-full py-3 font-body text-sm tracking-wide transition-all duration-300 ${
                    p.highlight
                      ? "bg-gold text-navy hover:bg-cream font-semibold"
                      : "border border-navy text-navy hover:bg-navy hover:text-cream"
                  }`}
                >
                  Выбрать
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground text-sm font-body mt-8">
            Первая ознакомительная встреча — бесплатно. Работаю удалённо и очно в Москве.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="вопросы" className="py-24 bg-cream">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold text-xs tracking-[0.25em] uppercase font-body">Ответы</span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-navy mt-3">Частые вопросы</h2>
            <div className="section-divider mt-6" />
          </div>
          <div className="space-y-px">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-border">
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-secondary/50 transition-colors"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                >
                  <span className="font-body font-semibold text-navy text-sm pr-4">{faq.q}</span>
                  <Icon
                    name={faqOpen === i ? "Minus" : "Plus"}
                    size={16}
                    className="text-gold flex-shrink-0"
                  />
                </button>
                {faqOpen === i && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground font-body text-sm leading-relaxed border-t border-border pt-4">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALENDAR */}
      <section className="py-24 bg-secondary/40">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold text-xs tracking-[0.25em] uppercase font-body">Расписание</span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-navy mt-3">Доступное время</h2>
            <div className="section-divider mt-6" />
          </div>

          {!bookingDone ? (
            <div className="bg-cream border border-border p-8">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => {
                    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
                    else setCalMonth(m => m - 1);
                    setSelectedDay(null); setSelectedTime(null);
                  }}
                  className="w-9 h-9 border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                >
                  <Icon name="ChevronLeft" size={16} />
                </button>
                <span className="font-display text-xl font-semibold text-navy">
                  {MONTHS[calMonth]} {calYear}
                </span>
                <button
                  onClick={() => {
                    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
                    else setCalMonth(m => m + 1);
                    setSelectedDay(null); setSelectedTime(null);
                  }}
                  className="w-9 h-9 border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                >
                  <Icon name="ChevronRight" size={16} />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS_SHORT.map(d => (
                  <div key={d} className="text-center text-xs text-muted-foreground font-body py-1">{d}</div>
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
                      className={`h-9 text-sm font-body transition-all duration-200 ${
                        isSel
                          ? "bg-navy text-cream font-semibold"
                          : isAvail
                          ? "bg-gold/15 text-navy hover:bg-gold hover:text-navy font-medium border border-gold/30"
                          : "text-muted-foreground/40 cursor-default"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {selectedDay && (
                <div className="mt-8 border-t border-border pt-6">
                  <p className="text-sm font-body text-navy font-semibold mb-4">
                    Выберите время — {selectedDay} {MONTHS[calMonth]}
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {TIMES.map(t => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`py-2 text-sm font-body border transition-all duration-200 ${
                          selectedTime === t
                            ? "bg-navy text-cream border-navy font-semibold"
                            : "border-border text-navy hover:border-gold hover:text-gold"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedDay && selectedTime && (
                <div className="mt-6 p-4 bg-gold/10 border border-gold/30 flex items-center justify-between">
                  <div>
                    <span className="font-body text-navy text-sm font-semibold">
                      {selectedDay} {MONTHS[calMonth]}, {selectedTime}
                    </span>
                    <p className="text-muted-foreground text-xs font-body mt-0.5">Консультация 60 мин</p>
                  </div>
                  <button
                    onClick={handleBook}
                    className="bg-navy text-cream px-6 py-2 font-body text-sm hover:bg-gold hover:text-navy transition-all duration-300"
                  >
                    Подтвердить
                  </button>
                </div>
              )}

              <p className="text-xs text-muted-foreground font-body mt-4 text-center">
                Выделенные даты — свободные слоты для консультаций
              </p>
            </div>
          ) : (
            <div className="bg-cream border border-gold/40 p-10 text-center">
              <div className="w-14 h-14 bg-gold/15 border border-gold/40 flex items-center justify-center mx-auto mb-6">
                <Icon name="CheckCircle" size={28} className="text-gold" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-navy mb-3">Запись подтверждена</h3>
              <p className="text-muted-foreground font-body text-sm mb-2">
                {selectedDay} {MONTHS[calMonth]}, {selectedTime} — Консультация 60 мин
              </p>
              <p className="text-muted-foreground font-body text-sm">
                Алина свяжется с вами для подтверждения и деталей встречи.
              </p>
              <button
                onClick={() => { setBookingDone(false); setSelectedDay(null); setSelectedTime(null); }}
                className="mt-6 text-xs text-muted-foreground font-body hover:text-gold underline"
              >
                Выбрать другое время
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CONTACTS */}
      <section id="контакты" className="py-24 bg-navy">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold text-xs tracking-[0.25em] uppercase font-body">Связь</span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-cream mt-3">Контакты</h2>
            <div className="section-divider mt-6" />
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-cream/70 font-body leading-relaxed mb-10">
                Напишите мне — обсудим ваш запрос и определим, как именно я могу помочь. Первая встреча-знакомство проходит бесплатно.
              </p>
              <div className="space-y-6">
                {[
                  { icon: "Mail", label: "Email", value: "alina@ter-akopova.ru" },
                  { icon: "Phone", label: "Телефон", value: "+7 (999) 000-00-00" },
                  { icon: "MapPin", label: "Локация", value: "Москва / Онлайн" },
                  { icon: "Instagram", label: "Instagram", value: "@alina.coach" },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                      <Icon name={icon} size={16} className="text-gold" />
                    </div>
                    <div>
                      <div className="text-cream/40 text-xs font-body tracking-wide uppercase mb-0.5">{label}</div>
                      <div className="text-cream/90 font-body text-sm">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form
              className="space-y-4"
              onSubmit={(e) => { e.preventDefault(); alert("Сообщение отправлено!"); }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-cream/50 text-xs font-body tracking-wide uppercase block mb-2">Имя</label>
                  <input
                    type="text"
                    className="w-full bg-cream/5 border border-cream/15 text-cream font-body text-sm px-4 py-3 focus:outline-none focus:border-gold placeholder-cream/20"
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <label className="text-cream/50 text-xs font-body tracking-wide uppercase block mb-2">Телефон</label>
                  <input
                    type="tel"
                    className="w-full bg-cream/5 border border-cream/15 text-cream font-body text-sm px-4 py-3 focus:outline-none focus:border-gold placeholder-cream/20"
                    placeholder="+7 (---) ---"
                  />
                </div>
              </div>
              <div>
                <label className="text-cream/50 text-xs font-body tracking-wide uppercase block mb-2">Email</label>
                <input
                  type="email"
                  className="w-full bg-cream/5 border border-cream/15 text-cream font-body text-sm px-4 py-3 focus:outline-none focus:border-gold placeholder-cream/20"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="text-cream/50 text-xs font-body tracking-wide uppercase block mb-2">Ваш запрос</label>
                <textarea
                  rows={4}
                  className="w-full bg-cream/5 border border-cream/15 text-cream font-body text-sm px-4 py-3 focus:outline-none focus:border-gold placeholder-cream/20 resize-none"
                  placeholder="Опишите кратко, с чем хотите поработать..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gold text-navy font-body font-semibold py-3 hover:bg-cream transition-all duration-300 text-sm tracking-wide"
              >
                Отправить заявку
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navy border-t border-cream/10 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-cream/60 text-lg">А. Тер-Акопова</div>
          <div className="text-cream/30 text-xs font-body">© 2026 Алина Тер-Акопова. Все права защищены.</div>
          <div className="flex gap-6">
            {navItems.map(item => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-cream/40 text-xs font-body hover:text-gold transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}