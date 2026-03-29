import HeroSection from "@/components/HeroSection";
import ContentSections from "@/components/ContentSections";
import CalendarBooking from "@/components/CalendarBooking";
import ContactsFooter from "@/components/ContactsFooter";

const BG = "#0d1f1a";

export default function Index() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen font-body" style={{ background: BG, color: "#f0f0f0" }}>
      <HeroSection scrollTo={scrollTo} />
      <ContentSections scrollTo={scrollTo} />
      <CalendarBooking />
      <ContactsFooter scrollTo={scrollTo} />
    </div>
  );
}
