const HERO_IMAGE = "https://cdn.poehali.dev/files/d25099c3-0805-44d5-aec8-5a24db6d905d.png";

const BG = "#0d1f1a";
const BG2 = "#112018";
const GOLD = "hsl(40,55%,52%)";
const BORDER = "rgba(255,255,255,0.08)";

interface HeroSectionProps {
  scrollTo: (id: string) => void;
}

export default function HeroSection({ scrollTo }: HeroSectionProps) {
  return (
    <>
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
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 60% 80% at 70% 50%, rgba(20,60,40,0.6) 0%, transparent 70%)`
        }} />

        <div className="max-w-7xl mx-auto px-8 w-full grid md:grid-cols-2 items-center relative z-10">
          {/* ТЕКСТ — справа */}
          <div className="py-24 animate-fade-in order-2" style={{ animationDelay: "0.1s" }}>
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

          {/* ФОТО — слева */}
          <div className="relative hidden md:flex justify-center items-end h-full animate-fade-in order-1" style={{ animationDelay: "0.3s" }}>
            {/* золотое свечение за силуэтом */}
            <div className="absolute pointer-events-none" style={{
              inset: "8% 12%",
              background: `radial-gradient(ellipse 60% 70% at 50% 40%, rgba(180,135,55,0.25) 0%, rgba(180,135,55,0.1) 40%, transparent 70%)`,
              filter: "blur(30px)",
              zIndex: 0,
            }} />
            <div className="absolute pointer-events-none" style={{
              inset: "15% 18%",
              background: `radial-gradient(ellipse 45% 55% at 50% 35%, rgba(220,170,80,0.15) 0%, transparent 60%)`,
              filter: "blur(50px)",
              zIndex: 0,
            }} />
            <img
              src={HERO_IMAGE}
              alt="Алина Тер-Акопова"
              className="object-contain object-bottom w-full relative"
              style={{
                maxHeight: "88vh",
                zIndex: 1,
                filter: "drop-shadow(0 0 40px rgba(180,135,55,0.15)) drop-shadow(0 0 80px rgba(180,135,55,0.08))",
                maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
              }}
            />
            <div className="absolute bottom-8 right-4 rounded-lg px-5 py-4 max-w-[220px]"
              style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(16px)", border: `1px solid ${GOLD}44`, zIndex: 2 }}>
              <p className="text-sm font-light leading-snug" style={{ color: "rgba(255,255,255,0.85)" }}>
                Более 1500 часов индивидуального коучинга за последние 5 лет
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}