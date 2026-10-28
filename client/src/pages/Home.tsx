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

const heroImage = "/manus-storage/lucky-cfo-hero-readiness_39fb4f3d.jpg";
const diagnosticImage = "/manus-storage/lucky-cfo-diagnostic-system_ef0badb0.jpg";
const logoMark = "/manus-storage/lucky-cfo-mark_8b5d859e.png";
const markPortrait = "/manus-storage/mark-lucky-law-office-headshot_3e392a80.jpg";
const readinessVideo = "/manus-storage/lucky-cfo-readiness-video_64d167bd.mp4";
const readinessVideoPoster = "/manus-storage/lucky-cfo-readiness-video-poster_a7cf822b.jpg";
const calendlyUrl = "https://calendly.com/mark-luckycfoadvisory";

const readinessQuestions = [
  "Can you explain last month’s results through the three drivers that matter most—in plain English?",
  "Do you know, within a few thousand dollars, what your bank balance will be eight weeks from now?",
  "Could you hand a lender, buyer, auditor, or board a clean finance package in ten business days?",
];

const buyerProfiles = [
  {
    eyebrow: "The CEO",
    title: "Needs CFO judgment, not a premature full-time hire.",
    copy: "You have outgrown a bookkeeper or controller, but a permanent executive hire is not the first answer. You need senior judgment at the moment that will shape the year.",
  },
  {
    eyebrow: "The finance leader",
    title: "Needs an experienced second set of hands.",
    copy: "A filing deadline, audit, financing process, transaction, or departure has the team underwater. You need someone who has been through the hard part and can start with the real question.",
  },
  {
    eyebrow: "The board",
    title: "Wants numbers it can rely on.",
    copy: "Directors and audit committees need reporting, controls, forecasts, and a management narrative that hold up when the questions get harder.",
  },
];

const services = [
  {
    number: "01",
    title: "SEC reporting & audit readiness",
    headline: "Filings done right and on time.",
    points: ["10-K, 10-Q, and 8-K preparation and review", "Audit coordination and auditor relationships", "Internal controls and SOX-readiness support", "Audit-committee materials"],
    icon: Layers3,
  },
  {
    number: "02",
    title: "Fractional CFO",
    headline: "A CFO for the hours and decisions that matter.",
    points: ["Forecasting and a rolling 13-week cash view", "KPIs and monthly management reporting", "Board packages and decision support", "Finance-team leadership"],
    icon: Landmark,
  },
  {
    number: "03",
    title: "Interim CFO",
    headline: "Coverage when it cannot wait.",
    points: ["CFO transition support", "Close, team, and auditor stabilization", "Clear operating cadence", "Support for a permanent-CFO search"],
    icon: Briefcase,
  },
  {
    number: "04",
    title: "Financing & transaction readiness",
    headline: "Numbers that stand up to questions.",
    points: ["Diligence-ready financial materials", "Internal decision-support models", "Finance workstreams for diligence", "Day-1 integration planning"],
    icon: Scale,
  },
  {
    number: "05",
    title: "Board reporting",
    headline: "One page of clarity instead of thirty slides of theater.",
    points: ["Cash runway and plan-versus-actual", "Decision-ready management narrative", "Board and committee materials", "The questions that should be answered early"],
    icon: MessagesSquare,
  },
  {
    number: "06",
    title: "Close & finance operations",
    headline: "A monthly close your numbers can stand on.",
    points: ["Faster, cleaner month-end", "Reconciliations and reporting you can trust", "Clear ownership and controls", "Support for your controller or bookkeeper"],
    icon: ShieldCheck,
  },
];

const processSteps = [
  {
    number: "01",
    title: "25-minute readiness call",
    copy: "A confidential conversation about the event ahead and the finance question that worries you most.",
    icon: CalendarDays,
  },
  {
    number: "02",
    title: "Fixed-fee Finance Diagnostic",
    copy: "A focused review of the close, reporting, cash forecast, controls, finance capacity, and readiness risk.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "90-day plan",
    copy: "A plain-English action plan: what to fix, in what order, and who should own the work.",
    icon: Check,
  },
  {
    number: "04",
    title: "Hands-on support",
    copy: "Fractional, interim, or project-based support scoped to the plan for as long as it is useful.",
    icon: ArrowUpRight,
  },
];

const briefCards = [
  { type: "Post", title: "Profitable companies go broke all the time", copy: "Why a 13-week cash forecast is the first thing I build." },
  { type: "Post", title: "You need about eight hours of a CFO", copy: "Buy the judgment. Skip the chair." },
  { type: "Carousel", title: "7 places deals quietly die in diligence", copy: "And how to find them before a buyer’s accountant does." },
];

const faqItems = [
  { question: "What happens after the readiness call?", answer: "If there is a fit, I will recommend the smallest next step that can create clarity—often a fixed-fee Finance Diagnostic. If there is not a fit, you will leave with a clearer view of the finance question to solve." },
  { question: "What does the Fixed-fee Finance Diagnostic produce?", answer: "A focused finance-readiness view and a prioritized 90-day action plan covering reporting, close, cash, controls, finance-team capacity, and the evidence needed for the next decision." },
  { question: "Can I share a confidential transaction or financing process?", answer: "Start with the operating context, not confidential deal material. We can decide together whether a formal engagement and appropriate confidentiality framework are needed before reviewing sensitive information." },
  { question: "Do you place capital, source buyers, or execute transactions?", answer: "No. Lucky CFO Advisory provides internal finance readiness, diligence-support, planning, and decision-support work. It does not provide capital placement, buyer sourcing, transaction execution, broker-dealer, legal, tax, attest, or investment-adviser services." },
];

function BrandMark() {
  return <img className="brand-mark" src={logoMark} alt="" aria-hidden="true" />;
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

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="lucky-site">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Lucky CFO Advisory home" onClick={closeMenu}>
          <BrandMark />
          <span><strong>Lucky CFO</strong><em>Advisory</em></span>
        </a>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={`nav-links ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#about" onClick={closeMenu}>About Mark</a>
          <a href="#readiness" onClick={closeMenu}>Readiness check</a>
          <a className="nav-cta" href={calendlyUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>Book a call <CalendarDays size={15} /></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="section-frame hero-layout">
            <div className="hero-copy">
              <p className="eyebrow"><span /> Fractional · interim · public-company CFO</p>
              <h1>Make the next<br />decision <i>easier to defend.</i></h1>
              <p className="hero-lead">Public-company CFO experience for small- and mid-cap companies, without the full-time CFO.</p>
              <p className="hero-body">I’m Mark Lucky. I bring senior finance leadership to the work that gets examined first: SEC filings, auditors, boards, cash, financing decisions, and transactions. Now I do that work for a limited number of companies at a time.</p>
              <div className="hero-actions">
                <a className="button button-primary" href={calendlyUrl} target="_blank" rel="noreferrer">Book a 25-minute call <CalendarDays size={17} /></a>
                <a className="text-link" href="#readiness">See the 3 questions lenders and boards ask <ChevronRight size={16} /></a>
              </div>
              <dl className="credential-strip" aria-label="Practice credentials">
                <div><dt>25+</dt><dd>years in senior finance leadership</dd></div>
                <div><dt>Public-company</dt><dd>CFO perspective, directly engaged</dd></div>
                <div><dt>SEC · audit · board</dt><dd>Experience for consequential moments</dd></div>
              </dl>
            </div>
            <div className="hero-visual">
              <img src={heroImage} alt="Executive boardroom prepared for a consequential finance decision" />
              <div className="founder-portrait-card">
                <img src={markPortrait} alt="Mark Lucky, founder of Lucky CFO Advisory" />
                <div><span>Mark Lucky</span><strong>Founder · Public-company CFO</strong></div>
              </div>
              <div className="hero-caption"><span>Prepare</span><span>Decide</span><span>Move</span></div>
            </div>
          </div>
        </section>

        <section className="video-section" aria-labelledby="video-title">
          <div className="section-frame video-layout">
            <div className="video-copy">
              <p className="eyebrow"><span /> Watch: CFO Readiness</p>
              <h2 id="video-title">The work behind <i>better-prepared decisions.</i></h2>
              <p>Mark Lucky explains how senior CFO leadership helps small- and mid-cap companies prepare their numbers, cash position, and finance story before a lender, buyer, auditor, or board asks the hard question.</p>
              <a className="button button-primary" href={calendlyUrl} target="_blank" rel="noreferrer">Book a 25-minute call <CalendarDays size={17} /></a>
            </div>
            <div className="video-frame">
              <video controls playsInline preload="metadata" poster={readinessVideoPoster} aria-describedby="video-note">
                <source src={readinessVideo} type="video/mp4" />
                Your browser does not support embedded video. Please use the contact form to request a CFO Readiness Call.
              </video>
              <p className="video-note" id="video-note">1 minute 36 seconds · Captions included · Audio on</p>
            </div>
          </div>
        </section>

        <section className="readiness-section" id="readiness" aria-labelledby="readiness-title">
          <div className="section-frame">
            <div className="section-heading centered-heading">
              <p className="eyebrow"><span /> The 3-question readiness check</p>
              <h2 id="readiness-title">Could your numbers survive hard questions this week?</h2>
              <p>An audit, a financing process, a buyer, or a board will eventually test your finance function. These three questions show whether it is ready.</p>
            </div>
            <ol className="question-grid">
              {readinessQuestions.map((question, index) => <li key={question}><span>0{index + 1}</span><p>{question}</p></li>)}
            </ol>
            <div className="readiness-close"><p>If any answer is “no” or “not sure,” that is the conversation to have before someone else asks.</p><a href={calendlyUrl} target="_blank" rel="noreferrer" className="inline-cta">Book the readiness call <ArrowRight size={16} /></a></div>
          </div>
        </section>

        <section className="why-now-section" aria-labelledby="why-now-title">
          <div className="section-frame why-now-layout">
            <div>
              <p className="eyebrow"><span /> Why now</p>
              <h2 id="why-now-title">The event is rarely the problem. The preparation gap is.</h2>
            </div>
            <div className="why-now-copy">
              <p>A filing, audit, lender request, board meeting, acquisition, or CFO departure exposes the same gaps: unreliable close, unclear cash, scattered evidence, and no CFO-level owner for the narrative.</p>
              <div className="event-chips"><span>Filing or audit</span><span>Financing or lender process</span><span>Transaction or board pressure</span></div>
            </div>
          </div>
        </section>

        <section className="buyer-section" aria-labelledby="buyers-title">
          <div className="section-frame">
            <div className="section-heading light-heading"><p className="eyebrow"><span /> Who hires me</p><h2 id="buyers-title">I’m usually brought in by <i>one of three people.</i></h2></div>
            <div className="buyer-grid">
              {buyerProfiles.map((profile) => <article className="buyer-card" key={profile.eyebrow}><p className="card-eyebrow">{profile.eyebrow}</p><h3>{profile.title}</h3><p>{profile.copy}</p></article>)}
            </div>
            <p className="section-footnote">For public and private small- and mid-cap companies facing a consequential finance moment.</p>
          </div>
        </section>

        <section className="services-section" id="services" aria-labelledby="services-title">
          <div className="section-frame">
            <div className="section-heading service-heading"><p className="eyebrow"><span /> Services</p><h2 id="services-title">Senior finance work, <i>in plain English.</i></h2><p>Every engagement starts with the event ahead of you—then works back to what your numbers, controls, and story need to look like.</p></div>
            <div className="services-grid">
              {services.map(({ number, title, headline, points, icon: Icon }) => <article className="service-card" key={title}><div className="service-top"><span>{number}</span><Icon size={23} strokeWidth={1.5} /></div><h3>{title}</h3><p className="service-headline">{headline}</p><ul>{points.map((point) => <li key={point}><Check size={14} />{point}</li>)}</ul><a href="#contact">Discuss this need <ArrowRight size={15} /></a></article>)}
            </div>
            <p className="boundary-note"><ShieldCheck size={17} /> Internal finance advisory and readiness work only. No capital placement, buyer sourcing, transaction execution, broker-dealer, legal, tax, attest, or investment-adviser services.</p>
          </div>
        </section>

        <section className="diagnostic-section" aria-labelledby="diagnostic-title">
          <div className="section-frame diagnostic-layout">
            <div className="diagnostic-visual"><img src={diagnosticImage} alt="Ordered finance materials connected by a gold thread, representing a clear decision path" loading="lazy" /><span>Clarity before the event</span></div>
            <div className="diagnostic-copy">
              <p className="eyebrow"><span /> The first paid step</p>
              <h2 id="diagnostic-title">A Fixed-fee Finance Diagnostic makes the next move <i>clearer.</i></h2>
              <p>For companies approaching a filing, audit, financing process, transaction, board-pressure point, or CFO transition, the diagnostic identifies the finance work worth doing first.</p>
              <ul className="diagnostic-list"><li><Check size={17} />Close, reporting, cash forecast, controls, and capacity</li><li><Check size={17} />Readiness risks and the evidence needed for the next decision</li><li><Check size={17} />A prioritized 90-day action plan with clear ownership</li></ul>
              <p className="diagnostic-note">Fixed fee and defined scope after the readiness call. No generic assessment theater.</p>
              <a className="button button-primary" href={calendlyUrl} target="_blank" rel="noreferrer">Book the readiness call <CalendarDays size={17} /></a>
            </div>
          </div>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-title">
          <div className="section-frame about-layout">
            <div className="about-side">
              <figure className="about-portrait">
                <img src={markPortrait} alt="Mark Lucky in a law-office setting" loading="lazy" />
                <figcaption><strong>Mark Lucky</strong><span>Founder, Lucky CFO Advisory</span></figcaption>
              </figure>
              <blockquote>“You don’t lose a raise in the pitch. You lose it two weeks later, in diligence.”</blockquote>
            </div>
            <div className="about-copy">
              <p className="eyebrow"><span /> About Mark</p>
              <h2 id="about-title">CFO-level discipline for the work that needs to <i>hold up.</i></h2>
              <p>Mark Lucky has spent more than 25 years in senior finance leadership, including public-company CFO roles involving SEC reporting, audit leadership, boards, cash, financing, acquisitions, and restructurings. Lucky CFO Advisory gives smaller companies access to that discipline without the cost of a full-time executive.</p>
              <div className="results-placeholder" aria-label="Placeholder for verified selected results"><span>Selected results — placeholders for verified outcomes</span><ul><li>Verified financing outcome to be added</li><li>Verified reporting or audit outcome to be added</li><li>Verified transaction or integration outcome to be added</li></ul></div>
              <p className="location-note">Working with clients nationwide.</p>
            </div>
          </div>
        </section>

        <section className="process-section" aria-labelledby="process-title">
          <div className="section-frame">
            <div className="section-heading process-heading"><p className="eyebrow"><span /> How to start</p><h2 id="process-title">One request. <i>A clear next step.</i></h2><p>No sales pitch. The first conversation identifies what is coming at you, where the numbers are weakest, and whether I am the right person to help.</p></div>
            <ol className="process-grid">{processSteps.map(({ number, title, copy, icon: Icon }) => <li key={title}><span>{number}</span><Icon size={24} strokeWidth={1.45} /><h3>{title}</h3><p>{copy}</p></li>)}</ol>
          </div>
        </section>

        <section className="brief-section" aria-labelledby="brief-title">
          <div className="section-frame">
            <div className="section-heading brief-heading"><p className="eyebrow"><span /> From the CFO chair</p><h2 id="brief-title">Practical finance, <i>every week.</i></h2><p>Short LinkedIn posts and video notes on cash, board reporting, SEC filings, and deal readiness—the things that come up the week before the hard question.</p></div>
            <div className="brief-grid">{briefCards.map((card) => <article className="brief-card" key={card.title}><div><span>{card.type}</span><PlayCircle size={20} /></div><h3>{card.title}</h3><p>{card.copy}</p></article>)}</div>
            <div className="linkedin-placeholder"><span>LinkedIn profile link placeholder</span><p>Add Mark’s verified personal LinkedIn URL before launch.</p></div>
          </div>
        </section>

        <section className="faq-section" aria-labelledby="faq-title">
          <div className="section-frame faq-layout"><div className="faq-intro"><p className="eyebrow"><span /> Before you reach out</p><h2 id="faq-title">The practical questions, answered.</h2><p>Start with what is approaching—not confidential deal material.</p></div><div className="faq-list">{faqItems.map((item) => <details key={item.question}><summary>{item.question}<ChevronRight size={19} /></summary><p>{item.answer}</p></details>)}</div></div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="section-frame contact-layout">
            <div className="contact-copy"><p className="eyebrow"><span /> Request a call</p><h2 id="contact-title">Facing a filing, a raise, an audit, or a board that wants <i>real numbers?</i></h2><p>Choose a time for a confidential 25-minute CFO Readiness Call, or use the brief form if you would rather share context first.</p><div className="schedule-card"><CalendarDays size={27} aria-hidden="true" /><div><strong>Choose a time that works for you.</strong><p>No back-and-forth. No confidential deal details required.</p><a className="button button-primary" href={calendlyUrl} target="_blank" rel="noreferrer">Open the calendar <ArrowUpRight size={17} /></a></div></div><div className="contact-details"><a href="mailto:mark@midatlanticcfo.com">mark@midatlanticcfo.com</a><span>Working with clients nationwide</span></div><div className="contact-assurances"><span><LockKeyhole size={17} /> No confidential deal details requested</span><span><ShieldCheck size={17} /> No placement or finder activity</span></div></div>
            <form className="inquiry-form" onSubmit={handleInquiry}>
              <p className="form-intro">Prefer to start in writing? Share a little non-confidential context.</p>
              <div className="form-grid"><label>Full name<input name="name" autoComplete="name" required placeholder="Your name" /></label><label>Work email<input name="email" type="email" autoComplete="email" required placeholder="you@company.com" /></label><label>Company<input name="company" autoComplete="organization" required placeholder="Company name" /></label><label>Role<input name="role" autoComplete="organization-title" placeholder="CEO, CFO, board member…" /></label><label className="phone-field">Phone number <small>Optional</small><input name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={40} placeholder="(555) 123-4567" /></label></div>
              <label>What is coming up?<select name="topic" required defaultValue=""><option value="" disabled>Select the most relevant event</option><option value="SEC filing or audit">SEC filing or audit</option><option value="Financing or lender process">Financing or lender process</option><option value="Transaction or acquisition">Transaction or acquisition</option><option value="Board reporting or cash pressure">Board reporting or cash pressure</option><option value="Interim or fractional CFO coverage">Interim or fractional CFO coverage</option><option value="Other finance operating need">Other finance operating need</option></select></label>
              <label>Brief context <small>Please do not include confidential deal information.</small><textarea name="message" rows={4} maxLength={800} placeholder="What opportunity, pressure point, or finance moment is approaching?" /></label>
              <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
              <button className="button button-primary form-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending request…" : "Request my 25-minute call"} <Send size={16} /></button>
              <div className="form-message-region" role="status" aria-live="polite">{formStatus === "success" && <p className="form-message success">Thank you. Your request has been received; Mark will follow up to coordinate a focused CFO Readiness Call.</p>}{formStatus === "error" && <p className="form-message error">The request did not go through, so your details were not submitted. Please try again in a moment or email Mark directly.</p>}</div>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="section-frame footer-layout"><div className="footer-brand"><BrandMark /><span><strong>Lucky CFO</strong> Advisory</span></div><p>Make the next decision easier to defend.</p><p>Advisory services only. No capital placement, buyer sourcing, transaction execution, broker-dealer, legal, tax, attest, or investment-adviser services.</p><p>© {new Date().getFullYear()} Lucky CFO Advisory</p></div></footer>
    </div>
  );
}
