import "@fontsource/newsreader/latin-400.css";
import "@fontsource/newsreader/latin-400-italic.css";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowUp,
  Plus,
  Minus,
  Menu,
  X,
  Copy,
  Check,
  ChevronRight,
} from "lucide-react";
import { profile, work, experience, skills, leadership } from "./data";
import "./styles.css";
const Arrow = () => <ArrowUpRight aria-hidden="true" size={19} />;
const SectionLabel = ({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) => (
  <div className="eyebrow section-label">
    <span>{number}</span>
    {children}
  </div>
);

function WorkVisual({ type }: { type: string }) {
  if (type === "flow")
    return (
      <div
        className="flow-visual"
        aria-label="Conceptual four-stage authoring workflow"
      >
        <div className="diagram-top">
          <span>INPUT / ENGINEERING KNOWLEDGE</span>
          <span>01—04</span>
        </div>
        <div className="document-stack">
          <div />
          <div />
          <div>
            <span>Context</span>
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="flow-path">
          <span className="flow-dot" />
          <span />
          <span className="flow-dot" />
        </div>
        <div className="stage-list">
          {["Requirements", "Retrieval", "Generation", "Validation"].map(
            (x, i) => (
              <div key={x}>
                <span>0{i + 1}</span>
                {x}
                <ChevronRight size={14} />
              </div>
            ),
          )}
        </div>
        <div className="diagram-bottom">
          <span>GROUNDED OUTPUT</span>
          <span>Human review retained ↗</span>
        </div>
      </div>
    );
  if (type === "finance")
    return (
      <div className="finance-visual">
        <div className="mock-label">FINBUDDY / CONCEPT VIEW</div>
        <div className="finance-header">
          <span>Money, in perspective.</span>
          <span>◎</span>
        </div>
        <div className="finance-chart" aria-hidden="true">
          {[38, 65, 48, 79, 57, 89, 62].map((x, i) => (
            <i style={{ height: `${x}%` }} key={i} />
          ))}
        </div>
        <div className="finance-foot">
          <span>Expense patterns</span>
          <span>Clarity → decisions</span>
        </div>
        <div className="finance-note">
          Interactive dashboards + AI-generated tips
        </div>
      </div>
    );
  return (
    <div className="portal-visual">
      <span className="mock-label">HR OPERATIONS / SYSTEM VIEW</span>
      <div className="portal-core">
        <span>1,000+</span>
        <small>employees</small>
      </div>
      <div className="portal-nodes">
        <span>Secure records</span>
        <span>Attendance</span>
        <span>Real-time data</span>
      </div>
      <div className="portal-line" />
      <span className="portal-caption">React ↔ REST APIs ↔ Firebase</span>
    </div>
  );
}
function Navigation() {
  const [open, setOpen] = useState(false),
    [active, setActive] = useState("work");
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    ["work", "experience", "about", "contact"].forEach((id) => {
      const e = document.getElementById(id);
      if (e) observer.observe(e);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header>
      <a className="wordmark" href="#top" aria-label="Mehak Khandelwal home">
        mk<span>·</span>
      </a>
      <span className="header-name">MEHAK KHANDELWAL</span>
      <button
        id="menu-toggle"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="main-nav"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav
        id="main-nav"
        className={open ? "open" : ""}
        aria-label="Main navigation"
      >
        {["work", "experience", "about", "contact"].map((n) => (
          <a
            key={n}
            className={active === n ? "active" : ""}
            href={`#${n}`}
            onClick={() => setOpen(false)}
          >
            {n}
            <span>{n === "contact" ? "↗" : ""}</span>
          </a>
        ))}
      </nav>
    </header>
  );
}
function Hero() {
  const visual = useRef<HTMLDivElement>(null);
  return (
    <section className="hero" id="top">
      <div className="hero-meta eyebrow">
        <span>ENGINEERING PORTFOLIO</span>
        <span>EDITION / 2026</span>
      </div>
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="eyebrow intro-label">
            SOFTWARE · AI · FINANCIAL TECHNOLOGY
          </p>
          <h1>
            <span>Software,</span>
            <br />
            <em>with context.</em>
          </h1>
          <p className="hero-intro">{profile.intro}</p>
          <div className="hero-actions">
            <a className="button" href="#work">
              Explore my work <ArrowDown size={17} />
            </a>
            <a className="text-link" href="#experience">
              View experience <Arrow />
            </a>
          </div>
        </div>
        <div
          ref={visual}
          className="hero-art"
          aria-hidden="true"
          onPointerMove={(e) => {
            if (
              window.matchMedia(
                "(hover:hover) and (prefers-reduced-motion:no-preference)",
              ).matches
            ) {
              const r = e.currentTarget.getBoundingClientRect();
              visual.current?.style.setProperty(
                "--mx",
                `${((e.clientX - r.left) / r.width - 0.5) * 7}px`,
              );
              visual.current?.style.setProperty(
                "--my",
                `${((e.clientY - r.top) / r.height - 0.5) * 7}px`,
              );
            }
          }}
          onPointerLeave={() => {
            visual.current?.style.setProperty("--mx", "0px");
            visual.current?.style.setProperty("--my", "0px");
          }}
        >
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-cross c1">+</div>
          <div className="art-cross c2">+</div>
          <span className="art-coordinate">FIG. 01 / INTERSECTIONS</span>
          <div className="art-monogram">
            m<span>k</span>
          </div>
          <span className="art-node n1">ENGINEERING</span>
          <span className="art-node n2">INTELLIGENCE</span>
          <span className="art-node n3">DESIGN</span>
          <div className="art-caption">
            Different disciplines.
            <br />
            One considered system.
          </div>
        </div>
      </div>
      <div className="hero-bottom">
        <span className="eyebrow">SELECTED EXPERIENCE</span>
        <div className="hero-companies">
          <span>Microsoft</span>
          <span>Avira Digital</span>
          <span>MIT Manipal</span>
        </div>
        <a
          href="#work"
          className="scroll-cue"
          aria-label="Scroll to selected work"
        >
          <ArrowDown size={18} />
        </a>
      </div>
    </section>
  );
}
function SelectedWork() {
  const [selected, setSelected] = useState(0),
    [expanded, setExpanded] = useState(false);
  const item = work[selected];
  const select = (i: number) => {
    setSelected(i);
    setExpanded(false);
  };
  return (
    <section className="section work-section" id="work">
      <div className="section-heading reveal">
        <SectionLabel number="01">SELECTED WORK</SectionLabel>
        <h2>
          From an idea
          <br />
          to a <em>working system.</em>
        </h2>
        <p>
          One personal project. Two internship work studies.
          <br />A closer look at the problems behind the code.
        </p>
      </div>
      <div
        className="work-selector"
        role="tablist"
        aria-label="Selected work"
        onKeyDown={(e) => {
          if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) {
            e.preventDefault();
            const i =
              e.key === "Home"
                ? 0
                : e.key === "End"
                  ? work.length - 1
                  : (selected +
                      (e.key === "ArrowRight" ? 1 : -1) +
                      work.length) %
                    work.length;
            select(i);
            document.getElementById(`work-tab-${i}`)?.focus();
          }
        }}
      >
        {work.map((w, i) => (
          <button
            key={w.id}
            id={`work-tab-${i}`}
            role="tab"
            aria-selected={selected === i}
            aria-controls="work-panel"
            tabIndex={selected === i ? 0 : -1}
            className={selected === i ? "selected" : ""}
            onClick={() => select(i)}
          >
            <span className="eyebrow">
              {w.number} / {w.kind}
            </span>
            <span>
              {w.short}
              <Arrow />
            </span>
          </button>
        ))}
      </div>
      <div
        className="work-feature"
        role="tabpanel"
        id="work-panel"
        aria-labelledby={`work-tab-${selected}`}
      >
        <div className={`work-art ${item.visual}`} key={`${item.id}-art`}>
          <WorkVisual type={item.visual} />
          <p className="visual-disclaimer">{item.note}</p>
        </div>
        <div className="work-copy" key={item.id}>
          <span className="eyebrow">{item.label}</span>
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
          <div className="work-metric">
            <strong>{item.metric}</strong>
            <span>{item.metricLabel}</span>
          </div>
          <div className="tags">
            {item.technologies.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <button
            className="detail-toggle"
            aria-expanded={expanded}
            aria-controls="work-details"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Close work study" : "Read work study"}
            {expanded ? <Minus size={18} /> : <Plus size={18} />}
          </button>
        </div>
      </div>
      <div id="work-details" hidden={!expanded} className="work-details">
        <div>
          <span className="eyebrow">THE PROBLEM</span>
          <p>{item.problem}</p>
        </div>
        <div>
          <span className="eyebrow">MY CONTRIBUTION</span>
          <p>{item.contribution}</p>
        </div>
        <div>
          <span className="eyebrow">THE OUTCOME</span>
          <p>{item.outcome}</p>
        </div>
      </div>
      <p className="work-footnote">
        Outcomes are reported in my résumé. Visuals are conceptual, created for
        this portfolio.
      </p>
    </section>
  );
}
function Experience() {
  const [expanded, setExpanded] = useState(0);
  return (
    <section id="experience" className="section experience-section">
      <div className="section-heading reveal">
        <SectionLabel number="02">EXPERIENCE</SectionLabel>
        <h2>
          Learning by
          <br />
          <em>building.</em>
        </h2>
        <p>
          Across AI-backed engineering workflows
          <br />
          and full-stack product development.
        </p>
      </div>
      <div className="timeline">
        {experience.map((e, i) => (
          <article
            key={e.company}
            className={
              expanded === i ? "experience-entry expanded" : "experience-entry"
            }
          >
            <button
              className="experience-trigger"
              aria-expanded={expanded === i}
              aria-controls={`experience-${i}`}
              onClick={() => setExpanded(expanded === i ? -1 : i)}
            >
              <span className="experience-year eyebrow">
                {e.date}
                <small>{e.location}</small>
              </span>
              <span className="experience-title">
                <strong>{e.company}</strong>
                <span>{e.role}</span>
              </span>
              {expanded === i ? <Minus /> : <Plus />}
            </button>
            <div
              id={`experience-${i}`}
              hidden={expanded !== i}
              className="experience-body"
            >
              <p>{e.intro}</p>
              <ul>
                {e.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <span className="eyebrow">{e.stack}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
function About() {
  const [filter, setFilter] = useState("All");
  return (
    <>
      <section id="about" className="section about-section">
        <SectionLabel number="03">ABOUT / AN INTERSECTION</SectionLabel>
        <div className="about-grid reveal">
          <h2>
            Engineering rigor.
            <br />
            <em>A design perspective.</em>
          </h2>
          <div>
            <p className="large-copy">
              My work sits where software, financial technology and product
              design meet.
            </p>
            <p>
              At Microsoft, I worked on AI-assisted engineering workflows. At
              Avira Digital, I built full-stack applications. FinBuddy applies
              full-stack tools to personal finance, while my leadership roles
              add a practical lens on UI/UX, communication and product
              direction.
            </p>
            <div className="education">
              <span className="eyebrow">
                EDUCATION / {profile.education.dates}
              </span>
              <h3>{profile.education.degree}</h3>
              <p>{profile.education.school}</p>
              <span className="eyebrow">CGPA {profile.education.grade}</span>
            </div>
          </div>
        </div>
      </section>
      <section
        className="section toolkit-section"
        aria-labelledby="toolkit-title"
      >
        <div className="toolkit-heading">
          <SectionLabel number="04">THE TOOLKIT</SectionLabel>
          <h2 id="toolkit-title">
            Tools for <em>the work.</em>
          </h2>
        </div>
        <div className="skill-filters" aria-label="Filter skills">
          {["All", ...skills.map((x) => x.category)].map((x) => (
            <button
              aria-pressed={filter === x}
              className={filter === x ? "selected" : ""}
              key={x}
              onClick={() => setFilter(x)}
            >
              {x}
            </button>
          ))}
        </div>
        <div className="skills-grid" aria-live="polite">
          {skills
            .filter((s) => filter === "All" || filter === s.category)
            .map((s) => (
              <div className="skill-group" key={s.category}>
                <span className="eyebrow">{s.category}</span>
                <p>{s.items.join(" · ")}</p>
              </div>
            ))}
        </div>
      </section>
      <section className="section leadership-section">
        <SectionLabel number="05">BEYOND THE CODE</SectionLabel>
        <div className="leadership-title reveal">
          <h2>
            Products need
            <br />
            <em>people, too.</em>
          </h2>
          <p>
            Design, communication and collaboration
            <br />
            alongside the technical work.
          </p>
        </div>
        <div className="leadership-grid">
          {leadership.map((l) => (
            <article key={l.name}>
              <span className="eyebrow">{l.date}</span>
              <h3>{l.name}</h3>
              <h4>{l.role}</h4>
              <p>{l.description}</p>
              <div className="leadership-stat">
                <strong>{l.stat}</strong>
                <span>{l.outcome}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
function Contact() {
  const [copied, setCopied] = useState(false),
    [error, setError] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setError(false);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2400);
    } catch {
      setError(true);
    }
  }
  return (
    <section id="contact" className="contact-section">
      <div className="contact-inner">
        <SectionLabel number="06">LET’S CONNECT</SectionLabel>
        <div className="contact-main reveal">
          <h2>
            Have a thoughtful
            <br />
            problem <em>to solve?</em>
          </h2>
          <a
            className="contact-arrow"
            href={`mailto:${profile.email}`}
            aria-label="Email Mehak"
          >
            <ArrowUpRight />
          </a>
        </div>
        <div className="contact-bottom">
          <div>
            <a className="email-link" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <button
              className="copy-button"
              onClick={copy}
              aria-label="Copy email address"
            >
              {copied ? <Check size={17} /> : <Copy size={17} />}
              <span>{copied ? "Copied" : "Copy email"}</span>
            </button>
            <span className="copy-status" role="status">
              {error
                ? "Please select and copy the email address above."
                : copied
                  ? "Email address copied."
                  : ""}
            </span>
          </div>
          <p>
            Software engineering.
            <br />
            Applied AI. Financial technology.
          </p>
        </div>
        <footer>
          <a className="wordmark" href="#top" aria-label="Back to top">
            mk<span>·</span>
          </a>
          <span>© {new Date().getFullYear()} Mehak Khandelwal</span>
          <a href="#top">
            Back to top <ArrowUp size={16} />
          </a>
        </footer>
      </div>
    </section>
  );
}
function App() {
  useEffect(() => {
    const reveal =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            (entries) =>
              entries.forEach((e) => {
                if (e.isIntersecting) {
                  e.target.classList.add("visible");
                  reveal?.unobserve(e.target);
                }
              }),
            { threshold: 0.1 },
          );
    document.querySelectorAll(".reveal").forEach((e) => reveal?.observe(e));
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        document.documentElement.style.setProperty(
          "--progress",
          `${max > 0 ? window.scrollY / max : 0}`,
        );
        frame = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      reveal?.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="reading-progress" aria-hidden="true" />
      <Navigation />
      <main id="main">
        <Hero />
        <SelectedWork />
        <Experience />
        <About />
        <Contact />
      </main>
    </>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
