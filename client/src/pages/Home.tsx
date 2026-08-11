// Broadcast Atelier direction: this page uses archive warmth, signal-red wayfinding, and an asymmetric broadcast-sheet rhythm.
import { FormEvent, useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Camera,
  ChevronDown,
  Facebook,
  Globe2,
  LogIn,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Mic2,
  Moon,
  Play,
  Radio,
  Send,
  Sun,
  X,
  Youtube,
} from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "@/contexts/ThemeContext";

const asset = {
  hero: "/manus-storage/kasha-hero_1ba6a444.jpg",
  culture: "/manus-storage/kasha-culture_d54ac47e.jpg",
  audio: "/manus-storage/kasha-audio_bdbb9064.jpg",
  event: "/manus-storage/kasha-event_aa68d261.jpg",
  mark: "/manus-storage/kasha-signal-mark_87b5eda2.png",
};

const uiCopy = {
  en: {
    about: "About", programs: "Programs", services: "Services", journal: "Journal", talk: "Let's talk", admin: "Admin",
    heroEyebrow: "On air / Addis Ababa", heroA: "Stories with a pulse.", heroB: "Places with a memory.", heroIntro: "Kasha Multimedia connects radio, documentary, culture, and events to make room for the voices that move Ethiopia forward.", heroCta: "Find your frequency", heroWhy: "Why Kasha",
    weekly: "Weekly radio programme", everySunday: "Every Sunday", forTwoHours: "for two hours.", heroNote: "A live conversation with the country's stories, ideas, and inherited ways of knowing.",
    aboutEyebrow: "A programme, a platform, a point of view", aboutA: "We go closer to the country's", aboutB: "living archive.", aboutBody: "Kasha began as a weekly radio programme built to inform, teach, compare, and delight. Today, it is a multimedia practice for the stories that deserve a wider room: indigenous knowledge, cultural value, natural memory, and the people carrying all of it into tomorrow.", aboutQuote: "To understand where we are going, we listen for what the land and its people already know.", readStory: "Read the full story",
    programsEyebrow: "A frequency for every kind of curiosity", programsA: "One signal.", programsB: "Many ways in.", programsSummary: "Ten programme ideas. One shared intention: entertain while making space for deeper thought, better questions, and the stories that rarely get the first microphone.",
    servicesEyebrow: "From the first note to the full room", servicesA: "Built for stories", servicesB: "that travel.", servicesSummary: "Kasha brings an editorial eye and a production hand to every format. The medium changes; the care does not.",
    eventEyebrow: "A room for the next story", eventA: "Make the moment", eventB: "worth remembering.", eventBody: "From a cultural gathering to a public conversation, we help events find their voice before the doors open and keep it moving after the lights go down.", eventCta: "Talk event production",
    journalEyebrow: "Notes from the desk", journalA: "Keep the signal", journalB: "in the room.", viewNotes: "View all notes",
    contactEyebrow: "Bring us the story", contactA: "What should", contactB: "we listen to?", contactBody: "Tell us what is on your mind, what you are building, or whose voice needs a better signal. We will take it from there.", name: "Name", email: "Email", brief: "What are you making?", send: "Send the note", placeholderName: "Your name", placeholderEmail: "you@example.com", placeholderBrief: "A programme, an event, a field note...",
  },
  am: {
    about: "ስለ እኛ", programs: "ፕሮግራሞች", services: "አገልግሎቶች", journal: "መዝገብ", talk: "እንነጋገር", admin: "አስተዳዳሪ",
    heroEyebrow: "በአየር ላይ / አዲስ አበባ", heroA: "ልብ የሚነኩ ታሪኮች።", heroB: "ትዝታ ያላቸው ቦታዎች።", heroIntro: "ካሻ መልቲሚድያ ሬዲዮን፣ ዶክመንተሪን፣ ባህልንና ዝግጅቶችን በማገናኘት ኢትዮጵያን ወደፊት የሚያንቀሳቅሱ ድምፆችን ያቀርባል።", heroCta: "የራስዎን ድምፅ ያግኙ", heroWhy: "ለምን ካሻ",
    weekly: "የሳምንታዊ ሬዲዮ ፕሮግራም", everySunday: "እያንዳንዱ እሁድ", forTwoHours: "ለሁለት ሰዓት።", heroNote: "ከሀገራችን ታሪኮች፣ ሀሳቦችና የተወረሱ ዕውቀቶች ጋር የሚደረግ ቀጥታ ውይይት።",
    aboutEyebrow: "ፕሮግራም፣ መድረክ፣ አቋም", aboutA: "ወደ ሀገራችን", aboutB: "ሕያው መዝገብ እንቀርባለን።", aboutBody: "ካሻ ለማሳወቅ፣ ለማስተማርና ለማዝናናት እንደ ሳምንታዊ የሬዲዮ ፕሮግራም ጀመረ። ዛሬ ቦታ የሚገባቸውን ታሪኮች የሚያቀርብ መልቲሚድያ መድረክ ነው።", aboutQuote: "ወዴት እንደምንሄድ ለመረዳት፣ መሬቱና ሰዎቹ የሚያውቁትን እንሰማለን።", readStory: "ሙሉ ታሪኩን ያንብቡ",
    programsEyebrow: "ለእያንዳንዱ ጉጉት የራሱ ድምፅ", programsA: "አንድ ምልክት።", programsB: "ብዙ መንገዶች።", programsSummary: "አሥር የፕሮግራም ሀሳቦች። አንድ ዓላማ፤ በጥልቀት እንድናስብና የማይሰሙ ታሪኮች ድምፅ እንዲያገኙ ማድረግ።",
    servicesEyebrow: "ከመጀመሪያው ሀሳብ እስከ ሙሉ መድረክ", servicesA: "ለሚጓዙ ታሪኮች", servicesB: "የተሰራ።", servicesSummary: "ካሻ በእያንዳንዱ መልክ የአርትኦት ዓይንና የምርት ብቃት ያመጣል።",
    eventEyebrow: "ለሚቀጥለው ታሪክ መድረክ", eventA: "የዚህን ጊዜ", eventB: "የሚያስታውስ ያድርጉ።", eventBody: "ከባህላዊ ስብሰባ እስከ ሕዝባዊ ውይይት፣ ዝግጅቱ ድምፁን እንዲያገኝ እንረዳለን።", eventCta: "ስለ ዝግጅት እንነጋገር",
    journalEyebrow: "ከካሻ ጠረጴዛ", journalA: "ምልክቱን", journalB: "በመድረኩ ያቆዩ።", viewNotes: "ሁሉንም ማስታወሻዎች ይመልከቱ",
    contactEyebrow: "ታሪኩን ይዘው ይምጡ", contactA: "ምንን", contactB: "እንስማ?", contactBody: "ምን እያዘጋጁ እንደሆነ ወይም የትኛው ድምፅ በተሻለ መልኩ መሰማት እንዳለበት ይንገሩን።", name: "ስም", email: "ኢሜይል", brief: "ምን እያዘጋጁ ነው?", send: "መልዕክቱን ይላኩ", placeholderName: "ስምዎ", placeholderEmail: "you@example.com", placeholderBrief: "ፕሮግራም፣ ዝግጅት፣ የመስክ ማስታወሻ...",
  },
} as const;

const programs = [
  {
    index: "01",
    title: "Yisatefu",
    english: "Participate",
    detail: "A question-led hour that makes room for the whole room.",
    tag: "Interactive radio",
  },
  {
    index: "02",
    title: "Zikre Bahil",
    english: "Cultural memory",
    detail: "People, practices, and places remembered in their own register.",
    tag: "Field notes",
  },
  {
    index: "03",
    title: "Enchewawe",
    english: "Let's talk",
    detail: "A lively conversation around what shaped yesterday and what comes next.",
    tag: "Conversation",
  },
  {
    index: "04",
    title: "Minat Gujo",
    english: "A journey of imagination",
    detail: "Research-led stories that take a closer look at Ethiopia's hidden rooms.",
    tag: "Documentary",
  },
];

const services = [
  {
    number: "A",
    icon: Mic2,
    title: "Radio + online production",
    copy: "From a clear editorial premise to a broadcast-ready series, we shape stories for ears, screens, and shared time.",
  },
  {
    number: "B",
    icon: Camera,
    title: "Documentary fieldwork",
    copy: "We record living knowledge with curiosity, research, and respect for the people who carry it forward.",
  },
  {
    number: "C",
    icon: CalendarDays,
    title: "Event promotion",
    copy: "We turn a gathering into a considered public moment: concept, story, audience, and the details in between.",
  },
  {
    number: "D",
    icon: Radio,
    title: "Broadcast partnerships",
    copy: "Flexible collaboration for stations, institutions, and teams that want a sharper cultural signal.",
  },
];

const journalNotes = [
  { date: "FIELD NOTE / 07", title: "The knowledge that grows beside the forest", kind: "Conversation" },
  { date: "PROGRAMME / 04", title: "When a place becomes a story you can hear", kind: "Audio essay" },
  { date: "OPEN ROOM / 02", title: "Making space for many ways of knowing", kind: "Event" },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [playing, setPlaying] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [language, setLanguage] = useState<"en" | "am">(() => (localStorage.getItem("kasha-language") as "en" | "am") || "en");
  const copy = uiCopy[language];
  const isAmharic = language === "am";

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem("kasha-language", language);
    document.documentElement.lang = language === "am" ? "am" : "en";
  }, [language]);

  const closeMenu = () => setMenuOpen(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Your note is ready for the Kasha desk.", {
      description: "We’ll be in touch through the contact details you shared.",
    });
    event.currentTarget.reset();
  };

  const handleComingSoon = (label: string) => {
    toast(`${label} is being prepared for the next broadcast.`, {
      description: "The Kasha desk is shaping the full listening experience.",
    });
  };

  return (
    <div className="kasha-page">
      <header className={`site-header ${hasScrolled ? "is-scrolled" : ""}`}>
          <a className="brand" href="#top" aria-label="Kasha Multimedia home" onClick={closeMenu}>
          <img src={asset.mark} alt="" className="brand-mark" />
          <span className="brand-wordmark">
            <strong>Kasha</strong>
            <span>Multimedia</span>
          </span>
        </a>

        <div className="header-tools">
          <button className="header-tool" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
            {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
          </button>
          <button className="header-tool language-tool" type="button" onClick={() => setLanguage((value) => value === "en" ? "am" : "en")} aria-label="Switch language">
            <Globe2 size={15} /><span>{isAmharic ? "EN" : "አማ"}</span>
          </button>
          <a className="header-tool admin-tool" href="/admin"><LogIn size={15} /><span>{copy.admin}</span></a>
        </div>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={`site-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          <a href="#about" onClick={closeMenu}>{copy.about}</a>
          <a href="#programs" onClick={closeMenu}>{copy.programs}</a>
          <a href="#services" onClick={closeMenu}>{copy.services}</a>
          <a href="#journal" onClick={closeMenu}>{copy.journal}</a>
          <a className="nav-contact" href="#contact" onClick={closeMenu}>
            {copy.talk} <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-image" style={{ backgroundImage: `url(${asset.hero})` }} aria-hidden="true" />
          <div className="hero-scrim" aria-hidden="true" />
          <div className="hero-content section-wrap">
            <div className="hero-copy">
              <p className="eyebrow eyebrow-light"><span className="live-dot" /> {copy.heroEyebrow}</p>
              <h1 id="hero-heading">{copy.heroA}<br /><em>{copy.heroB}</em></h1>
              <p className="hero-intro">{copy.heroIntro}</p>
              <div className="hero-actions">
                <a className="button button-signal" href="#programs">{copy.heroCta} <ArrowDownRight size={17} /></a>
                <button className="text-link text-link-light" type="button" onClick={() => scrollToId("about")}>{copy.heroWhy} <ArrowRight size={16} /></button>
              </div>
            </div>
            <div className="hero-aside">
              <div className="hero-aside-top"><Radio size={16} /><span>{copy.weekly}</span></div>
              <strong>{copy.everySunday}<br />{copy.forTwoHours}</strong>
              <span className="hero-aside-note">{copy.heroNote}</span>
              <div className="waveform" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
            </div>
          </div>
          <div className="hero-footer section-wrap">
            <span>01 / 06</span>
            <span>Radio + online media + event promotion</span>
            <a href="#about" aria-label="Scroll to about section"><ChevronDown size={18} /></a>
          </div>
        </section>

        <div className="ticker" aria-label="Kasha focus areas">
          <div className="ticker-inner">
            <span>Broadcast</span><i />
            <span>Documentary</span><i />
            <span>Cultural memory</span><i />
            <span>Open conversation</span><i />
            <span>Events</span><i />
            <span>Broadcast</span><i />
            <span>Documentary</span><i />
          </div>
        </div>

        <section className="about-section section-wrap section-space" id="about" aria-labelledby="about-heading">
          <div className="section-rail"><span>02</span><span>About the signal</span></div>
          <div className="about-grid">
            <div className="about-copy">
              <p className="eyebrow">{copy.aboutEyebrow}</p>
              <h2 id="about-heading">{copy.aboutA} <em>{copy.aboutB}</em></h2>
              <p className="body-large">{copy.aboutBody}</p>
              <blockquote>“{copy.aboutQuote}”</blockquote>
              <button className="text-link" type="button" onClick={() => handleComingSoon("Our story")}>{copy.readStory} <ArrowRight size={16} /></button>
            </div>
            <figure className="editorial-figure">
              <div className="image-frame image-frame-tall"><img src={asset.culture} alt="An artisan arranging woven textiles and field notes" /></div>
              <figcaption><span>Field recording / Addis Ababa</span><span>03° 28&apos; N / 38° 44&apos; E</span></figcaption>
            </figure>
          </div>
        </section>

        <section className="programs-section section-space" id="programs" aria-labelledby="programs-heading">
          <div className="section-wrap">
            <div className="section-rail"><span>03</span><span>Programmes</span></div>
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">{copy.programsEyebrow}</p>
                <h2 id="programs-heading">{copy.programsA}<br /><em>{copy.programsB}</em></h2>
              </div>
              <p className="section-summary">{copy.programsSummary}</p>
            </div>
            <div className="programs-layout">
              <div className="program-list">
                {programs.map((program) => (
                  <button className="program-row" type="button" key={program.index} onClick={() => handleComingSoon(program.title)}>
                    <span className="program-index">{program.index}</span>
                    <span className="program-name"><strong>{program.title}</strong><small>{isAmharic ? ["ተሳተፉ", "የባህል ትዝታ", "እንጨዋወት", "የምናብ ጉዞ"][Number(program.index) - 1] : program.english}</small></span>
                    <span className="program-detail">{program.detail}</span>
                    <span className="program-tag">{program.tag}</span>
                    <ArrowUpRight size={19} className="program-arrow" />
                  </button>
                ))}
              </div>
              <div className="audio-feature">
                <div className="audio-image"><img src={asset.audio} alt="Broadcast console with a red on-air light" /><span className="image-label">Listen / 00:48</span></div>
                <button className={`play-button ${playing ? "is-playing" : ""}`} type="button" aria-label={playing ? "Pause sample" : "Play sample"} onClick={() => { setPlaying((value) => !value); toast(playing ? "Sample paused." : "Playing a short Kasha sample."); }}>
                  {playing ? <span className="pause-bars"><i /><i /></span> : <Play size={20} fill="currentColor" />}
                </button>
                <div className="audio-caption"><span>Latest signal</span><strong>How does a place become a memory?</strong><small>Minat Gujo / Episode 04</small></div>
              </div>
            </div>
          </div>
        </section>

        <section className="services-section section-wrap section-space" id="services" aria-labelledby="services-heading">
          <div className="section-rail"><span>04</span><span>What we make</span></div>
          <div className="section-heading-row services-heading">
            <div><p className="eyebrow">{copy.servicesEyebrow}</p><h2 id="services-heading">{copy.servicesA}<br /><em>{copy.servicesB}</em></h2></div>
            <p className="section-summary">{copy.servicesSummary}</p>
          </div>
          <div className="services-grid">
            {services.map((service) => {
              const Icon = service.icon;
              return <button className="service-card" type="button" key={service.number} onClick={() => handleComingSoon(service.title)}>
                <span className="service-top"><span>{service.number}</span><Icon size={20} /></span>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <span className="service-link">Explore <ArrowUpRight size={16} /></span>
              </button>;
            })}
          </div>
        </section>

        <section className="event-section section-wrap section-space" aria-labelledby="event-heading">
          <div className="event-image"><img src={asset.event} alt="A poet speaking at a warm outdoor cultural gathering" /><span className="image-label image-label-dark">Event promotion / Open room</span></div>
          <div className="event-copy">
            <p className="eyebrow">{copy.eventEyebrow}</p>
            <h2 id="event-heading">{copy.eventA}<br /><em>{copy.eventB}</em></h2>
            <p className="body-large">{copy.eventBody}</p>
            <button className="button button-outline" type="button" onClick={() => scrollToId("contact")}>{copy.eventCta} <ArrowUpRight size={17} /></button>
          </div>
        </section>

        <section className="journal-section section-space" id="journal" aria-labelledby="journal-heading">
          <div className="section-wrap">
            <div className="section-rail"><span>05</span><span>Journal / field notes</span></div>
            <div className="section-heading-row">
              <div><p className="eyebrow">{copy.journalEyebrow}</p><h2 id="journal-heading">{copy.journalA}<br /><em>{copy.journalB}</em></h2></div>
              <button className="text-link" type="button" onClick={() => handleComingSoon("Journal archive")}>{copy.viewNotes} <ArrowRight size={16} /></button>
            </div>
            <div className="journal-list">
              {journalNotes.map((note) => <button type="button" className="journal-row" key={note.date} onClick={() => handleComingSoon(note.title)}><span className="journal-date">{note.date}</span><strong>{note.title}</strong><span className="journal-kind">{note.kind}</span><ArrowUpRight size={18} /></button>)}
            </div>
          </div>
        </section>

        <section className="contact-section section-wrap section-space" id="contact" aria-labelledby="contact-heading">
          <div className="section-rail section-rail-dark"><span>06</span><span>Start a conversation</span></div>
          <div className="contact-grid">
            <div className="contact-copy"><p className="eyebrow eyebrow-light">{copy.contactEyebrow}</p><h2 id="contact-heading">{copy.contactA}<br /><em>{copy.contactB}</em></h2><p>{copy.contactBody}</p><div className="contact-details"><span><Mail size={15} /> hello@kashamultimedia.et</span><span><MapPin size={15} /> Addis Ababa, Ethiopia</span></div></div>
            <form className="contact-form" onSubmit={handleSubmit}><label>{copy.name}<input name="name" required placeholder={copy.placeholderName} /></label><label>{copy.email}<input name="email" type="email" required placeholder={copy.placeholderEmail} /></label><label>{copy.brief}<textarea name="brief" required placeholder={copy.placeholderBrief} rows={3} /></label><button className="button button-signal button-submit" type="submit">{copy.send} <Send size={16} /></button></form>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <div className="footer-brand"><a className="brand" href="#top"><img src={asset.mark} alt="" className="brand-mark" /><span className="brand-wordmark"><strong>Kasha</strong><span>Multimedia</span></span></a><p>Stories with a pulse.<br />Places with a memory.</p></div>
        <div className="footer-links"><div><span className="footer-label">Navigate</span><a href="#about">About</a><a href="#programs">Programs</a><a href="#services">Services</a><a href="#journal">Journal</a></div><div><span className="footer-label">Follow the signal</span><a href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram size={16} /> Instagram</a><a href="https://youtube.com" target="_blank" rel="noreferrer"><Youtube size={16} /> YouTube</a><a href="https://facebook.com" target="_blank" rel="noreferrer"><Facebook size={16} /> Facebook</a></div></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Kasha Multimedia</span><span>Built in Addis Ababa / Made to travel</span></div>
      </footer>
    </div>
  );
}
