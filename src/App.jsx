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
    role: "Junior Web Developer",
    company: "Startup Hive",
    period: "2018 – 2020",
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
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      padding: "16px 40px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(4,11,20,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,245,212,0.08)" : "none",
      transition: "all 0.4s ease",
    }}>
      <span style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 20, fontWeight: 700,
        color: "#00f5d4",
        letterSpacing: 2,
      }}>
        &lt;dev/&gt;
      </span>
      <div style={{ display: "flex", gap: 8 }}>
        {NAV_LINKS.map(link => (
          <button
            key={link}
            onClick={() => onNav(link.toLowerCase())}
            style={{
              background: active === link.toLowerCase() ? "rgba(0,245,212,0.12)" : "transparent",
              border: active === link.toLowerCase() ? "1px solid rgba(0,245,212,0.3)" : "1px solid transparent",
              borderRadius: 8,
              color: active === link.toLowerCase() ? "#00f5d4" : "rgba(255,255,255,0.55)",
              padding: "6px 16px",
              cursor: "pointer",
              fontSize: 13,
              fontFamily: "'Space Mono', monospace",
              letterSpacing: 1,
              transition: "all 0.2s ease",
            }}
          >
            {link}
          </button>
        ))}
      </div>
    </nav>
  );
}

function HeroSection() {
  const [typed, setTyped] = useState("");
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
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="about" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", padding: "120px 40px 80px",
      flexDirection: "column", textAlign: "center", position: "relative",
    }}>
      {/* Floating badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        background: "rgba(0,245,212,0.08)", border: "1px solid rgba(0,245,212,0.2)",
        borderRadius: 100, padding: "8px 20px", marginBottom: 32,
        fontSize: 12, color: "#00f5d4", fontFamily: "'Space Mono', monospace",
        letterSpacing: 2, animation: "fadeUp 0.8s ease both",
      }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00f5d4", display: "inline-block", animation: "pulse 2s infinite" }} />
        AVAILABLE FOR HIRE
      </div>

      <h1 style={{
        margin: 0, lineHeight: 1.1,
        animation: "fadeUp 0.8s ease 0.1s both",
      }}>
        <span style={{
          display: "block",
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(42px, 8vw, 88px)",
          fontWeight: 800,
          color: "#fff",
          letterSpacing: -2,
        }}>
          Reckie Degollacion
        </span>
        <span style={{
          display: "block",
          fontFamily: "'Space Mono', monospace",
          fontSize: "clamp(20px, 4vw, 40px)",
          fontWeight: 400,
          background: "linear-gradient(90deg, #00f5d4, #4cc9f0, #f72585)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          minHeight: "1.4em",
          letterSpacing: -1,
        }}>
          {typed}<span style={{ opacity: Math.sin(Date.now() / 500) > 0 ? 1 : 0, color: "#00f5d4", WebkitTextFillColor: "#00f5d4" }}>|</span>
        </span>
      </h1>

      <p style={{
        maxWidth: 560, marginTop: 24, marginBottom: 0,
        color: "rgba(255,255,255,0.5)", fontSize: 17,
        lineHeight: 1.75, fontFamily: "'DM Sans', sans-serif",
        animation: "fadeUp 0.8s ease 0.2s both",
      }}>
        I build fast, scalable, and beautiful web applications. Passionate about clean architecture, great UX, and shipping products that matter.
      </p>

      <div style={{
        display: "flex", gap: 16, marginTop: 40,
        animation: "fadeUp 0.8s ease 0.3s both",
        flexWrap: "wrap", justifyContent: "center",
      }}>
        <button
          onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          style={{
            background: "linear-gradient(135deg, #00f5d4, #4cc9f0)",
            border: "none", borderRadius: 12, padding: "14px 32px",
            color: "#040b14", fontWeight: 700, fontSize: 15,
            cursor: "pointer", fontFamily: "'Space Mono', monospace",
            letterSpacing: 1, transition: "all 0.2s ease",
            boxShadow: "0 0 30px rgba(0,245,212,0.3)",
          }}
        >
          View Projects →
        </button>
        <button
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "14px 32px",
            color: "rgba(255,255,255,0.8)", fontWeight: 500, fontSize: 15,
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            transition: "all 0.2s ease",
          }}
        >
          Contact Me
        </button>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 40,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        animation: "fadeIn 1.5s ease 1s both",
      }}>
        <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, fontFamily: "'Space Mono', monospace", letterSpacing: 2 }}>SCROLL</span>
        <div style={{
          width: 1, height: 50,
          background: "linear-gradient(180deg, rgba(0,245,212,0.6), transparent)",
          animation: "scrollLine 2s ease-in-out infinite",
        }} />
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" style={{ padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}>
      <SectionHeader label="CAREER" title="Experience" />
      <div style={{ position: "relative", paddingLeft: 40 }}>
        {/* Timeline line */}
        <div style={{
          position: "absolute", left: 0, top: 8, bottom: 0,
          width: 1, background: "linear-gradient(180deg, #00f5d4, rgba(0,245,212,0.1))",
        }} />
        {EXPERIENCES.map((exp, i) => (
          <div key={i} style={{ position: "relative", marginBottom: 40 }}>
            {/* Dot */}
            <div style={{
              position: "absolute", left: -47, top: 20,
              width: 14, height: 14, borderRadius: "50%",
              background: exp.color, border: "3px solid #040b14",
              boxShadow: `0 0 12px ${exp.color}`,
            }} />
            <GlassCard style={{ padding: "28px 32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                <div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 700, color: "#fff" }}>{exp.role}</div>
                  <div style={{ color: exp.color, fontSize: 14, fontFamily: "'Space Mono', monospace", marginTop: 2 }}>{exp.company}</div>
                </div>
                <div style={{
                  background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: "4px 12px",
                  color: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "'Space Mono', monospace",
                  whiteSpace: "nowrap",
                }}>
                  {exp.period}
                </div>
              </div>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.55)", fontSize: 15, lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif" }}>{exp.desc}</p>
            </GlassCard>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" style={{ padding: "80px 40px", maxWidth: 1100, margin: "0 auto" }}>
      <SectionHeader label="WORK" title="Projects" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
        {PROJECTS.map((proj, i) => (
          <GlassCard key={i} style={{ padding: "28px", overflow: "hidden", position: "relative" }}>
            {/* Glow accent */}
            <div style={{
              position: "absolute", top: -40, right: -40,
              width: 120, height: 120, borderRadius: "50%",
              background: `radial-gradient(circle, ${proj.color}22, transparent 70%)`,
              pointerEvents: "none",
            }} />
            <div style={{
              fontSize: 32, marginBottom: 16, color: proj.color,
              fontFamily: "'Space Mono', monospace",
            }}>{proj.icon}</div>
            <h3 style={{ margin: "0 0 10px", fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 700, color: "#fff" }}>{proj.title}</h3>
            <p style={{ margin: "0 0 20px", color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif" }}>{proj.desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
              {proj.tags.map(tag => (
                <span key={tag} style={{
                  background: `${proj.color}14`, border: `1px solid ${proj.color}33`,
                  color: proj.color, borderRadius: 6, padding: "3px 10px",
                  fontSize: 11, fontFamily: "'Space Mono', monospace",
                }}>{tag}</span>
              ))}
            </div>
            <a href={proj.link} style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              color: proj.color, fontSize: 13, fontFamily: "'Space Mono', monospace",
              textDecoration: "none", letterSpacing: 1,
            }}>
              View Project →
            </a>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

function SkillsSection() {
  const categories = [...new Set(SKILLS.map(s => s.cat))];
  return (
    <section id="skills" style={{ padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}>
      <SectionHeader label="ARSENAL" title="Skills" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
        {categories.map(cat => (
          <GlassCard key={cat} style={{ padding: "28px" }}>
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 2,
              color: "#00f5d4", marginBottom: 20, opacity: 0.8,
            }}>{cat.toUpperCase()}</div>
            {SKILLS.filter(s => s.cat === cat).map((skill, i) => (
              <div key={i} style={{ marginBottom: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>{skill.name}</span>
                  <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, fontFamily: "'Space Mono', monospace" }}>{skill.level}%</span>
                </div>
                <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", borderRadius: 4,
                    background: "linear-gradient(90deg, #00f5d4, #4cc9f0)",
                    width: `${skill.level}%`,
                    transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
                    boxShadow: "0 0 8px rgba(0,245,212,0.5)",
                  }} />
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
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: '', text: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
      <section id="testimonials" style={{ padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}>
        <SectionHeader label="FEEDBACK" title="Testimonials" />
        <GlassCard hover={false} style={{ padding: "48px", textAlign: "center" }}>
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
      <section id="testimonials" style={{ padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}>
        <SectionHeader label="FEEDBACK" title="Testimonials" />
        <GlassCard hover={false} style={{ padding: "48px", textAlign: "center" }}>
          <div style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif", marginBottom: 24 }}>
            No testimonials yet. Be the first to share your feedback!
          </div>
          <button
            onClick={() => setShowForm(true)}
            style={{
              background: "linear-gradient(135deg, #00f5d4, #4cc9f0)",
              border: "none", borderRadius: 12, padding: "12px 24px",
              color: "#040b14", fontWeight: 800, fontSize: 14,
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
    <section id="testimonials" style={{ padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}>
      <SectionHeader label="FEEDBACK" title="Testimonials" />

      {/* Success message */}
      {submitSuccess && (
        <div style={{
          background: "rgba(0,245,212,0.1)",
          border: "1px solid rgba(0,245,212,0.3)",
          borderRadius: 12,
          padding: "16px 24px",
          marginBottom: 24,
          color: "#00f5d4",
          fontFamily: "'DM Sans', sans-serif",
          textAlign: "center",
        }}>
          ✓ Thank you for your testimonial! It has been submitted successfully.
        </div>
      )}

      <GlassCard hover={false} style={{ padding: "48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* Quote mark */}
        <div style={{
          fontSize: 120, lineHeight: 0.8, color: "rgba(0,245,212,0.06)",
          fontFamily: "serif", position: "absolute", top: 20, left: 30,
          userSelect: "none",
        }}>"</div>

        {/* Avatar */}
        <div style={{
          width: 60, height: 60, borderRadius: "50%",
          background: `linear-gradient(135deg, ${currentTestimonial.color || '#00f5d4'}, ${currentTestimonial.color || '#00f5d4'}88)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 24px",
          fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "#040b14",
          boxShadow: `0 0 24px ${currentTestimonial.color || '#00f5d4'}55`,
        }}>
          {currentTestimonial.avatar || (currentTestimonial.name ? currentTestimonial.name.substring(0, 2).toUpperCase() : '??')}
        </div>

        {/* Testimonial Text */}
        <p style={{
          color: "rgba(255,255,255,0.75)", fontSize: 18, lineHeight: 1.7,
          fontFamily: "'DM Sans', sans-serif", maxWidth: 560, margin: "0 auto 28px",
          fontStyle: "italic", position: "relative",
        }}>
          "{currentTestimonial.text}"
        </p>

        {/* Name and Role */}
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 700, color: "#fff" }}>
          {currentTestimonial.name}
        </div>
        <div style={{ color: currentTestimonial.color || '#00f5d4', fontSize: 13, fontFamily: "'Space Mono', monospace", marginTop: 4 }}>
          {currentTestimonial.role}
        </div>

        {/* Navigation Dots */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 32 }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? 28 : 8, height: 8, borderRadius: 4,
                background: i === active ? "#00f5d4" : "rgba(255,255,255,0.15)",
                border: "none", cursor: "pointer", padding: 0,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Add Testimonial Button */}
        <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              background: showForm ? "rgba(255,255,255,0.1)" : "linear-gradient(135deg, #7209b7, #f72585)",
              border: "none", borderRadius: 12, padding: "12px 24px",
              color: "#fff", fontWeight: 800, fontSize: 14,
              cursor: "pointer", fontFamily: "'Space Mono', monospace",
              letterSpacing: 1, transition: "all 0.2s ease",
              boxShadow: showForm ? "none" : "0 0 20px rgba(114,9,183,0.25)",
            }}
          >
            {showForm ? 'CANCEL' : 'ADD YOUR TESTIMONIAL'}
          </button>
        </div>
      </GlassCard>

      {/* Testimonial Form */}
      {showForm && (
        <GlassCard hover={false} style={{ padding: "48px", marginTop: 32 }}>
          <div style={{ marginBottom: 32, textAlign: "center" }}>
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 4,
              color: "#00f5d4", marginBottom: 12, opacity: 0.7,
            }}>
              SHARE YOUR FEEDBACK
            </div>
            <h3 style={{
              margin: 0, fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 800,
              color: "#fff", letterSpacing: -0.5,
            }}>
              Add Your Testimonial
            </h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%", padding: "14px 18px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12, color: "#fff", fontSize: 15,
                  fontFamily: "'DM Sans', sans-serif",
                  outline: "none", boxSizing: "border-box",
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
                  width: "100%", padding: "14px 18px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12, color: "#fff", fontSize: 15,
                  fontFamily: "'DM Sans', sans-serif",
                  outline: "none", boxSizing: "border-box",
                  transition: "all 0.2s ease",
                  backdropFilter: "blur(10px)",
                }}
              />

              <textarea
                name="text"
                placeholder="Your Testimonial *"
                rows={5}
                value={formData.text}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%", padding: "14px 18px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12, color: "#fff", fontSize: 15,
                  fontFamily: "'DM Sans', sans-serif",
                  outline: "none", boxSizing: "border-box",
                  transition: "all 0.2s ease",
                  resize: "vertical", minHeight: 130,
                  backdropFilter: "blur(10px)",
                }}
              />

              <button
                type="submit"
                disabled={submitting}
                style={{
                  background: submitting ? "rgba(0,245,212,0.5)" : "linear-gradient(135deg, #00f5d4, #4cc9f0)",
                  border: "none", borderRadius: 12, padding: "16px",
                  color: "#040b14", fontWeight: 800, fontSize: 15,
                  cursor: submitting ? "not-allowed" : "pointer",
                  fontFamily: "'Space Mono', monospace",
                  letterSpacing: 1, transition: "all 0.2s ease",
                  boxShadow: "0 0 30px rgba(0,245,212,0.25)",
                  opacity: submitting ? 0.7 : 1,
                }}
              >
                {submitting ? 'SUBMITTING...' : 'SUBMIT TESTIMONIAL →'}
              </button>
            </div>
          </form>

          <div style={{
            marginTop: 24,
            color: "rgba(255,255,255,0.4)",
            fontSize: 12,
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

  const handleSubmit = () => {
    if (form.name && form.email && form.message) {
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      setForm({ name: "", email: "", message: "" });
    }
  };

  const inputStyle = (field) => ({
    width: "100%", padding: "14px 18px",
    background: focused === field ? "rgba(0,245,212,0.06)" : "rgba(255,255,255,0.04)",
    border: `1px solid ${focused === field ? "rgba(0,245,212,0.4)" : "rgba(255,255,255,0.08)"}`,
    borderRadius: 12, color: "#fff", fontSize: 15,
    fontFamily: "'DM Sans', sans-serif",
    outline: "none", boxSizing: "border-box",
    transition: "all 0.2s ease",
    backdropFilter: "blur(10px)",
  });

  return (
    <section id="contact" style={{ padding: "80px 40px 120px", maxWidth: 700, margin: "0 auto" }}>
      <SectionHeader label="REACH OUT" title="Contact" />
      <GlassCard hover={false} style={{ padding: "48px" }}>
        {sent ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
            <div style={{ color: "#00f5d4", fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700 }}>Message Sent!</div>
            <div style={{ color: "rgba(255,255,255,0.4)", marginTop: 8, fontFamily: "'DM Sans', sans-serif" }}>I'll get back to you shortly.</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
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
              rows={5}
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused(null)}
              style={{ ...inputStyle("message"), resize: "vertical", minHeight: 130 }}
            />
            <button
              onClick={handleSubmit}
              style={{
                background: "linear-gradient(135deg, #00f5d4, #4cc9f0)",
                border: "none", borderRadius: 12, padding: "16px",
                color: "#040b14", fontWeight: 800, fontSize: 15,
                cursor: "pointer", fontFamily: "'Space Mono', monospace",
                letterSpacing: 1, transition: "all 0.2s ease",
                boxShadow: "0 0 30px rgba(0,245,212,0.25)",
              }}
            >
              SEND MESSAGE →
            </button>
          </div>
        )}
      </GlassCard>

      {/* Social Links */}
      <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
        {[
          { label: "GitHub", color: "#00f5d4" },
          { label: "LinkedIn", color: "#4cc9f0" },
          { label: "Twitter", color: "#f72585" },
          { label: "Email", color: "#7209b7" },
        ].map(s => (
          <a key={s.label} href="#" style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10, padding: "10px 20px",
            color: s.color, textDecoration: "none",
            fontSize: 13, fontFamily: "'Space Mono', monospace",
            transition: "all 0.2s ease",
            backdropFilter: "blur(10px)",
          }}>
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
          textAlign: "center", padding: "24px", borderTop: "1px solid rgba(255,255,255,0.05)",
          color: "rgba(255,255,255,0.2)", fontSize: 12, fontFamily: "'Space Mono', monospace",
        }}>
          Crafted with ♥ by Reckie Degollacion · {new Date().getFullYear()}
        </div>
      </div>
    </>
  );
}