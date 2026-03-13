import Navbar from '@/components/Navbar'
import BookingFlow from '@/components/BookingFlow'
import ServicesSection from '@/components/ServicesSection'
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />

        <div className="hero__inner">
          <div className="hero__badge animate-fadeup">
            <span className="hero__badge-dot" />
            Accepting New Projects
          </div>

          <h1 className="hero__title animate-fadeup-2">
            Let's build something<br />
            <em>remarkable.</em>
          </h1>

          <p className="hero__sub animate-fadeup-3">
            From brand identity to full-stack SaaS — tell us what you need and we'll bring it to life, beautifully and on time.
          </p>

          <div className="hero__actions animate-fadeup-4">
            <a href="#booking" className="btn btn--primary">
              Start Your Project
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <div className="hero__avatars">
              <div className="hero__avatar-stack">
                <Image src="/zolasim.png" alt="Client 1" width={20} height={30} />
                <Image src="/v2.jpeg" alt="Client 2" width={40} height={45} />
                <Image src="/logoacm.png" alt="Client 3" width={40} height={40} />
              </div>
              50+ happy clients
            </div>
          </div>

          <div className="hero__stats animate-fadeup-4">
            <div>
              <span className="hero__stat-num">50+</span>
              <span className="hero__stat-label">Projects Delivered</span>
            </div>
            <div>
              <span className="hero__stat-num">24h</span>
              <span className="hero__stat-label">Response Time</span>
            </div>
            <div>
              <span className="hero__stat-num">5★</span>
              <span className="hero__stat-label">Average Rating</span>
            </div>
          </div>
        </div>
      </section>


      <section className="section section--alt">
        <div className="container--medium">
          <div className="services-header">
            <div>
              <span className="section__kicker">What we do</span>
              <h2 className="section__title">Studio <em>Services</em></h2>
            </div>
            <p className="section__sub">
              Each service is priced transparently. Select what you need in the booking form below.
            </p>
          </div>
 
          <ServicesSection />
        </div>
      </section>

      {/* ── SAAS SECTION ─────────────────────────────────────────── */}
      <section className="section">
        <div className="container--medium">
          <div className="saas-block">
            <div className="saas-block__orb saas-block__orb--1" />
            <div className="saas-block__orb saas-block__orb--2" />

            <div className="saas-block__inner">
              <div>
                <div className="saas-block__badge">SaaS Platform Development</div>
                <h2 className="saas-block__title">
                  Build your SaaS<br />
                  <em>from zero.</em>
                </h2>
                <p className="saas-block__desc">
                  Full-stack SaaS product development — auth, billing, dashboards, APIs, multi-tenancy. We've shipped products used by thousands of users. We know what it takes.
                </p>
                <div className="saas-features">
                  {['Auth & Roles', 'Stripe Billing', 'Admin Dashboard', 'REST / GraphQL',
                    'Email Automation', 'Multi-tenancy', 'Mobile App', 'AI Integration'
                  ].map(f => (
                    <div key={f} className="saas-feature">{f}</div>
                  ))}
                </div>
              </div>

              <div className="saas-block__cards">
                <div className="saas-card">
                  <span className="saas-card__label">Starting From</span>
                  <span className="saas-card__value">₹2,00,000</span>
                  <span className="saas-card__sub">Custom scoping available</span>
                </div>
                <div className="saas-card">
                  <span className="saas-card__label">Typical Timeline</span>
                  <span className="saas-card__value">3–6 Months</span>
                  <span className="saas-card__sub">MVP deliverable in 6–8 weeks</span>
                </div>
                <a href="#booking" className="btn btn--primary btn--full">
                  Book a Discovery Call
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────── */}
      <section className="section section--alt">
        <div className="container--medium">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="section__kicker">How it works</span>
            <h2 className="section__title">Simple <em>onboarding</em></h2>
          </div>
          <div className="process-grid">
            {[
              { n: '01', t: 'Book', d: 'Fill out this form with your project details and upload any reference files in under 5 minutes.' },
              { n: '02', t: 'Review', d: 'Our team reviews your brief and sends a detailed proposal within 24 hours.' },
              { n: '03', t: 'Kick-off', d: 'We align on scope, timeline, and deliverables in a short discovery call.' },
              { n: '04', t: 'Build', d: 'We execute with weekly check-ins. You\'re in the loop every step of the way.' },
            ].map(s => (
              <div key={s.n} className="process-card">
                <span className="process-card__num">{s.n}</span>
                <div className="process-card__title">{s.t}</div>
                <p className="process-card__desc">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING FORM ─────────────────────────────────────────── */}
      <section id="booking" className="section">
        <div className="container--narrow">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="section__kickerr">Book a service</span>
            <h2 className="section__titlle">
              Tell us about<br /><em>your project.</em>
            </h2>
            <p className="section__subb" style={{ margin: '12px auto 0', textAlign: 'center' }}>
              Fill in your details below — we'll come back to you within 24 hours.
            </p>
          </div>
          <BookingFlow />
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer className="footer">
        <div className="footer__inner">

          <div className="footer__rule" />

          {/* 4-column grid */}
          <div className="footer__grid">
            
            {/* Col 1 – Brand */}
            <div className="footer__brand">
              <img src="/logo.png" alt="Monakin" className="footer__logo-img" />
              <p className="footer__tagline">
                We design, build, and scale digital products — from brand identity to full-stack SaaS. Based in India, working globally.
              </p>
              <div className="footer__socials">
                <a href="https://instagram.com/monakin.in" target="_blank" rel="noreferrer" className="footer__social">IG</a>
                <a href="https://linkedin.com/company/monakin" target="_blank" rel="noreferrer" className="footer__social">LI</a>
                <a href="https://x.com/monakin_in" target="_blank" rel="noreferrer" className="footer__social">X</a>
                <a href="https://behance.net/monakin" target="_blank" rel="noreferrer" className="footer__social">Be</a>
              </div>
            </div>

            {/* Col 2 – Services */}
            <div className='service-box'>
              <p className="footer__col-title">Services</p>
              <ul className="footer__links">
                {['Web & App Development', 'Ecommerce', 'SaaS Platform'].map(s => (
                  <li key={s}><a href="#booking" className="footer__link">{s}</a></li>
                ))}
              </ul>
            </div>

            {/* Col 3 – Company */}
            <div className='service-legal'>
              <p className="footer__col-title">Legal Notices</p>
              <ul className="footer__links">
                {[
                  { label: 'Privacy Policy', href: '#' },
                  { label: 'Terms of Service', href: '#' },
                ].map(l => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="footer__link"
                      target={l.href.startsWith('http') ? '_blank' : undefined}
                      rel={l.href.startsWith('http') ? 'noreferrer' : undefined}
                    >{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 – Explore */}
            <div>
              <p className="footer__col-title">Explore Monakin</p>
              <div className="footer__explore">
                {[
                  { name: 'monakin.in', desc: 'Main website · Work · About', href: 'https://monakin.in' },
                  { name: 'studio.monakin.in', desc: 'Portfolio · Case studies', href: 'https://studio.monakin.in' },
                  { name: '@monakin.in', desc: 'Instagram · Updates', href: 'https://instagram.com/monakin.in' },
                ].map(c => (
                  <a key={c.name} href={c.href} target="_blank" rel="noreferrer" className="footer__explore-card">
                    <span className="footer__explore-name">{c.name}</span>
                    <span className="footer__explore-desc">{c.desc}</span>
                  </a>
                ))}
              </div>
              <div className="footer__pills">
                <a href="tel:+919999999999" className="footer__pill">Call Us</a>
                <a href="mailto:sayhello@monakin.in" className="footer__pill footer__pill--blue">Mail Us</a>
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="footer__bottom">
            <span className="footer__copy">© 2025 Monakin Services Pvt. Ltd · All rights reserved</span>
            <div className="footer__bottom-right">
              <span className="footer__bottom-dot" />
              <span className="footer__bottom-status">All systems operational</span>
            </div>
          </div>

        </div>
      </footer>
    </main>
  )
}