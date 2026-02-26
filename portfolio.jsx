import { useState, useEffect, useRef } from "react";

const SECTIONS = ["inicio", "sobre-mi", "experiencia", "servicios", "contacto"];

// Smooth scroll hook
function useScrollSpy() {
  const [active, setActive] = useState("inicio");
  useEffect(() => {
    const handler = () => {
      for (const id of [...SECTIONS].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 300) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return active;
}

// Intersection observer for reveal animations
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function RevealDiv({ children, delay = 0, className = "", style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.7s cubic-bezier(.16,1,.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// Icons as inline SVG components
const Icons = {
  Users: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Megaphone: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 11 18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>
    </svg>
  ),
  Globe: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
    </svg>
  ),
  Video: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 8-6 4 6 4V8z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/>
    </svg>
  ),
  Mail: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  ),
  Linkedin: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  Phone: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  Arrow: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7"/><path d="M7 7h10v10"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  ),
  Sparkle: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z"/>
    </svg>
  ),
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');

  :root {
    --bg: #0C0B0F;
    --bg-elevated: #15141A;
    --bg-card: #1C1B22;
    --surface: #242330;
    --border: #2E2D3A;
    --text: #F0EEF5;
    --text-secondary: #9B97A8;
    --accent: #D4A853;
    --accent-light: #E8C97A;
    --accent-dim: #3D3220;
    --accent-glow: rgba(212, 168, 83, 0.12);
    --warm: #C4956A;
    --serif: 'Playfair Display', Georgia, serif;
    --sans: 'DM Sans', system-ui, sans-serif;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--sans);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  ::selection {
    background: var(--accent);
    color: var(--bg);
  }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 1rem 2rem;
    display: flex; align-items: center; justify-content: space-between;
    backdrop-filter: blur(20px);
    background: rgba(12, 11, 15, 0.8);
    border-bottom: 1px solid transparent;
    transition: border-color 0.3s, background 0.3s;
  }
  .nav.scrolled {
    border-bottom-color: var(--border);
    background: rgba(12, 11, 15, 0.95);
  }
  .nav-logo {
    font-family: var(--serif);
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--accent);
    letter-spacing: -0.02em;
    text-decoration: none;
  }
  .nav-links { display: flex; gap: 2rem; list-style: none; }
  .nav-links a {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 400;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    transition: color 0.3s;
    position: relative;
  }
  .nav-links a:hover, .nav-links a.active {
    color: var(--accent);
  }
  .nav-links a.active::after {
    content: '';
    position: absolute;
    bottom: -4px; left: 0; right: 0;
    height: 1px;
    background: var(--accent);
  }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    position: relative;
    overflow: hidden;
    padding: 6rem 2rem 4rem;
  }
  .hero-bg {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 70% 30%, rgba(212, 168, 83, 0.06) 0%, transparent 70%),
      radial-gradient(ellipse 40% 60% at 20% 80%, rgba(196, 149, 106, 0.04) 0%, transparent 60%);
  }
  .hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(var(--border) 1px, transparent 1px),
      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 80px 80px;
    opacity: 0.15;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent);
  }
  .hero-content {
    position: relative; z-index: 1;
    max-width: 900px;
    text-align: center;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.5rem 1.25rem;
    border: 1px solid var(--border);
    border-radius: 100px;
    font-size: 0.78rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 2.5rem;
    background: var(--accent-glow);
  }
  .hero-title {
    font-family: var(--serif);
    font-size: clamp(2.8rem, 6vw, 5.5rem);
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: -0.03em;
    margin-bottom: 1.5rem;
    color: var(--text);
  }
  .hero-title em {
    font-style: italic;
    color: var(--accent);
    font-weight: 600;
  }
  .hero-subtitle {
    font-size: 1.15rem;
    color: var(--text-secondary);
    line-height: 1.7;
    max-width: 560px;
    margin: 0 auto 3rem;
    font-weight: 300;
  }
  .hero-cta {
    display: inline-flex; align-items: center; gap: 0.75rem;
    padding: 1rem 2.5rem;
    background: var(--accent);
    color: var(--bg);
    border: none; border-radius: 100px;
    font-family: var(--sans);
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    cursor: pointer;
    text-decoration: none;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  .hero-cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(212, 168, 83, 0.25);
  }
  .scroll-indicator {
    position: absolute;
    bottom: 2.5rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
    color: var(--text-secondary);
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    animation: float 2.5s ease-in-out infinite;
  }
  @keyframes float {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(8px); }
  }

  /* SECTIONS */
  .section {
    padding: 7rem 2rem;
    max-width: 1100px;
    margin: 0 auto;
  }
  .section-label {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 1rem;
    font-weight: 500;
  }
  .section-title {
    font-family: var(--serif);
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 600;
    line-height: 1.15;
    letter-spacing: -0.02em;
    margin-bottom: 1.5rem;
  }
  .section-divider {
    width: 60px; height: 1px;
    background: var(--accent);
    margin-bottom: 2.5rem;
  }

  /* ABOUT */
  .about-grid {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 4rem;
    align-items: start;
  }
  .about-photo-wrapper {
    position: relative;
  }
  .about-photo {
    width: 100%; aspect-ratio: 3/4;
    background: var(--bg-card);
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    border: 1px solid var(--border);
  }
  .about-photo-placeholder {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center; flex-direction: column;
    background: linear-gradient(135deg, var(--bg-card), var(--surface));
    gap: 1rem;
  }
  .avatar-circle {
    width: 100px; height: 100px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent-dim), var(--surface));
    border: 2px solid var(--accent);
    display: flex; align-items: center; justify-content: center;
  }
  .avatar-initials {
    font-family: var(--serif);
    font-size: 2rem;
    color: var(--accent);
    font-weight: 600;
  }
  .about-photo-tag {
    position: absolute;
    bottom: -12px; right: -12px;
    background: var(--accent);
    color: var(--bg);
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    box-shadow: 0 8px 24px rgba(212, 168, 83, 0.3);
  }
  .about-text p {
    color: var(--text-secondary);
    line-height: 1.8;
    font-size: 1.02rem;
    margin-bottom: 1.25rem;
    font-weight: 300;
  }
  .about-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-top: 2.5rem;
    padding-top: 2.5rem;
    border-top: 1px solid var(--border);
  }
  .stat-number {
    font-family: var(--serif);
    font-size: 2rem;
    color: var(--accent);
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0.4rem;
  }
  .stat-label {
    font-size: 0.8rem;
    color: var(--text-secondary);
    letter-spacing: 0.04em;
  }

  /* EXPERIENCE */
  .exp-section {
    background: var(--bg-elevated);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 7rem 2rem;
  }
  .exp-inner { max-width: 1100px; margin: 0 auto; }
  .exp-header {
    display: flex; align-items: flex-end; justify-content: space-between;
    margin-bottom: 3.5rem;
    gap: 2rem;
  }
  .exp-company {
    display: inline-flex; align-items: center; gap: 0.75rem;
    padding: 0.75rem 1.5rem;
    background: var(--accent-glow);
    border: 1px solid rgba(212, 168, 83, 0.2);
    border-radius: 100px;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--accent-light);
  }
  .exp-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  .exp-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 2rem;
    transition: transform 0.4s cubic-bezier(.16,1,.3,1), border-color 0.3s, box-shadow 0.3s;
    position: relative;
    overflow: hidden;
  }
  .exp-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .exp-card:hover {
    transform: translateY(-4px);
    border-color: rgba(212, 168, 83, 0.3);
    box-shadow: 0 16px 48px rgba(0,0,0,0.3);
  }
  .exp-card:hover::before { opacity: 1; }
  .exp-card-icon {
    width: 52px; height: 52px;
    border-radius: 14px;
    background: var(--accent-dim);
    display: flex; align-items: center; justify-content: center;
    color: var(--accent);
    margin-bottom: 1.25rem;
  }
  .exp-card-letter {
    font-family: var(--serif);
    font-size: 0.8rem;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
    font-style: italic;
  }
  .exp-card-title {
    font-family: var(--serif);
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    line-height: 1.3;
  }
  .exp-card-desc {
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.7;
    font-weight: 300;
  }

  /* SERVICES */
  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-top: 3rem;
  }
  .service-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 2.5rem 2rem;
    transition: transform 0.4s cubic-bezier(.16,1,.3,1), border-color 0.3s;
    text-align: center;
  }
  .service-card:hover {
    transform: translateY(-4px);
    border-color: rgba(212, 168, 83, 0.25);
  }
  .service-icon {
    width: 56px; height: 56px;
    margin: 0 auto 1.5rem;
    border-radius: 50%;
    background: var(--accent-dim);
    display: flex; align-items: center; justify-content: center;
    color: var(--accent);
  }
  .service-title {
    font-family: var(--serif);
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }
  .service-desc {
    color: var(--text-secondary);
    font-size: 0.88rem;
    line-height: 1.7;
    font-weight: 300;
  }

  /* CONTACT */
  .contact-section {
    background: var(--bg-elevated);
    border-top: 1px solid var(--border);
    padding: 7rem 2rem;
  }
  .contact-inner {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }
  .contact-text {
    color: var(--text-secondary);
    font-size: 1.1rem;
    line-height: 1.7;
    font-weight: 300;
    margin-bottom: 3rem;
    max-width: 500px;
    margin-left: auto; margin-right: auto;
  }
  .contact-links {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .contact-btn {
    display: inline-flex; align-items: center; gap: 0.6rem;
    padding: 0.9rem 2rem;
    border-radius: 100px;
    font-family: var(--sans);
    font-size: 0.9rem;
    font-weight: 500;
    text-decoration: none;
    transition: transform 0.3s, box-shadow 0.3s, background 0.3s;
    cursor: pointer;
    border: none;
  }
  .contact-btn:hover {
    transform: translateY(-2px);
  }
  .contact-btn.primary {
    background: var(--accent);
    color: var(--bg);
  }
  .contact-btn.primary:hover {
    box-shadow: 0 12px 36px rgba(212, 168, 83, 0.25);
  }
  .contact-btn.secondary {
    background: var(--surface);
    color: var(--text);
    border: 1px solid var(--border);
  }
  .contact-btn.secondary:hover {
    border-color: var(--accent);
    background: var(--accent-dim);
  }
  .contact-btn.linkedin {
    background: #0A66C2;
    color: white;
  }
  .contact-btn.linkedin:hover {
    box-shadow: 0 12px 36px rgba(10, 102, 194, 0.3);
  }

  /* FOOTER */
  .footer {
    text-align: center;
    padding: 3rem 2rem;
    border-top: 1px solid var(--border);
    color: var(--text-secondary);
    font-size: 0.8rem;
    letter-spacing: 0.04em;
  }
  .footer span { color: var(--accent); }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .nav-links { display: none; }
    .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
    .about-photo { max-width: 240px; margin: 0 auto; }
    .about-photo-tag { bottom: -8px; right: 10px; }
    .exp-cards { grid-template-columns: 1fr; }
    .services-grid { grid-template-columns: 1fr; }
    .about-stats { grid-template-columns: repeat(3, 1fr); }
    .exp-header { flex-direction: column; align-items: flex-start; }
  }
`;

const experienceData = [
  {
    letter: "a",
    title: "Gestión de Clientes & CRM",
    desc: "Coordinación de reuniones con potenciales clientes para ofrecer servicios de capacitación personalizada. Manejo de plataforma CRM para el seguimiento eficiente de cada interacción, desde el primer contacto hasta el post-venta.",
    icon: "Users",
  },
  {
    letter: "b",
    title: "Campañas de Comunicación & Marketing",
    desc: "Diseño y ejecución de campañas a través de correo electrónico y WhatsApp. Creación de imágenes, videos promocionales y contenido para campañas de publicidad en Meta.",
    icon: "Megaphone",
  },
  {
    letter: "c",
    title: "Producción de Contenido & Web",
    desc: "Edición de videos para cursos online asincrónicos y webinars. Cambios de diseño y funcionalidades en la página web de la empresa, utilizando nuevas herramientas.",
    icon: "Globe",
  },
  {
    letter: "d",
    title: "Representación en Webinars",
    desc: "Representante de Income Factory en instancias educativas: presentación de expertos, apertura de eventos y atención de dudas sobre los servicios ofrecidos.",
    icon: "Video",
  },
];

const servicesData = [
  {
    icon: "Megaphone",
    title: "Estrategia de Marketing Digital",
    desc: "Planificación y ejecución de campañas en redes sociales, email marketing y publicidad digital para maximizar tu alcance.",
  },
  {
    icon: "Users",
    title: "Gestión Comercial & CRM",
    desc: "Implementación de procesos comerciales y plataformas CRM para optimizar la relación con tus clientes.",
  },
  {
    icon: "Globe",
    title: "Producción de Contenido",
    desc: "Creación de contenido visual, audiovisual y escrito alineado con la identidad de tu marca y objetivos comerciales.",
  },
];

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const active = useScrollSpy();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <a href="#inicio" className="nav-logo" onClick={(e) => { e.preventDefault(); scrollTo("inicio"); }}>
          MK.
        </a>
        <ul className="nav-links">
          {[
            ["inicio", "Inicio"],
            ["sobre-mi", "Sobre mí"],
            ["experiencia", "Experiencia"],
            ["servicios", "Servicios"],
            ["contacto", "Contacto"],
          ].map(([id, label]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={active === id ? "active" : ""}
                onClick={(e) => { e.preventDefault(); scrollTo(id); }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero" id="inicio">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-content">
          <RevealDiv delay={0.1}>
            <div className="hero-badge">
              <Icons.Sparkle /> Income Factory
            </div>
          </RevealDiv>
          <RevealDiv delay={0.25}>
            <h1 className="hero-title">
              Marketing &<br />
              Dirección <em>Comercial</em>
            </h1>
          </RevealDiv>
          <RevealDiv delay={0.4}>
            <p className="hero-subtitle">
              Licenciada en Marketing y Dirección Comercial con experiencia en gestión
              de clientes, campañas digitales, producción de contenido y desarrollo comercial.
            </p>
          </RevealDiv>
          <RevealDiv delay={0.55}>
            <a href="#contacto" className="hero-cta" onClick={(e) => { e.preventDefault(); scrollTo("contacto"); }}>
              Trabajemos juntos <Icons.Arrow />
            </a>
          </RevealDiv>
        </div>
        <div className="scroll-indicator">
          scroll
          <Icons.ChevronDown />
        </div>
      </section>

      {/* ABOUT */}
      <section className="section" id="sobre-mi">
        <div className="about-grid">
          <RevealDiv delay={0.1}>
            <div className="about-photo-wrapper">
              <div className="about-photo">
                <div className="about-photo-placeholder">
                  <div className="avatar-circle">
                    <span className="avatar-initials">MK</span>
                  </div>
                  <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem", letterSpacing: "0.06em" }}>
                    TU FOTO AQUÍ
                  </span>
                </div>
              </div>
              <div className="about-photo-tag">Income Factory</div>
            </div>
          </RevealDiv>
          <div>
            <RevealDiv delay={0.15}>
              <div className="section-label">
                <Icons.Sparkle /> Sobre mí
              </div>
              <h2 className="section-title">
                Transformando ideas en<br />
                <span style={{ color: "var(--accent)" }}>resultados comerciales</span>
              </h2>
              <div className="section-divider" />
            </RevealDiv>
            <RevealDiv delay={0.3}>
              <div className="about-text">
                <p>
                  Soy Licenciada en Marketing y Dirección Comercial, actualmente parte del equipo
                  de <strong style={{ color: "var(--text)", fontWeight: 500 }}>Income Factory</strong>, donde
                  desempeño múltiples roles que abarcan desde la gestión de clientes y CRM hasta la
                  producción de contenido y representación en webinars.
                </p>
                <p>
                  Mi experiencia combina habilidades en marketing digital, comunicación estratégica y
                  dirección comercial, con un enfoque en generar resultados medibles y relaciones
                  duraderas con los clientes.
                </p>
              </div>
            </RevealDiv>
            <RevealDiv delay={0.45}>
              <div className="about-stats">
                <div>
                  <div className="stat-number">4+</div>
                  <div className="stat-label">Áreas de expertise</div>
                </div>
                <div>
                  <div className="stat-number">CRM</div>
                  <div className="stat-label">Gestión integral</div>
                </div>
                <div>
                  <div className="stat-number">360°</div>
                  <div className="stat-label">Marketing digital</div>
                </div>
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="exp-section" id="experiencia">
        <div className="exp-inner">
          <RevealDiv>
            <div className="exp-header">
              <div>
                <div className="section-label">
                  <Icons.Sparkle /> Experiencia actual
                </div>
                <h2 className="section-title">Lo que hago en<br /><span style={{ color: "var(--accent)" }}>Income Factory</span></h2>
                <div className="section-divider" />
              </div>
              <div className="exp-company">
                <Icons.Sparkle /> Income Factory — Actualidad
              </div>
            </div>
          </RevealDiv>
          <div className="exp-cards">
            {experienceData.map((item, i) => {
              const Icon = Icons[item.icon];
              return (
                <RevealDiv key={item.letter} delay={0.1 + i * 0.12}>
                  <div className="exp-card">
                    <div className="exp-card-icon"><Icon /></div>
                    <div className="exp-card-letter">{item.letter}.</div>
                    <h3 className="exp-card-title">{item.title}</h3>
                    <p className="exp-card-desc">{item.desc}</p>
                  </div>
                </RevealDiv>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section" id="servicios">
        <RevealDiv>
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <div className="section-label" style={{ justifyContent: "center" }}>
              <Icons.Sparkle /> Servicios
            </div>
            <h2 className="section-title">¿Cómo puedo <span style={{ color: "var(--accent)" }}>ayudarte</span>?</h2>
            <div className="section-divider" style={{ margin: "0 auto 1rem" }} />
            <p style={{ color: "var(--text-secondary)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7, fontWeight: 300 }}>
              Ofrezco servicios profesionales en marketing y gestión comercial,
              adaptados a las necesidades de tu negocio.
            </p>
          </div>
        </RevealDiv>
        <div className="services-grid">
          {servicesData.map((s, i) => {
            const Icon = Icons[s.icon];
            return (
              <RevealDiv key={i} delay={0.1 + i * 0.12}>
                <div className="service-card">
                  <div className="service-icon"><Icon /></div>
                  <h3 className="service-title">{s.title}</h3>
                  <p className="service-desc">{s.desc}</p>
                </div>
              </RevealDiv>
            );
          })}
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contacto">
        <div className="contact-inner">
          <RevealDiv>
            <div className="section-label" style={{ justifyContent: "center" }}>
              <Icons.Sparkle /> Contacto
            </div>
            <h2 className="section-title">
              Hablemos de tu<br />
              próximo <span style={{ color: "var(--accent)" }}>proyecto</span>
            </h2>
            <div className="section-divider" style={{ margin: "0 auto 1.5rem" }} />
            <p className="contact-text">
              ¿Tenés una idea o proyecto en mente? Me encantaría escucharte
              y explorar cómo puedo ayudarte a alcanzar tus objetivos.
            </p>
          </RevealDiv>
          <RevealDiv delay={0.2}>
            <div className="contact-links">
              <a href="mailto:tu-email@ejemplo.com" className="contact-btn primary">
                <Icons.Mail /> Escribime
              </a>
              <a href="https://linkedin.com/in/tu-perfil" target="_blank" rel="noreferrer" className="contact-btn linkedin">
                <Icons.Linkedin /> LinkedIn
              </a>
              <a href="tel:+598XXXXXXXX" className="contact-btn secondary">
                <Icons.Phone /> Llamame
              </a>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © {new Date().getFullYear()} — Diseñado con <span>♦</span> Lic. en Marketing y Dirección Comercial
      </footer>
    </>
  );
}
