import { useState } from "react";
import Icon from "@/components/ui/icon";

const MONTHS = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
const DAYS_SHORT = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];
const AVAILABLE_DAYS: Record<string, number[]> = {
  "2026-3": [2, 4, 7, 9, 14, 16, 21, 23, 28, 30],
  "2026-4": [1, 3, 6, 8, 13, 15, 20, 22, 27, 29],
};
const TIMES = ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

const BG = "#0d1f1a";
const BG3 = "#162820";
const GOLD = "hsl(40,55%,52%)";
const BORDER = "rgba(255,255,255,0.08)";

export default function CalendarBooking() {
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

  return (
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
  );
}
