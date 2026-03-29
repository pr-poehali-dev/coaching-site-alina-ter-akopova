import Icon from "@/components/ui/icon";

const BG2 = "#112018";
const GOLD = "hsl(40,55%,52%)";
const BORDER = "rgba(255,255,255,0.08)";

interface ContactsFooterProps {
  scrollTo: (id: string) => void;
}

export default function ContactsFooter({ scrollTo }: ContactsFooterProps) {
  return (
    <>
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
                style={{ background: GOLD, color: BG2 }}
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
    </>
  );
}
