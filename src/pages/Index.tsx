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
  { icon: "User", title: "Индивидуальный коучинг", desc: "Персональные сессии 1:1, разработка стратегии роста, работа с ограничивающими убеждениями.", duration: "60 мин / сессия" },
  { icon: "Users", title: "Коучинг для команд", desc: "Работа с управленческими командами: построение доверия, снятие конфликтов, коммуникация.", duration: "90 мин / сессия" },
  { icon: "TrendingUp", title: "Карьерный трекинг", desc: "Программа на 3 месяца для руководителей, переходящих на новый уровень. Карьерная стратегия.", duration: "3 месяца" },
  { icon: "Target", title: "VIP-интенсив", desc: "Однодневная глубокая работа для быстрого решения ключевого запроса: стратегия, план действий.", duration: "1 день" },
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
    <div className="min-h-screen bg-white font-body text-[#0f0f0f]">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#f0f0f0]">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-heading text-sm font-500 tracking-[0.15em] uppercase text-[#0f0f0f]"
          >
            Алина Тер-Акопова
          </button>
          <div className="hidden md:flex items-center gap-10">
            {["Экспертиза", "Клиенты", "Стоимость", "Контакты"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-xs font-body font-light text-[#888] hover:text-[#0f0f0f] transition-colors tracking-wide"
              >
                {item}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollTo("контакты")}
            className="bg-[#0f0f0f] text-white text-xs px-6 py-2.5 font-body font-light tracking-widest uppercase hover:bg-[hsl(28,60%,52%)] transition-all duration-300"
          >
            Записаться
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-16 min-h-screen flex">
        <div className="max-w-7xl mx-auto px-8 w-full grid md:grid-cols-2">
          {/* ФОТО — слева */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0s" }}>
            <img
              src={HERO_IMAGE}
              alt="Алина Тер-Акопова"
              className="w-full h-full object-cover object-top"
              style={{ minHeight: "100vh", maxHeight: "100vh" }}
            />
          </div>

          {/* ТЕКСТ — справа */}
          <div className="flex flex-col justify-center px-12 py-20 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <p className="text-xs font-heading font-normal tracking-[0.3em] uppercase text-[hsl(28,60%,52%)] mb-10">
              Executive Coach · ICF Certified
            </p>
            <h1 className="font-display text-6xl md:text-7xl font-light leading-[1.05] text-[#0f0f0f] mb-2">
              Executive
            </h1>
            <h1 className="font-display text-6xl md:text-7xl font-light leading-[1.05] text-[#0f0f0f] mb-2">
              коуч,
            </h1>
            <h1 className="font-display text-6xl md:text-7xl italic font-light leading-[1.05] text-[hsl(28,60%,52%)] mb-2">
              фасилитатор,
            </h1>
            <h1 className="font-display text-6xl md:text-7xl font-light leading-[1.05] text-[#0f0f0f] mb-10">
              бизнес-тренер
            </h1>

            <p className="font-body font-light text-[#555] text-lg leading-relaxed mb-12">
              Для топ-руководителей<br />и их команд
            </p>

            <div className="flex flex-col gap-3 mb-16">
              <button
                onClick={() => scrollTo("экспертиза")}
                className="border border-[#0f0f0f] text-[#0f0f0f] font-body font-light text-sm py-4 px-8 tracking-widest uppercase hover:bg-[#0f0f0f] hover:text-white transition-all duration-300"
              >
                Узнать подробнее об экспертизе
              </button>
              <button
                onClick={() => scrollTo("контакты")}
                className="bg-[hsl(28,60%,52%)] text-white font-body font-light text-sm py-4 px-8 tracking-widest uppercase hover:bg-[#0f0f0f] transition-all duration-300"
              >
                Записаться на химическую сессию
              </button>
            </div>

            <div className="flex gap-12 border-t border-[#f0f0f0] pt-10">
              {[["8+", "лет практики"], ["200+", "клиентов"], ["94%", "достигают цели"]].map(([num, label]) => (
                <div key={label}>
                  <div className="font-display text-4xl font-light text-[#0f0f0f]">{num}</div>
                  <div className="text-[#aaa] text-xs font-body font-light mt-1 tracking-wide">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section id="экспертиза" className="py-32 bg-[#f8f8f8]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-xs font-heading tracking-[0.3em] uppercase text-[hsl(28,60%,52%)] mb-6">Экспертиза</p>
              <h2 className="font-display text-5xl md:text-6xl font-light text-[#0f0f0f] leading-tight mb-8">
                Трансформация<br /><em>через действие</em>
              </h2>
              <p className="font-body font-light text-[#555] text-base leading-relaxed mb-6">
                Работаю на стыке бизнес-психологии, стратегического мышления и лидерства. Мои клиенты — топ-менеджеры крупных компаний, собственники и команды в периоды роста и изменений.
              </p>
              <p className="font-body font-light text-[#555] text-base leading-relaxed">
                Подход основан на ICF-методологии, нейронауках и работе с системным мышлением. Результат — не инсайт, а конкретное изменение в поведении и бизнесе.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-px bg-[#e8e8e8]">
              {[
                ["Яндекс", "Развитие менеджеров продукта"],
                ["Сбер", "Командный коучинг"],
                ["МТС", "VIP-сессии C-level"],
                ["Ozon", "Карьерный трекинг директоров"],
                ["ВТБ", "Лидерство и изменения"],
                ["Авито", "Индивидуальные программы"],
              ].map(([name, desc]) => (
                <div key={name} className="bg-white p-8 hover:bg-[hsl(28,60%,52%)] group transition-all duration-300">
                  <div className="font-heading text-base font-500 text-[#0f0f0f] group-hover:text-white mb-1 transition-colors">{name}</div>
                  <div className="text-xs font-body font-light text-[#999] group-hover:text-white/80 transition-colors">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section id="клиенты" className="py-24 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
            {[
              ["35+", "Стартапов"],
              ["20+", "Корпораций"],
              ["80+", "Топ-менеджеров"],
              ["94%", "Достигают цели"],
            ].map(([num, label]) => (
              <div key={label} className="bg-[#0f0f0f] px-10 py-14 text-center">
                <div className="font-display text-5xl font-light text-white mb-3">{num}</div>
                <div className="text-xs font-body font-light text-[#666] tracking-widest uppercase">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-16">
            <p className="text-xs font-heading tracking-[0.3em] uppercase text-[hsl(28,60%,52%)] mb-4">Отзывы</p>
            <h2 className="font-display text-5xl font-light text-[#0f0f0f]">Рекомендации</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {CLIENTS.map((c, i) => (
              <div key={i} className="p-10 bg-[#f8f8f8] hover:bg-[#f0f0f0] transition-colors duration-300">
                <p className="font-display text-2xl font-light text-[#0f0f0f] leading-relaxed mb-8 italic">
                  «{c.text}»
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-px bg-[hsl(28,60%,52%)]" />
                  <div>
                    <div className="font-heading text-xs font-500 text-[#0f0f0f] tracking-wide">{c.name}</div>
                    <div className="text-xs font-body font-light text-[#999] mt-0.5">{c.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="экспертиза" className="py-32 bg-[#f8f8f8]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-16">
            <p className="text-xs font-heading tracking-[0.3em] uppercase text-[hsl(28,60%,52%)] mb-4">Форматы</p>
            <h2 className="font-display text-5xl font-light text-[#0f0f0f]">Как я работаю</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-[#e8e8e8]">
            {PRODUCTS.map((p, i) => (
              <div key={i} className="bg-white p-10 group hover:bg-[#0f0f0f] transition-all duration-400">
                <div className="mb-8">
                  <Icon name={p.icon} size={20} className="text-[hsl(28,60%,52%)]" />
                </div>
                <h3 className="font-heading text-base font-500 text-[#0f0f0f] group-hover:text-white mb-3 transition-colors">{p.title}</h3>
                <p className="font-body font-light text-[#777] group-hover:text-white/60 text-sm leading-relaxed mb-6 transition-colors">{p.desc}</p>
                <div className="text-xs font-heading tracking-widest uppercase text-[hsl(28,60%,52%)]">{p.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="стоимость" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-16">
            <p className="text-xs font-heading tracking-[0.3em] uppercase text-[hsl(28,60%,52%)] mb-4">Инвестиции</p>
            <h2 className="font-display text-5xl font-light text-[#0f0f0f]">Стоимость</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {PRICES.map((p, i) => (
              <div
                key={i}
                className={`p-10 flex flex-col border transition-all duration-300 ${
                  p.highlight
                    ? "bg-[#0f0f0f] border-[#0f0f0f]"
                    : "bg-white border-[#e8e8e8] hover:border-[#0f0f0f]"
                }`}
              >
                {p.highlight && (
                  <span className="text-[10px] font-heading tracking-[0.3em] uppercase text-[hsl(28,60%,52%)] mb-8">— Популярный выбор</span>
                )}
                <div className="mb-10">
                  <h3 className={`font-heading text-sm font-500 tracking-wide uppercase mb-4 ${p.highlight ? "text-white/60" : "text-[#999]"}`}>
                    {p.name}
                  </h3>
                  <div className={`font-display text-5xl font-light ${p.highlight ? "text-white" : "text-[#0f0f0f]"}`}>
                    {p.price}
                  </div>
                  <div className={`text-xs font-body font-light mt-2 ${p.highlight ? "text-white/40" : "text-[#bbb]"}`}>
                    {p.period}
                  </div>
                </div>
                <ul className="space-y-3 flex-1 mb-10">
                  {p.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-3">
                      <span className="text-[hsl(28,60%,52%)] mt-0.5 flex-shrink-0">—</span>
                      <span className={`text-sm font-body font-light ${p.highlight ? "text-white/70" : "text-[#555]"}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollTo("контакты")}
                  className={`w-full py-3.5 text-xs font-heading tracking-widest uppercase transition-all duration-300 ${
                    p.highlight
                      ? "bg-[hsl(28,60%,52%)] text-white hover:bg-white hover:text-[#0f0f0f]"
                      : "border border-[#0f0f0f] text-[#0f0f0f] hover:bg-[#0f0f0f] hover:text-white"
                  }`}
                >
                  Выбрать
                </button>
              </div>
            ))}
          </div>
          <p className="text-[#aaa] text-xs font-body font-light mt-8">
            Первая ознакомительная встреча — бесплатно. Работаю онлайн и очно в Москве.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-[#f8f8f8]">
        <div className="max-w-3xl mx-auto px-8">
          <div className="mb-16">
            <p className="text-xs font-heading tracking-[0.3em] uppercase text-[hsl(28,60%,52%)] mb-4">FAQ</p>
            <h2 className="font-display text-5xl font-light text-[#0f0f0f]">Частые вопросы</h2>
          </div>
          <div className="divide-y divide-[#e8e8e8]">
            {FAQS.map((faq, i) => (
              <div key={i}>
                <button
                  className="w-full flex items-center justify-between py-6 text-left"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                >
                  <span className="font-body font-light text-[#0f0f0f] text-base pr-8">{faq.q}</span>
                  <Icon
                    name={faqOpen === i ? "Minus" : "Plus"}
                    size={14}
                    className="text-[hsl(28,60%,52%)] flex-shrink-0"
                  />
                </button>
                {faqOpen === i && (
                  <div className="pb-6">
                    <p className="font-body font-light text-[#777] text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALENDAR */}
      <section className="py-32 bg-white">
        <div className="max-w-2xl mx-auto px-8">
          <div className="mb-12">
            <p className="text-xs font-heading tracking-[0.3em] uppercase text-[hsl(28,60%,52%)] mb-4">Расписание</p>
            <h2 className="font-display text-5xl font-light text-[#0f0f0f]">Выбрать время</h2>
          </div>

          {!bookingDone ? (
            <div>
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={() => {
                    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
                    else setCalMonth(m => m - 1);
                    setSelectedDay(null); setSelectedTime(null);
                  }}
                  className="w-9 h-9 flex items-center justify-center border border-[#e8e8e8] hover:border-[#0f0f0f] transition-colors"
                >
                  <Icon name="ChevronLeft" size={14} />
                </button>
                <span className="font-heading text-sm font-500 tracking-widest uppercase">
                  {MONTHS[calMonth]} {calYear}
                </span>
                <button
                  onClick={() => {
                    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
                    else setCalMonth(m => m + 1);
                    setSelectedDay(null); setSelectedTime(null);
                  }}
                  className="w-9 h-9 flex items-center justify-center border border-[#e8e8e8] hover:border-[#0f0f0f] transition-colors"
                >
                  <Icon name="ChevronRight" size={14} />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS_SHORT.map(d => (
                  <div key={d} className="text-center text-[10px] text-[#bbb] font-heading tracking-widest uppercase py-2">{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: getFirstDayOfMonth(calYear, calMonth) }).map((_, i) => (
                  <div key={`e-${i}`} className="h-10" />
                ))}
                {Array.from({ length: getDaysInMonth(calYear, calMonth) }, (_, i) => i + 1).map(day => {
                  const isAvail = availDays.includes(day);
                  const isSel = selectedDay === day;
                  return (
                    <button
                      key={day}
                      disabled={!isAvail}
                      onClick={() => { setSelectedDay(day); setSelectedTime(null); }}
                      className={`h-10 text-xs font-body transition-all duration-200 ${
                        isSel
                          ? "bg-[#0f0f0f] text-white"
                          : isAvail
                          ? "bg-[#f8f8f8] text-[#0f0f0f] hover:bg-[hsl(28,60%,52%)] hover:text-white border border-[#e8e8e8]"
                          : "text-[#ddd] cursor-default"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {selectedDay && (
                <div className="mt-10">
                  <p className="text-xs font-heading tracking-widest uppercase text-[#999] mb-4">
                    {selectedDay} {MONTHS[calMonth]} — выберите время
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {TIMES.map(t => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`py-3 text-xs font-body transition-all duration-200 border ${
                          selectedTime === t
                            ? "bg-[#0f0f0f] text-white border-[#0f0f0f]"
                            : "border-[#e8e8e8] text-[#0f0f0f] hover:border-[#0f0f0f]"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedDay && selectedTime && (
                <div className="mt-8 flex items-center justify-between p-6 bg-[#f8f8f8]">
                  <div>
                    <div className="font-heading text-sm font-500">
                      {selectedDay} {MONTHS[calMonth]}, {selectedTime}
                    </div>
                    <div className="text-[#aaa] text-xs font-light mt-0.5">Консультация 60 мин</div>
                  </div>
                  <button
                    onClick={() => { if (selectedDay && selectedTime) setBookingDone(true); }}
                    className="bg-[#0f0f0f] text-white px-8 py-3 text-xs font-heading tracking-widest uppercase hover:bg-[hsl(28,60%,52%)] transition-all duration-300"
                  >
                    Подтвердить
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="w-12 h-12 flex items-center justify-center mx-auto mb-6 border border-[hsl(28,60%,52%)]">
                <Icon name="Check" size={20} className="text-[hsl(28,60%,52%)]" />
              </div>
              <h3 className="font-display text-3xl font-light text-[#0f0f0f] mb-3">Запись подтверждена</h3>
              <p className="font-body font-light text-[#999] text-sm mb-2">
                {selectedDay} {MONTHS[calMonth]}, {selectedTime}
              </p>
              <p className="font-body font-light text-[#bbb] text-xs">
                Алина свяжется с вами для подтверждения деталей.
              </p>
              <button
                onClick={() => { setBookingDone(false); setSelectedDay(null); setSelectedTime(null); }}
                className="mt-8 text-xs text-[#bbb] font-body hover:text-[#0f0f0f] transition-colors underline underline-offset-4"
              >
                Выбрать другое время
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CONTACTS */}
      <section id="контакты" className="py-32 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-20 items-start">
            <div>
              <p className="text-xs font-heading tracking-[0.3em] uppercase text-[hsl(28,60%,52%)] mb-6">Связь</p>
              <h2 className="font-display text-5xl font-light text-white mb-8">Напишите мне</h2>
              <p className="font-body font-light text-white/50 text-base leading-relaxed mb-12">
                Обсудим ваш запрос и определим, как я могу помочь.<br />Первая встреча-знакомство — бесплатно.
              </p>
              <div className="space-y-6">
                {[
                  { icon: "Mail", label: "Email", value: "alina@ter-akopova.ru" },
                  { icon: "Phone", label: "Телефон", value: "+7 (999) 000-00-00" },
                  { icon: "MapPin", label: "Локация", value: "Москва / Онлайн" },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-center gap-5">
                    <Icon name={icon} size={14} className="text-[hsl(28,60%,52%)] flex-shrink-0" />
                    <div>
                      <div className="text-white/30 text-[10px] font-heading tracking-widest uppercase mb-0.5">{label}</div>
                      <div className="text-white/80 font-body font-light text-sm">{value}</div>
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
                  <label className="text-white/30 text-[10px] font-heading tracking-widest uppercase block mb-2">Имя</label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 text-white font-body font-light text-sm px-4 py-3.5 focus:outline-none focus:border-white/30 placeholder-white/20 transition-colors"
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <label className="text-white/30 text-[10px] font-heading tracking-widest uppercase block mb-2">Телефон</label>
                  <input
                    type="tel"
                    className="w-full bg-white/5 border border-white/10 text-white font-body font-light text-sm px-4 py-3.5 focus:outline-none focus:border-white/30 placeholder-white/20 transition-colors"
                    placeholder="+7 (---) ---"
                  />
                </div>
              </div>
              <div>
                <label className="text-white/30 text-[10px] font-heading tracking-widest uppercase block mb-2">Email</label>
                <input
                  type="email"
                  className="w-full bg-white/5 border border-white/10 text-white font-body font-light text-sm px-4 py-3.5 focus:outline-none focus:border-white/30 placeholder-white/20 transition-colors"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="text-white/30 text-[10px] font-heading tracking-widest uppercase block mb-2">Запрос</label>
                <textarea
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 text-white font-body font-light text-sm px-4 py-3.5 focus:outline-none focus:border-white/30 placeholder-white/20 resize-none transition-colors"
                  placeholder="Опишите кратко, с чем хотите поработать..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[hsl(28,60%,52%)] text-white font-heading font-light py-4 hover:bg-white hover:text-[#0f0f0f] transition-all duration-300 text-xs tracking-widest uppercase"
              >
                Отправить заявку
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0f0f0f] border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-heading text-white/30 text-xs tracking-widest uppercase">Алина Тер-Акопова</div>
          <div className="text-white/20 text-[10px] font-body font-light">© 2026 Все права защищены</div>
          <div className="flex gap-8">
            {["Экспертиза", "Стоимость", "Контакты"].map(item => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-white/30 text-[10px] font-heading tracking-widest uppercase hover:text-white/60 transition-colors"
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
