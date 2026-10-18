import { FormEvent, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  CalendarDays,
  Check,
  ChevronRight,
  Landmark,
  Layers3,
  LockKeyhole,
  Menu,
  MessagesSquare,
  PlayCircle,
  Scale,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

const heroImage = "/manus-storage/lucky-cfo-hero_67a18428.jpg";
const systemImage = "/manus-storage/lucky-cfo-system_cbcd4b3e.jpg";
const logoMark = "/manus-storage/lucky-cfo-mark_8b5d859e.png";

const services = [
  {
    number: "01",
    title: "Board-ready close & reporting",
    copy: "A close that produces trusted management truth—not just an earlier calendar date.",
    icon: Layers3,
  },
  {
    number: "02",
    title: "Cash & forecast confidence",
    copy: "Clear drivers, credible scenarios, and weekly visibility before cash becomes the headline.",
    icon: Landmark,
  },
  {
    number: "03",
    title: "Fractional CFO leadership",
    copy: "CFO-level judgment, operating cadence, and finance-team leadership without a full-time hire.",
    icon: Briefcase,
  },
  {
    number: "04",
    title: "Capital & financing readiness",
    copy: "Internal analysis and decision support so management can evaluate capital options from a position of clarity.",
    icon: Scale,
  },
  {
    number: "05",
    title: "M&A readiness, diligence & integration",
    copy: "Finance workstreams, credible forecasts, evidence ownership, and Day-1 planning before a transaction exposes friction.",
    icon: ShieldCheck,
  },
];

const signals = [
  "The business is growing, but finance still reports the past more clearly than it predicts the future.",
  "Cash becomes visible only after it becomes urgent.",
  "The board asks for more detail because the management story is not decision-ready.",
  "Capital or a transaction is on the horizon without a finance readiness plan.",
];

const fitProfiles = [
  "A CEO needs a CFO-grade view but is not ready for a full-time executive hire.",
  "A controller or bookkeeper is carrying too much of the finance operating load.",
  "A board, lender, or transaction process is raising the standard for financial clarity.",
  "A growing or sponsor-backed company needs a reporting reset, finance roadmap, or senior operating partner.",
];

function BrandMark() {
  return (
    <img className="brand-mark" src={logoMark} alt="" aria-hidden="true" />
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormStatus("idle");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Unable to send inquiry");
      form.reset();
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signal-site">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Lucky CFO Advisory home">
          <BrandMark />
          <span>
            <strong>Lucky CFO</strong>
            <em>Advisory</em>
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <nav className={`nav-links ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          <a href="#readiness" onClick={() => setMenuOpen(false)}>Readiness check</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>How I help</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>Start here</a>
          <a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>
            Book a CFO call <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Fractional CFO + finance-readiness advisory</p>
            <h1 id="hero-title">Be ready when the opportunity <i>shows up.</i></h1>
            <p className="hero-intro">
              Lucky CFO Advisory gives CEOs, boards, and operators senior CFO judgment to turn finance into a decision advantage—before growth, financing, or a transaction puts it under the microscope.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">
                Book a 25-minute CFO Readiness Call <ArrowRight size={17} />
              </a>
              <a className="text-link" href="#readiness">
                Take the 3-question readiness check <ChevronRight size={16} />
              </a>
            </div>
            <div className="hero-proof" aria-label="Practice credentials">
              <div><strong>25</strong><span>years in CFO roles</span></div>
              <div><strong>01</strong><span>senior advisor, directly engaged</span></div>
              <div><strong>0</strong><span>generic finance templates</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <img src={heroImage} alt="Abstract evergreen and gold path toward a prepared opportunity" />
            <div className="hero-visual-caption">
              <span>Prepare</span><span>Decide</span><span>Move</span>
            </div>
          </div>
        </section>

        <section className="marquee-strip" aria-label="Core advisory focus">
          <div className="marquee-content">
            <span>Growth</span><b>·</b><span>Cash</span><b>·</b><span>Board confidence</span><b>·</b><span>Capital</span><b>·</b><span>Transaction readiness</span>
          </div>
        </section>

        <section className="section-shell readiness-section" id="readiness" aria-labelledby="readiness-title">
          <div className="readiness-copy">
            <p className="eyebrow"><span /> A better first conversation</p>
            <h2 id="readiness-title">How prepared is your finance function for the next break?</h2>
            <p>Before a call, pressure-test the few questions that determine whether management can move with confidence instead of scrambling for answers.</p>
          </div>
          <div className="readiness-card">
            <span className="card-kicker">The CFO Readiness Check</span>
            <ol>
              <li><span>01</span><p>Can management explain the current month through the three drivers that matter most?</p></li>
              <li><span>02</span><p>Can the team see a credible 13-week cash view—and the assumptions behind it?</p></li>
              <li><span>03</span><p>Could you put a lender, buyer, or board-quality finance package together in ten business days?</p></li>
            </ol>
            <a className="button button-primary" href="#contact">If one is a no, book the call <ArrowRight size={17} /></a>
          </div>
        </section>

        <section className="section-shell signal-section" aria-labelledby="signals-title">
          <div className="section-label"><span>01</span><p>The opportunity gap</p></div>
          <div className="signal-layout">
            <div>
              <h2 id="signals-title">When readiness is missing, every good break gets <i>more expensive.</i></h2>
              <p className="section-lead">The issue is rarely effort. It is a finance operating system that does not make ownership, uncertainty, and trade-offs visible before the next consequential decision.</p>
            </div>
            <ul className="signal-list">
              {signals.map((signal, index) => (
                <li key={signal}><span>0{index + 1}</span><p>{signal}</p><ArrowUpRight size={19} /></li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-shell perspective-section" id="perspective" aria-labelledby="perspective-title">
          <div className="system-visual-wrap">
            <img src={systemImage} alt="Abstract layered structure representing a finance operating system" />
            <div className="system-stamp"><Sparkles size={15} /><span>Prepared<br />wins</span></div>
          </div>
          <div className="perspective-copy">
            <div className="section-label"><span>02</span><p>The Lucky CFO point of view</p></div>
            <h2 id="perspective-title">Luck is a story. Readiness is an <i>operating system.</i></h2>
            <p>After 25 years in CFO roles, the pattern is clear: the valuable work happens before the board meeting, lender question, or diligence request. It lives in the cadence, controls, ownership, forecasts, and decision papers that make the business legible.</p>
            <div className="three-lens">
              <article><span>See it early</span><p>Notice the operating signals before the pressure is public.</p></article>
              <article><span>Fix the system</span><p>Build the cadence, controls, and accountability to move faster.</p></article>
              <article><span>Move with confidence</span><p>Give leadership and the board a decision they can stand behind.</p></article>
            </div>
          </div>
        </section>

        <section className="section-shell services-section" id="services" aria-labelledby="services-title">
          <div className="services-heading">
            <div className="section-label"><span>03</span><p>Where Lucky CFO helps</p></div>
            <h2 id="services-title">Bring in senior CFO judgment where the stakes are rising.</h2>
            <p>Each engagement starts with the business decision ahead, then defines the finance work needed to make that decision credible.</p>
          </div>
          <div className="service-stack">
            {services.map(({ number, title, copy, icon: Icon }) => (
              <article className="service-card" key={title}>
                <div className="service-index">{number}</div>
                <Icon className="service-icon" size={27} strokeWidth={1.5} />
                <h3>{title}</h3>
                <p>{copy}</p>
                <a href="#contact" aria-label={`Discuss ${title}`}>Discuss this need <ArrowRight size={16} /></a>
              </article>
            ))}
          </div>
          <p className="boundary-note"><ShieldCheck size={16} /> Advisory and readiness work only. No capital placement, buyer sourcing, transaction execution, broker-dealer, legal, tax, or attest services.</p>
        </section>

        <section className="section-shell process-section" id="process" aria-labelledby="process-title">
          <div className="process-intro">
            <div className="section-label"><span>04</span><p>How to start</p></div>
            <h2 id="process-title">Book a CFO Readiness Call. Leave with a better <i>next move.</i></h2>
            <p>There is no generic discovery call. The first conversation identifies the decision, the friction, and whether senior CFO involvement can create material traction.</p>
            <a className="button button-quiet" href="#contact">Book the CFO Readiness Call <ArrowRight size={17} /></a>
          </div>
          <ol className="process-steps">
            <li><span>01</span><div><h3>CFO Readiness Call</h3><p>A confidential 25-minute outside perspective on the first questions worth testing.</p></div><CalendarDays size={22} /></li>
            <li><span>02</span><div><h3>Focused diagnostic</h3><p>Review the close, reporting, forecast, cash, controls, and finance operating cadence.</p></div><MessagesSquare size={22} /></li>
            <li><span>03</span><div><h3>Prioritized roadmap</h3><p>Convert observed friction into a clear 90-day sequence, decision map, and service recommendation.</p></div><Check size={22} /></li>
            <li><span>04</span><div><h3>Advisory execution</h3><p>Support the team through a defined upgrade, fractional-CFO mandate, or readiness sprint.</p></div><ArrowUpRight size={22} /></li>
          </ol>
        </section>

        <section className="section-shell fit-section" aria-labelledby="fit-title">
          <div className="fit-panel">
            <div className="fit-copy">
              <div className="section-label"><span>05</span><p>Best fit</p></div>
              <h2 id="fit-title">Growth, cash, capital, transaction—get CFO help <i>before</i> the pressure does.</h2>
              <p>The right clients are not looking for more finance activity. They are preparing for a consequential operating, board, lending, growth, or transaction moment.</p>
            </div>
            <ul>
              {fitProfiles.map((profile) => <li key={profile}><Check size={17} /><span>{profile}</span></li>)}
            </ul>
          </div>
        </section>

        <section className="section-shell field-notes" aria-labelledby="notes-title">
          <div className="notes-copy">
            <p className="eyebrow"><span /> The Lucky CFO Brief</p>
            <h2 id="notes-title">Practical finance insights for the week before the hard question.</h2>
            <p>Follow the point of view through practical LinkedIn posts and concise video notes on close quality, board confidence, forecast credibility, cash, and deal readiness.</p>
            <a href="#contact" className="text-link">Ask for the first CFO Brief <ChevronRight size={16} /></a>
          </div>
          <div className="video-card">
            <div className="video-top"><span>CFO Brief / 01</span><PlayCircle size={22} /></div>
            <blockquote>“Prepared beats lucky when the board asks the hard question.”</blockquote>
            <div className="video-meta"><span>Fast close or trusted close?</span><ArrowUpRight size={17} /></div>
          </div>
        </section>

        <section className="section-shell contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-intro">
            <p className="eyebrow"><span /> Private by design</p>
            <h2 id="contact-title">Make your next move a prepared one.</h2>
            <p>Bring the operating context, not confidential deal material. The CFO Readiness Call is a focused 25 minutes to clarify the decision ahead, the finance pressure point, and whether an outside CFO perspective can help.</p>
            <div className="contact-assurances"><span><LockKeyhole size={16} /> No confidential deal details requested</span><span><ShieldCheck size={16} /> No placement or finder activity</span></div>
          </div>
          <form className="inquiry-form" onSubmit={handleInquiry}>
            <div className="form-grid">
              <label>Full name<input name="name" autoComplete="name" required placeholder="Your name" /></label>
              <label>Work email<input name="email" type="email" autoComplete="email" required placeholder="you@company.com" /></label>
              <label>Company<input name="company" autoComplete="organization" required placeholder="Company name" /></label>
              <label>Role<input name="role" autoComplete="organization-title" placeholder="CEO, board member, CFO…" /></label>
            </div>
            <label>What needs to be ready?
              <select name="topic" required defaultValue="">
                <option value="" disabled>Select the most relevant moment</option>
                <option value="Close & reporting">Close & reporting</option>
                <option value="Forecasting & cash">Forecasting & cash</option>
                <option value="Fractional CFO leadership">Fractional CFO leadership</option>
                <option value="Financing readiness">Financing readiness</option>
                <option value="M&A / diligence / integration readiness">M&A / diligence / integration readiness</option>
                <option value="Other finance operating need">Other finance operating need</option>
              </select>
            </label>
            <label>Brief context <small>Please do not include confidential deal information.</small><textarea name="message" rows={4} maxLength={800} placeholder="What opportunity, pressure point, or finance moment is approaching?" /></label>
            <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
            <button className="button button-primary form-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending request…" : "Book the CFO Readiness Call"} <Send size={16} />
            </button>
            <div className="form-message-region" role="status" aria-live="polite">
              {formStatus === "success" && <p className="form-message success">Thank you. Your request has been received; we will follow up to coordinate a focused CFO Readiness Call.</p>}
              {formStatus === "error" && <p className="form-message error">The request did not go through, so your details were not submitted. Please try again in a moment.</p>}
            </div>
          </form>
        </section>
      </main>

      <footer className="site-footer section-shell">
        <div className="footer-brand"><BrandMark /><span><strong>Lucky CFO</strong> Advisory</span></div>
        <p>Prepared finance for consequential moments.</p>
        <p className="footer-boundary">Advisory only. No legal, tax, attest, broker-dealer, placement-agent, or investment-adviser services.</p>
        <p className="copyright">© {new Date().getFullYear()} Lucky CFO Advisory</p>
      </footer>
    </div>
  );
}
