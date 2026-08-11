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
  Instagram,
  Mail,
  MapPin,
  Menu,
  Mic2,
  Play,
  Radio,
  Send,
  X,
  Youtube,
} from "lucide-react";
import { toast } from "sonner";

const asset = {
  hero: "/manus-storage/kasha-hero_1ba6a444.jpg",
  culture: "/manus-storage/kasha-culture_d54ac47e.jpg",
  audio: "/manus-storage/kasha-audio_bdbb9064.jpg",
  event: "/manus-storage/kasha-event_aa68d261.jpg",
  mark: "/manus-storage/kasha-signal-mark_87b5eda2.png",
};

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

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#programs" onClick={closeMenu}>Programs</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#journal" onClick={closeMenu}>Journal</a>
          <a className="nav-contact" href="#contact" onClick={closeMenu}>
            Let&apos;s talk <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-image" style={{ backgroundImage: `url(${asset.hero})` }} aria-hidden="true" />
          <div className="hero-scrim" aria-hidden="true" />
          <div className="hero-content section-wrap">
            <div className="hero-copy">
              <p className="eyebrow eyebrow-light"><span className="live-dot" /> On air / Addis Ababa</p>
              <h1 id="hero-heading">Stories with a pulse.<br /><em>Places with a memory.</em></h1>
              <p className="hero-intro">Kasha Multimedia connects radio, documentary, culture, and events to make room for the voices that move Ethiopia forward.</p>
              <div className="hero-actions">
                <a className="button button-signal" href="#programs">Find your frequency <ArrowDownRight size={17} /></a>
                <button className="text-link text-link-light" type="button" onClick={() => scrollToId("about")}>Why Kasha <ArrowRight size={16} /></button>
              </div>
            </div>
            <div className="hero-aside">
              <div className="hero-aside-top"><Radio size={16} /><span>Weekly radio programme</span></div>
              <strong>Every Sunday<br />for two hours.</strong>
              <span className="hero-aside-note">A live conversation with the country&apos;s stories, ideas, and inherited ways of knowing.</span>
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
              <p className="eyebrow">A programme, a platform, a point of view</p>
              <h2 id="about-heading">We go closer to the country&apos;s <em>living archive.</em></h2>
              <p className="body-large">Kasha began as a weekly radio programme built to inform, teach, compare, and delight. Today, it is a multimedia practice for the stories that deserve a wider room: indigenous knowledge, cultural value, natural memory, and the people carrying all of it into tomorrow.</p>
              <blockquote>“To understand where we are going, we listen for what the land and its people already know.”</blockquote>
              <button className="text-link" type="button" onClick={() => handleComingSoon("Our story")}>Read the full story <ArrowRight size={16} /></button>
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
                <p className="eyebrow">A frequency for every kind of curiosity</p>
                <h2 id="programs-heading">One signal.<br /><em>Many ways in.</em></h2>
              </div>
              <p className="section-summary">Ten programme ideas. One shared intention: entertain while making space for deeper thought, better questions, and the stories that rarely get the first microphone.</p>
            </div>
            <div className="programs-layout">
              <div className="program-list">
                {programs.map((program) => (
                  <button className="program-row" type="button" key={program.index} onClick={() => handleComingSoon(program.title)}>
                    <span className="program-index">{program.index}</span>
                    <span className="program-name"><strong>{program.title}</strong><small>{program.english}</small></span>
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
            <div><p className="eyebrow">From the first note to the full room</p><h2 id="services-heading">Built for stories<br /><em>that travel.</em></h2></div>
            <p className="section-summary">Kasha brings an editorial eye and a production hand to every format. The medium changes; the care does not.</p>
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
            <p className="eyebrow">A room for the next story</p>
            <h2 id="event-heading">Make the moment<br /><em>worth remembering.</em></h2>
            <p className="body-large">From a cultural gathering to a public conversation, we help events find their voice before the doors open and keep it moving after the lights go down.</p>
            <button className="button button-outline" type="button" onClick={() => scrollToId("contact")}>Talk event production <ArrowUpRight size={17} /></button>
          </div>
        </section>

        <section className="journal-section section-space" id="journal" aria-labelledby="journal-heading">
          <div className="section-wrap">
            <div className="section-rail"><span>05</span><span>Journal / field notes</span></div>
            <div className="section-heading-row">
              <div><p className="eyebrow">Notes from the desk</p><h2 id="journal-heading">Keep the signal<br /><em>in the room.</em></h2></div>
              <button className="text-link" type="button" onClick={() => handleComingSoon("Journal archive")}>View all notes <ArrowRight size={16} /></button>
            </div>
            <div className="journal-list">
              {journalNotes.map((note) => <button type="button" className="journal-row" key={note.date} onClick={() => handleComingSoon(note.title)}><span className="journal-date">{note.date}</span><strong>{note.title}</strong><span className="journal-kind">{note.kind}</span><ArrowUpRight size={18} /></button>)}
            </div>
          </div>
        </section>

        <section className="contact-section section-wrap section-space" id="contact" aria-labelledby="contact-heading">
          <div className="section-rail section-rail-dark"><span>06</span><span>Start a conversation</span></div>
          <div className="contact-grid">
            <div className="contact-copy"><p className="eyebrow eyebrow-light">Bring us the story</p><h2 id="contact-heading">What should<br /><em>we listen to?</em></h2><p>Tell us what is on your mind, what you are building, or whose voice needs a better signal. We will take it from there.</p><div className="contact-details"><span><Mail size={15} /> hello@kashamultimedia.et</span><span><MapPin size={15} /> Addis Ababa, Ethiopia</span></div></div>
            <form className="contact-form" onSubmit={handleSubmit}><label>Name<input name="name" required placeholder="Your name" /></label><label>Email<input name="email" type="email" required placeholder="you@example.com" /></label><label>What are you making?<textarea name="brief" required placeholder="A programme, an event, a field note..." rows={3} /></label><button className="button button-signal button-submit" type="submit">Send the note <Send size={16} /></button></form>
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
