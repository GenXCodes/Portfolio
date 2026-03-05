import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Experience", "Projects", "Skills", "Testimonials", "Contact"];

const PROJECTS = [
  {
    title: "CloudSync Dashboard",
    desc: "Real-time analytics platform with WebSocket integration, D3.js charts, and role-based access control.",
    tags: ["React", "Node.js", "WebSocket", "D3.js"],
    color: "#00f5d4",
    icon: "◈",
    link: "#",
  },
  {
    title: "E-Commerce API",
    desc: "Scalable REST API with JWT auth, Stripe integration, Redis caching, and full test coverage.",
    tags: ["Express", "PostgreSQL", "Redis", "Stripe"],
    color: "#f72585",
    icon: "◇",
    link: "#",
  },
  {
    title: "AI Content Studio",
    desc: "GPT-powered content generation tool with custom prompting engine and versioned output history.",
    tags: ["Next.js", "OpenAI", "Prisma", "Tailwind"],
    color: "#7209b7",
    icon: "◉",
    link: "#",
  },
  {
    title: "DevOps Pipeline CLI",
    desc: "Command-line tool that automates CI/CD workflows, Docker builds, and Kubernetes deployments.",
    tags: ["Python", "Docker", "K8s", "GitHub Actions"],
    color: "#4cc9f0",
    icon: "◈",
    link: "#",
  },
];

const SKILLS = [
  { name: "React / Next.js", level: 95, cat: "Frontend" },
  { name: "TypeScript", level: 90, cat: "Frontend" },
  { name: "CSS / Tailwind", level: 88, cat: "Frontend" },
  { name: "Node.js / Express", level: 85, cat: "Backend" },
  { name: "PostgreSQL", level: 80, cat: "Backend" },
  { name: "Docker / K8s", level: 75, cat: "DevOps" },
  { name: "AWS / GCP", level: 72, cat: "DevOps" },
  { name: "GraphQL", level: 78, cat: "Backend" },
];

const EXPERIENCES = [
  {
    role: "Senior Frontend Engineer",
    company: "Pixel Labs",
    period: "2022 – Present",
    desc: "Led migration of legacy jQuery app to React 18, reducing bundle size by 42%. Mentored 3 junior devs.",
    color: "#00f5d4",
  },
  {
    role: "Full Stack Developer",
    company: "ByteForge Inc.",
    period: "2020 – 2022",
    desc: "Built microservices architecture serving 500k+ users. Improved API response time by 60%.",
    color: "#f72585",
  },
  {
    role: "Boot Camp Graduate",
    company: "Village 88",
    period: "2022 – ",
    desc: "Developed client-facing dashboards and integrated third-party APIs for fintech startup.",
    color: "#4cc9f0",
  },
];

const TESTIMONIALS = [
  {
    name: "Maria Santos",
    role: "CTO, Pixel Labs",
    text: "One of the sharpest developers I've worked with. Delivers clean, scalable code and always goes beyond what's asked.",
    avatar: "MS",
    color: "#00f5d4",
  },
  {
    name: "Jake Reyes",
    role: "Product Manager, ByteForge",
    text: "Incredible attention to detail and a natural problem-solver. Our team's velocity doubled after they joined.",
    avatar: "JR",
    color: "#f72585",
  },
  {
    name: "Sofia Cruz",
    role: "Lead Designer, Startup Hive",
    text: "Rare talent who bridges design and engineering beautifully. Turns Figma files into pixel-perfect reality.",
    avatar: "SC",
    color: "#7209b7",
  },
];

// Animated background blobs
function AuroraBackground() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 0, overflow: "hidden",
      background: "radial-gradient(ellipse at 20% 50%, #0d0221 0%, #040b14 60%, #000510 100%)",
    }}>
      <div style={{
        position: "absolute", width: 700, height: 700,
        borderRadius: "50%", top: "-200px", left: "-200px",
        background: "radial-gradient(circle, rgba(0,245,212,0.12) 0%, transparent 70%)",
        animation: "blob1 12s ease-in-out infinite",
        filter: "blur(40px)",
      }} />
      <div style={{
        position: "absolute", width: 600, height: 600,
        borderRadius: "50%", bottom: "0px", right: "-100px",
        background: "radial-gradient(circle, rgba(247,37,133,0.1) 0%, transparent 70%)",
        animation: "blob2 15s ease-in-out infinite",
        filter: "blur(40px)",
      }} />
      <div style={{
        position: "absolute", width: 500, height: 500,
        borderRadius: "50%", top: "40%", left: "40%",
        background: "radial-gradient(circle, rgba(114,9,183,0.1) 0%, transparent 70%)",
        animation: "blob3 18s ease-in-out infinite",
        filter: "blur(40px)",
      }} />
      <div style={{
        position: "absolute", width: 400, height: 400,
        borderRadius: "50%", top: "60%", left: "10%",
        background: "radial-gradient(circle, rgba(76,201,240,0.08) 0%, transparent 70%)",
        animation: "blob4 20s ease-in-out infinite",
        filter: "blur(40px)",
      }} />
      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(rgba(0,245,212,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,245,212,0.03) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />
    </div>
  );
}

function GlassCard({ children, style = {}, hover = true }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => hover && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${isHovered ? "rgba(0,245,212,0.3)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 20,
        transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,245,212,0.08)"
          : "0 8px 32px rgba(0,0,0,0.3)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Navbar({ active, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const navStyle = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
    padding: isMobile ? "16px 20px" : "16px 40px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    background: scrolled ? "rgba(4,11,20,0.85)" : "transparent",
    backdropFilter: scrolled ? "blur(20px)" : "none",
    borderBottom: scrolled ? "1px solid rgba(0,245,212,0.08)" : "none",
    transition: "all 0.4s ease",
  };

  const logoStyle = {
    fontFamily: "'Space Mono', monospace",
    fontSize: isMobile ? 16 : 20,
    fontWeight: 700,
    color: "#00f5d4",
    letterSpacing: 2,
  };

  const buttonStyle = (isActive) => ({
    background: isActive ? "rgba(0,245,212,0.12)" : "transparent",
    border: isActive ? "1px solid rgba(0,245,212,0.3)" : "1px solid transparent",
    borderRadius: 8,
    color: isActive ? "#00f5d4" : "rgba(255,255,255,0.55)",
    padding: isMobile ? "6px 10px" : "6px 16px",
    cursor: "pointer",
    fontSize: isMobile ? 11 : 13,
    fontFamily: "'Space Mono', monospace",
    letterSpacing: 1,
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
  });

  const hamburgerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 8,
  };

  const hamburgerLineStyle = {
    width: 20,
    height: 2,
    background: menuOpen ? "#00f5d4" : "rgba(255,255,255,0.7)",
    borderRadius: 2,
    transition: "all 0.3s ease",
  };

  return (
    <>
      <nav style={navStyle}>
        <span style={logoStyle}>
          &lt;dev/&gt;
        </span>

        {isMobile ? (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={hamburgerStyle}
            aria-label="Toggle menu"
          >
            <div style={{ ...hamburgerLineStyle, transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
            <div style={{ ...hamburgerLineStyle, opacity: menuOpen ? 0 : 1 }} />
            <div style={{ ...hamburgerLineStyle, transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
          </button>
        ) : (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            {NAV_LINKS.map(link => (
              <button
                key={link}
                onClick={() => onNav(link.toLowerCase())}
                style={buttonStyle(active === link.toLowerCase())}
              >
                {link}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Mobile menu overlay */}
      {isMobile && menuOpen && (
        <div style={{
          position: "fixed",
          top: 60,
          left: 0,
          right: 0,
          zIndex: 999,
          background: "rgba(4,11,20,0.95)",
          backdropFilter: "blur(30px)",
          borderBottom: "1px solid rgba(0,245,212,0.15)",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          animation: "fadeUp 0.3s ease",
        }}>
          {NAV_LINKS.map(link => (
            <button
              key={link}
              onClick={() => {
                onNav(link.toLowerCase());
                setMenuOpen(false);
              }}
              style={{
                ...buttonStyle(active === link.toLowerCase()),
                width: "100%",
                padding: "14px 20px",
                fontSize: 14,
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {link}
              {active === link.toLowerCase() && (
                <span style={{ color: "#00f5d4", fontSize: 12 }}>→</span>
              )}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

function HeroSection() {
  const [typed, setTyped] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const phrases = ["Web Developer.", "React Specialist.", "API Architect.", "UI Craftsman."];
  const phraseIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    const tick = () => {
      const current = phrases[phraseIdx.current];
      if (!deleting.current) {
        setTyped(current.slice(0, charIdx.current + 1));
        charIdx.current++;
        if (charIdx.current === current.length) {
          deleting.current = true;
          setTimeout(tick, 1800);
          return;
        }
      } else {
        setTyped(current.slice(0, charIdx.current - 1));
        charIdx.current--;
        if (charIdx.current === 0) {
          deleting.current = false;
          phraseIdx.current = (phraseIdx.current + 1) % phrases.length;
        }
      }
      setTimeout(tick, deleting.current ? 60 : 90);
    };
    const t = setTimeout(tick, 400);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Cursor blink interval
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);

    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", checkMobile);
      clearInterval(cursorInterval);
    };
  }, []);

  const sectionStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: isMobile ? "100px 20px 60px" : "120px 40px 80px",
    flexDirection: "column",
    textAlign: "center",
    position: "relative",
  };

  const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(0,245,212,0.08)",
    border: "1px solid rgba(0,245,212,0.2)",
    borderRadius: 100,
    padding: isMobile ? "6px 16px" : "8px 20px",
    marginBottom: isMobile ? 24 : 32,
    fontSize: isMobile ? 10 : 12,
    color: "#00f5d4",
    fontFamily: "'Space Mono', monospace",
    letterSpacing: 2,
    animation: "fadeUp 0.8s ease both",
  };

  const nameStyle = {
    display: "block",
    fontFamily: "'Syne', sans-serif",
    fontSize: isMobile ? "clamp(32px, 10vw, 88px)" : "clamp(42px, 8vw, 88px)",
    fontWeight: 800,
    color: "#fff",
    letterSpacing: isMobile ? -1 : -2,
  };

  const titleStyle = {
    display: "block",
    fontFamily: "'Space Mono', monospace",
    fontSize: isMobile ? "clamp(18px, 5vw, 40px)" : "clamp(20px, 4vw, 40px)",
    fontWeight: 400,
    background: "linear-gradient(90deg, #00f5d4, #4cc9f0, #f72585)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    minHeight: "1.4em",
    letterSpacing: isMobile ? -0.5 : -1,
  };

  const descriptionStyle = {
    maxWidth: isMobile ? "90%" : 560,
    marginTop: isMobile ? 16 : 24,
    marginBottom: 0,
    color: "rgba(255,255,255,0.5)",
    fontSize: isMobile ? 15 : 17,
    lineHeight: 1.75,
    fontFamily: "'DM Sans', sans-serif",
    animation: "fadeUp 0.8s ease 0.2s both",
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: isMobile ? 12 : 16,
    marginTop: isMobile ? 32 : 40,
    animation: "fadeUp 0.8s ease 0.3s both",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  const primaryButtonStyle = {
    background: "linear-gradient(135deg, #00f5d4, #4cc9f0)",
    border: "none",
    borderRadius: 12,
    padding: isMobile ? "12px 24px" : "14px 32px",
    color: "#040b14",
    fontWeight: 700,
    fontSize: isMobile ? 14 : 15,
    cursor: "pointer",
    fontFamily: "'Space Mono', monospace",
    letterSpacing: 1,
    transition: "all 0.2s ease",
    boxShadow: "0 0 30px rgba(0,245,212,0.3)",
  };

  const secondaryButtonStyle = {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 12,
    padding: isMobile ? "12px 24px" : "14px 32px",
    color: "rgba(255,255,255,0.8)",
    fontWeight: 500,
    fontSize: isMobile ? 14 : 15,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.2s ease",
  };

  const scrollIndicatorStyle = {
    position: "absolute",
    bottom: isMobile ? 20 : 40,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    animation: "fadeIn 1.5s ease 1s both",
  };

  return (
    <section id="about" style={sectionStyle}>
      {/* Floating badge */}
      <div style={badgeStyle}>
        <span style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#00f5d4",
          display: "inline-block",
          animation: "pulse 2s infinite"
        }} />
        AVAILABLE FOR HIRE
      </div>

      <h1 style={{
        margin: 0,
        lineHeight: 1.1,
        animation: "fadeUp 0.8s ease 0.1s both",
      }}>
        <span style={nameStyle}>
          Reckie Degollacion
        </span>
        <span style={titleStyle}>
          {typed}<span style={{
            opacity: cursorVisible ? 1 : 0,
            color: "#00f5d4",
            WebkitTextFillColor: "#00f5d4"
          }}>|</span>
        </span>
      </h1>

      <p style={descriptionStyle}>
        I build fast, scalable, and beautiful web applications. Passionate about clean architecture, great UX, and shipping products that matter.
      </p>

      <div style={buttonContainerStyle}>
        <button
          onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          style={primaryButtonStyle}
        >
          View Projects →
        </button>
        <button
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          style={secondaryButtonStyle}
        >
          Contact Me
        </button>
      </div>

      {/* Scroll indicator */}
      <div style={scrollIndicatorStyle}>
        <span style={{
          color: "rgba(255,255,255,0.25)",
          fontSize: isMobile ? 10 : 11,
          fontFamily: "'Space Mono', monospace",
          letterSpacing: 2
        }}>SCROLL</span>
        <div style={{
          width: 1,
          height: isMobile ? 40 : 50,
          background: "linear-gradient(180deg, rgba(0,245,212,0.6), transparent)",
          animation: "scrollLine 2s ease-in-out infinite",
        }} />
      </div>
    </section>
  );
}

function ExperienceSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const sectionStyle = {
    padding: isMobile ? "60px 20px" : "80px 40px",
    maxWidth: 900,
    margin: "0 auto"
  };

  const timelineContainerStyle = {
    position: "relative",
    paddingLeft: isMobile ? 20 : 40
  };

  const timelineLineStyle = {
    position: "absolute",
    left: 0,
    top: 8,
    bottom: 0,
    width: 1,
    background: "linear-gradient(180deg, #00f5d4, rgba(0,245,212,0.1))",
  };

  const experienceItemStyle = {
    position: "relative",
    marginBottom: isMobile ? 32 : 40
  };

  const dotStyle = (color) => ({
    position: "absolute",
    left: isMobile ? -33 : -47,
    top: isMobile ? 16 : 20,
    width: isMobile ? 10 : 14,
    height: isMobile ? 10 : 14,
    borderRadius: "50%",
    background: color,
    border: `3px solid #040b14`,
    boxShadow: `0 0 12px ${color}`,
    zIndex: 2,
  });

  const cardStyle = {
    padding: isMobile ? "20px 24px" : "28px 32px"
  };

  const roleStyle = {
    fontFamily: "'Syne', sans-serif",
    fontSize: isMobile ? 18 : 20,
    fontWeight: 700,
    color: "#fff"
  };

  const companyStyle = (color) => ({
    color: color,
    fontSize: isMobile ? 13 : 14,
    fontFamily: "'Space Mono', monospace",
    marginTop: 2
  });

  const periodStyle = {
    background: "rgba(255,255,255,0.06)",
    borderRadius: 8,
    padding: isMobile ? "3px 10px" : "4px 12px",
    color: "rgba(255,255,255,0.4)",
    fontSize: isMobile ? 11 : 12,
    fontFamily: "'Space Mono', monospace",
    whiteSpace: "nowrap",
  };

  const descStyle = {
    margin: 0,
    color: "rgba(255,255,255,0.55)",
    fontSize: isMobile ? 14 : 15,
    lineHeight: 1.65,
    fontFamily: "'DM Sans', sans-serif"
  };

  return (
    <section id="experience" style={sectionStyle}>
      <SectionHeader label="CAREER" title="Experience" />
      <div style={timelineContainerStyle}>
        {/* Timeline line */}
        <div style={timelineLineStyle} />
        {EXPERIENCES.map((exp, i) => (
          <div key={i} style={experienceItemStyle}>
            {/* Dot */}
            <div style={dotStyle(exp.color)} />
            <GlassCard style={cardStyle}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: isMobile ? 6 : 8,
                marginBottom: isMobile ? 8 : 10
              }}>
                <div>
                  <div style={roleStyle}>{exp.role}</div>
                  <div style={companyStyle(exp.color)}>{exp.company}</div>
                </div>
                <div style={periodStyle}>
                  {exp.period}
                </div>
              </div>
              <p style={descStyle}>{exp.desc}</p>
            </GlassCard>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const sectionStyle = {
    padding: isMobile ? "60px 20px" : "80px 40px",
    maxWidth: 1100,
    margin: "0 auto"
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))",
    gap: isMobile ? 20 : 24
  };

  const cardStyle = {
    padding: isMobile ? "24px" : "28px",
    overflow: "hidden",
    position: "relative"
  };

  const glowStyle = (color) => ({
    position: "absolute",
    top: isMobile ? -20 : -40,
    right: isMobile ? -20 : -40,
    width: isMobile ? 80 : 120,
    height: isMobile ? 80 : 120,
    borderRadius: "50%",
    background: `radial-gradient(circle, ${color}22, transparent 70%)`,
    pointerEvents: "none",
  });

  const iconStyle = (color) => ({
    fontSize: isMobile ? 24 : 32,
    marginBottom: isMobile ? 12 : 16,
    color: color,
    fontFamily: "'Space Mono', monospace",
  });

  const titleStyle = {
    margin: "0 0 8px",
    fontFamily: "'Syne', sans-serif",
    fontSize: isMobile ? 18 : 20,
    fontWeight: 700,
    color: "#fff"
  };

  const descStyle = {
    margin: "0 0 16px",
    color: "rgba(255,255,255,0.5)",
    fontSize: isMobile ? 13 : 14,
    lineHeight: 1.65,
    fontFamily: "'DM Sans', sans-serif"
  };

  const tagsContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: isMobile ? 6 : 8,
    marginBottom: isMobile ? 20 : 24
  };

  const tagStyle = (color) => ({
    background: `${color}14`,
    border: `1px solid ${color}33`,
    color: color,
    borderRadius: 6,
    padding: isMobile ? "2px 8px" : "3px 10px",
    fontSize: isMobile ? 10 : 11,
    fontFamily: "'Space Mono', monospace",
  });

  const linkStyle = (color) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    color: color,
    fontSize: isMobile ? 12 : 13,
    fontFamily: "'Space Mono', monospace",
    textDecoration: "none",
    letterSpacing: 1,
  });

  return (
    <section id="projects" style={sectionStyle}>
      <SectionHeader label="WORK" title="Projects" />
      <div style={gridStyle}>
        {PROJECTS.map((proj, i) => (
          <GlassCard key={i} style={cardStyle}>
            {/* Glow accent */}
            <div style={glowStyle(proj.color)} />
            <div style={iconStyle(proj.color)}>{proj.icon}</div>
            <h3 style={titleStyle}>{proj.title}</h3>
            <p style={descStyle}>{proj.desc}</p>
            <div style={tagsContainerStyle}>
              {proj.tags.map(tag => (
                <span key={tag} style={tagStyle(proj.color)}>{tag}</span>
              ))}
            </div>
            <a href={proj.link} style={linkStyle(proj.color)}>
              View Project →
            </a>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

function SkillsSection() {
  const [isMobile, setIsMobile] = useState(false);
  const categories = [...new Set(SKILLS.map(s => s.cat))];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const sectionStyle = {
    padding: isMobile ? "60px 20px" : "80px 40px",
    maxWidth: 900,
    margin: "0 auto"
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(260px, 1fr))",
    gap: isMobile ? 20 : 24
  };

  const cardStyle = {
    padding: isMobile ? "24px" : "28px"
  };

  const categoryStyle = {
    fontFamily: "'Space Mono', monospace",
    fontSize: isMobile ? 10 : 11,
    letterSpacing: 2,
    color: "#00f5d4",
    marginBottom: isMobile ? 16 : 20,
    opacity: 0.8,
  };

  const skillItemStyle = {
    marginBottom: isMobile ? 16 : 18
  };

  const skillHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: isMobile ? 4 : 6
  };

  const skillNameStyle = {
    color: "rgba(255,255,255,0.8)",
    fontSize: isMobile ? 13 : 14,
    fontFamily: "'DM Sans', sans-serif"
  };

  const skillLevelStyle = {
    color: "rgba(255,255,255,0.35)",
    fontSize: isMobile ? 11 : 12,
    fontFamily: "'Space Mono', monospace"
  };

  const progressBarStyle = {
    height: 4,
    background: "rgba(255,255,255,0.06)",
    borderRadius: 4,
    overflow: "hidden"
  };

  const progressFillStyle = (level) => ({
    height: "100%",
    borderRadius: 4,
    background: "linear-gradient(90deg, #00f5d4, #4cc9f0)",
    width: `${level}%`,
    transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
    boxShadow: "0 0 8px rgba(0,245,212,0.5)",
  });

  return (
    <section id="skills" style={sectionStyle}>
      <SectionHeader label="ARSENAL" title="Skills" />
      <div style={gridStyle}>
        {categories.map(cat => (
          <GlassCard key={cat} style={cardStyle}>
            <div style={categoryStyle}>{cat.toUpperCase()}</div>
            {SKILLS.filter(s => s.cat === cat).map((skill, i) => (
              <div key={i} style={skillItemStyle}>
                <div style={skillHeaderStyle}>
                  <span style={skillNameStyle}>{skill.name}</span>
                  <span style={skillLevelStyle}>{skill.level}%</span>
                </div>
                <div style={progressBarStyle}>
                  <div style={progressFillStyle(skill.level)} />
                </div>
              </div>
            ))}
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ERROR, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: '', text: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        // We'll use the API service - for now using a fallback to static data
        // In a real implementation, we would import and use the API service
        const response = await fetch('http://localhost:3000/api/testimonials');
        if (!response.ok) throw new Error('Failed to fetch testimonials');
        const data = await response.json();

        if (data.success && data.data) {
          setTestimonials(data.data);
        } else {
          // Fallback to static testimonials if API fails
          setTestimonials(TESTIMONIALS);
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError(err.message);
        // Fallback to static testimonials
        setTestimonials(TESTIMONIALS);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.text.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('http://localhost:3000/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit testimonial');

      const result = await response.json();

      if (result.success) {
        // Add new testimonial to the list
        setTestimonials(prev => [result.data, ...prev]);
        setFormData({ name: '', role: '', text: '' });
        setShowForm(false);
        setSubmitSuccess(true);

        // Reset success message after 3 seconds
        setTimeout(() => setSubmitSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Error submitting testimonial:', err);
      alert('Failed to submit testimonial. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // If loading, show loading state
  if (loading && testimonials.length === 0) {
    return (
      <section id="testimonials" style={{ padding: isMobile ? "60px 20px" : "80px 40px", maxWidth: 900, margin: "0 auto" }}>
        <SectionHeader label="FEEDBACK" title="Testimonials" />
        <GlassCard hover={false} style={{ padding: isMobile ? "32px" : "48px", textAlign: "center" }}>
          <div style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}>
            Loading testimonials...
          </div>
        </GlassCard>
      </section>
    );
  }

  // If no testimonials, show empty state
  if (testimonials.length === 0) {
    return (
      <section id="testimonials" style={{ padding: isMobile ? "60px 20px" : "80px 40px", maxWidth: 900, margin: "0 auto" }}>
        <SectionHeader label="FEEDBACK" title="Testimonials" />
        <GlassCard hover={false} style={{ padding: isMobile ? "32px" : "48px", textAlign: "center" }}>
          <div style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif", marginBottom: 24 }}>
            No testimonials yet. Be the first to share your feedback!
          </div>
          <button
            onClick={() => setShowForm(true)}
            style={{
              background: "linear-gradient(135deg, #00f5d4, #4cc9f0)",
              border: "none", borderRadius: 12, padding: isMobile ? "10px 20px" : "12px 24px",
              color: "#040b14", fontWeight: 800, fontSize: isMobile ? 13 : 14,
              cursor: "pointer", fontFamily: "'Space Mono', monospace",
              letterSpacing: 1, transition: "all 0.2s ease",
              boxShadow: "0 0 20px rgba(0,245,212,0.25)",
            }}
          >
            ADD YOUR TESTIMONIAL
          </button>
        </GlassCard>
      </section>
    );
  }

  const currentTestimonial = testimonials[active] || testimonials[0];

  return (
    <section id="testimonials" style={{ padding: isMobile ? "60px 20px" : "80px 40px", maxWidth: 900, margin: "0 auto" }}>
      <SectionHeader label="FEEDBACK" title="Testimonials" />

      {/* Success message */}
      {submitSuccess && (
        <div style={{
          background: "rgba(0,245,212,0.1)",
          border: "1px solid rgba(0,245,212,0.3)",
          borderRadius: 12,
          padding: isMobile ? "12px 16px" : "16px 24px",
          marginBottom: 24,
          color: "#00f5d4",
          fontFamily: "'DM Sans', sans-serif",
          textAlign: "center",
          fontSize: isMobile ? 14 : 16,
        }}>
          ✓ Thank you for your testimonial! It has been submitted successfully.
        </div>
      )}

      <GlassCard hover={false} style={{
        padding: isMobile ? "32px 24px" : "48px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Quote mark */}
        <div style={{
          fontSize: isMobile ? 80 : 120,
          lineHeight: 0.8,
          color: "rgba(0,245,212,0.06)",
          fontFamily: "serif",
          position: "absolute",
          top: isMobile ? 10 : 20,
          left: isMobile ? 15 : 30,
          userSelect: "none",
        }}>"</div>

        {/* Avatar */}
        <div style={{
          width: isMobile ? 50 : 60,
          height: isMobile ? 50 : 60,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${currentTestimonial.color || '#00f5d4'}, ${currentTestimonial.color || '#00f5d4'}88)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px",
          fontFamily: "'Syne', sans-serif",
          fontSize: isMobile ? 16 : 18,
          fontWeight: 800,
          color: "#040b14",
          boxShadow: `0 0 24px ${currentTestimonial.color || '#00f5d4'}55`,
        }}>
          {currentTestimonial.avatar || (currentTestimonial.name ? currentTestimonial.name.substring(0, 2).toUpperCase() : '??')}
        </div>

        {/* Testimonial Text */}
        <p style={{
          color: "rgba(255,255,255,0.75)",
          fontSize: isMobile ? 16 : 18,
          lineHeight: 1.7,
          fontFamily: "'DM Sans', sans-serif",
          maxWidth: 560,
          margin: "0 auto 24px",
          fontStyle: "italic",
          position: "relative",
          padding: isMobile ? "0 10px" : "0",
        }}>
          "{currentTestimonial.text}"
        </p>

        {/* Name and Role */}
        <div style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: isMobile ? 16 : 17,
          fontWeight: 700,
          color: "#fff"
        }}>
          {currentTestimonial.name}
        </div>
        <div style={{
          color: currentTestimonial.color || '#00f5d4',
          fontSize: isMobile ? 12 : 13,
          fontFamily: "'Space Mono', monospace",
          marginTop: 4
        }}>
          {currentTestimonial.role}
        </div>

        {/* Navigation Dots */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: isMobile ? 24 : 32 }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? (isMobile ? 24 : 28) : 8,
                height: 8,
                borderRadius: 4,
                background: i === active ? "#00f5d4" : "rgba(255,255,255,0.15)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Add Testimonial Button */}
        <div style={{ marginTop: isMobile ? 32 : 40, paddingTop: isMobile ? 24 : 32, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              background: showForm ? "rgba(255,255,255,0.1)" : "linear-gradient(135deg, #7209b7, #f72585)",
              border: "none",
              borderRadius: 12,
              padding: isMobile ? "10px 20px" : "12px 24px",
              color: "#fff",
              fontWeight: 800,
              fontSize: isMobile ? 13 : 14,
              cursor: "pointer",
              fontFamily: "'Space Mono', monospace",
              letterSpacing: 1,
              transition: "all 0.2s ease",
              boxShadow: showForm ? "none" : "0 0 20px rgba(114,9,183,0.25)",
            }}
          >
            {showForm ? 'CANCEL' : 'ADD YOUR TESTIMONIAL'}
          </button>
        </div>
      </GlassCard>

      {/* Testimonial Form */}
      {showForm && (
        <GlassCard hover={false} style={{ padding: isMobile ? "32px 24px" : "48px", marginTop: 32 }}>
          <div style={{ marginBottom: isMobile ? 24 : 32, textAlign: "center" }}>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: isMobile ? 10 : 11,
              letterSpacing: 4,
              color: "#00f5d4",
              marginBottom: isMobile ? 8 : 12,
              opacity: 0.7,
            }}>
              SHARE YOUR FEEDBACK
            </div>
            <h3 style={{
              margin: 0,
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(20px, 4vw, 32px)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: -0.5,
            }}>
              Add Your Testimonial
            </h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 16 : 20 }}>
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: isMobile ? "12px 16px" : "14px 18px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  color: "#fff",
                  fontSize: isMobile ? 14 : 15,
                  fontFamily: "'DM Sans', sans-serif",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "all 0.2s ease",
                  backdropFilter: "blur(10px)",
                }}
              />

              <input
                type="text"
                name="role"
                placeholder="Your Role / Title (Optional)"
                value={formData.role}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: isMobile ? "12px 16px" : "14px 18px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  color: "#fff",
                  fontSize: isMobile ? 14 : 15,
                  fontFamily: "'DM Sans', sans-serif",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "all 0.2s ease",
                  backdropFilter: "blur(10px)",
                }}
              />

              <textarea
                name="text"
                placeholder="Your Testimonial *"
                rows={isMobile ? 4 : 5}
                value={formData.text}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: isMobile ? "12px 16px" : "14px 18px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  color: "#fff",
                  fontSize: isMobile ? 14 : 15,
                  fontFamily: "'DM Sans', sans-serif",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "all 0.2s ease",
                  resize: "vertical",
                  minHeight: isMobile ? 100 : 130,
                  backdropFilter: "blur(10px)",
                }}
              />

              <button
                type="submit"
                disabled={submitting}
                style={{
                  background: submitting ? "rgba(0,245,212,0.5)" : "linear-gradient(135deg, #00f5d4, #4cc9f0)",
                  border: "none",
                  borderRadius: 12,
                  padding: isMobile ? "14px" : "16px",
                  color: "#040b14",
                  fontWeight: 800,
                  fontSize: isMobile ? 14 : 15,
                  cursor: submitting ? "not-allowed" : "pointer",
                  fontFamily: "'Space Mono', monospace",
                  letterSpacing: 1,
                  transition: "all 0.2s ease",
                  boxShadow: "0 0 30px rgba(0,245,212,0.25)",
                  opacity: submitting ? 0.7 : 1,
                }}
              >
                {submitting ? 'SUBMITTING...' : 'SUBMIT TESTIMONIAL →'}
              </button>
            </div>
          </form>

          <div style={{
            marginTop: isMobile ? 20 : 24,
            color: "rgba(255,255,255,0.4)",
            fontSize: isMobile ? 11 : 12,
            fontFamily: "'DM Sans', sans-serif",
            textAlign: "center",
          }}>
            Your testimonial will be visible to others after submission.
          </div>
        </GlassCard>
      )}
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSubmit = () => {
    if (form.name && form.email && form.message) {
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      setForm({ name: "", email: "", message: "" });
    }
  };

  const inputStyle = (field) => ({
    width: "100%",
    padding: isMobile ? "12px 16px" : "14px 18px",
    background: focused === field ? "rgba(0,245,212,0.06)" : "rgba(255,255,255,0.04)",
    border: `1px solid ${focused === field ? "rgba(0,245,212,0.4)" : "rgba(255,255,255,0.08)"}`,
    borderRadius: 12,
    color: "#fff",
    fontSize: isMobile ? 14 : 15,
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    boxSizing: "border-box",
    transition: "all 0.2s ease",
    backdropFilter: "blur(10px)",
  });

  const sectionStyle = {
    padding: isMobile ? "60px 20px 80px" : "80px 40px 120px",
    maxWidth: 700,
    margin: "0 auto"
  };

  const cardStyle = {
    padding: isMobile ? "32px 24px" : "48px"
  };

  const successIconStyle = {
    fontSize: isMobile ? 40 : 48,
    marginBottom: isMobile ? 12 : 16
  };

  const successTitleStyle = {
    color: "#00f5d4",
    fontFamily: "'Syne', sans-serif",
    fontSize: isMobile ? 20 : 22,
    fontWeight: 700
  };

  const successMessageStyle = {
    color: "rgba(255,255,255,0.4)",
    marginTop: 8,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: isMobile ? 14 : 16
  };

  const formContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? 16 : 20
  };

  const submitButtonStyle = {
    background: "linear-gradient(135deg, #00f5d4, #4cc9f0)",
    border: "none",
    borderRadius: 12,
    padding: isMobile ? "14px" : "16px",
    color: "#040b14",
    fontWeight: 800,
    fontSize: isMobile ? 14 : 15,
    cursor: "pointer",
    fontFamily: "'Space Mono', monospace",
    letterSpacing: 1,
    transition: "all 0.2s ease",
    boxShadow: "0 0 30px rgba(0,245,212,0.25)",
  };

  const socialContainerStyle = {
    display: "flex",
    gap: isMobile ? 12 : 16,
    justifyContent: "center",
    marginTop: isMobile ? 24 : 32,
    flexWrap: "wrap"
  };

  const socialLinkStyle = (color) => ({
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    padding: isMobile ? "8px 16px" : "10px 20px",
    color: color,
    textDecoration: "none",
    fontSize: isMobile ? 12 : 13,
    fontFamily: "'Space Mono', monospace",
    transition: "all 0.2s ease",
    backdropFilter: "blur(10px)",
  });

  return (
    <section id="contact" style={sectionStyle}>
      <SectionHeader label="REACH OUT" title="Contact" />
      <GlassCard hover={false} style={cardStyle}>
        {sent ? (
          <div style={{ textAlign: "center", padding: isMobile ? "30px 0" : "40px 0" }}>
            <div style={successIconStyle}>✓</div>
            <div style={successTitleStyle}>Message Sent!</div>
            <div style={successMessageStyle}>I'll get back to you shortly.</div>
          </div>
        ) : (
          <div style={formContainerStyle}>
            <input
              placeholder="Your Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              onFocus={() => setFocused("name")}
              onBlur={() => setFocused(null)}
              style={inputStyle("name")}
            />
            <input
              placeholder="Email Address"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              style={inputStyle("email")}
            />
            <textarea
              placeholder="Your message..."
              rows={isMobile ? 4 : 5}
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused(null)}
              style={{ ...inputStyle("message"), resize: "vertical", minHeight: isMobile ? 100 : 130 }}
            />
            <button
              onClick={handleSubmit}
              style={submitButtonStyle}
            >
              SEND MESSAGE →
            </button>
          </div>
        )}
      </GlassCard>

      {/* Social Links */}
      <div style={socialContainerStyle}>
        {[
          { label: "GitHub", color: "#00f5d4" },
          { label: "LinkedIn", color: "#4cc9f0" },
          { label: "Twitter", color: "#f72585" },
          { label: "Email", color: "#7209b7" },
        ].map(s => (
          <a key={s.label} href="#" style={socialLinkStyle(s.color)}>
            {s.label}
          </a>
        ))}
      </div>
    </section>
  );
}

function SectionHeader({ label, title }) {
  return (
    <div style={{ marginBottom: 48, textAlign: "center" }}>
      <div style={{
        fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 4,
        color: "#00f5d4", marginBottom: 12, opacity: 0.7,
      }}>
        {label}
      </div>
      <h2 style={{
        margin: 0, fontFamily: "'Syne', sans-serif",
        fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800,
        color: "#fff", letterSpacing: -1,
      }}>
        {title}
      </h2>
      <div style={{
        width: 48, height: 3, borderRadius: 2,
        background: "linear-gradient(90deg, #00f5d4, #4cc9f0)",
        margin: "16px auto 0",
        boxShadow: "0 0 12px rgba(0,245,212,0.5)",
      }} />
    </div>
  );
}

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("about");

  const handleNav = (section) => {
    setActiveNav(section);
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const sections = NAV_LINKS.map(l => l.toLowerCase());
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveNav(e.target.id); });
      },
      { threshold: 0.4 }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #000510; color: #fff; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #040b14; }
        ::-webkit-scrollbar-thumb { background: rgba(0,245,212,0.3); border-radius: 4px; }
        @keyframes blob1 { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(80px,-60px) scale(1.15); } 66% { transform: translate(-40px,40px) scale(0.9); } }
        @keyframes blob2 { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(-60px,50px) scale(1.1); } 66% { transform: translate(80px,-80px) scale(0.95); } }
        @keyframes blob3 { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(50px,60px) scale(1.2); } 66% { transform: translate(-70px,-30px) scale(0.85); } }
        @keyframes blob4 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,-40px) scale(1.15); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes scrollLine { 0% { opacity: 0; transform: scaleY(0); transform-origin: top; } 50% { opacity: 1; transform: scaleY(1); } 100% { opacity: 0; transform: scaleY(1); transform-origin: bottom; } }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.25); }
        
        /* Responsive media queries */
        @media (max-width: 768px) {
          ::-webkit-scrollbar { width: 2px; }
          .mobile-hide { display: none !important; }
          .mobile-full-width { width: 100% !important; }
        }
        
        @media (max-width: 480px) {
          html { font-size: 14px; }
        }
        
        /* Improve touch targets on mobile */
        @media (hover: none) and (pointer: coarse) {
          button, a { min-height: 44px; min-width: 44px; }
          input, textarea { font-size: 16px !important; } /* Prevents iOS zoom */
        }
      `}</style>
      <AuroraBackground />
      <Navbar active={activeNav} onNav={handleNav} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <TestimonialsSection />
        <ContactSection />
        {/* Footer */}
        <div style={{
          textAlign: "center",
          padding: "24px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          color: "rgba(255,255,255,0.2)",
          fontSize: "clamp(10px, 2vw, 12px)",
          fontFamily: "'Space Mono', monospace",
        }}>
          Crafted with ♥ by Reckie Degollacion · {new Date().getFullYear()}
        </div>
      </div>
    </>
  );
}