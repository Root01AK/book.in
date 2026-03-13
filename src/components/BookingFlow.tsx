'use client'
import { useState } from 'react'
import StepIndicator from './StepIndicator'
import FileUpload from './FileUpload'
import {
  STUDIO_SERVICES, SAAS_FEATURES, BUDGET_OPTIONS, TIMELINE_OPTIONS,
  PRIORITY_OPTIONS, SAAS_TYPES, SAAS_USER_RANGES, SOURCE_OPTIONS,
  EMPTY_FORM, type BookingFormData,
} from '@/lib/types'

export default function BookingFlow() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<BookingFormData>(EMPTY_FORM)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [refCode, setRefCode] = useState('')
  const [globalErr, setGlobalErr] = useState('')

  /* ── helpers ── */
  const set = (k: keyof BookingFormData, v: any) => {
    setForm(f => ({ ...f, [k]: v }))
    setErrors(e => { const n = { ...e }; delete n[k as string]; return n })
  }

  const toggle = (key: 'services' | 'saasFeatures', id: string) => {
    const arr = (form[key] as string[])
    set(key, arr.includes(id) ? arr.filter(x => x !== id) : [...arr, id])
  }

  /* ── validation ── */
  const validate = (s: number) => {
    const e: Record<string, string> = {}
    if (s === 1 && form.services.length === 0 && !form.isSaasProject)
      e.services = 'Please select at least one service'
    if (s === 3) {
      if (!form.projectName.trim()) e.projectName = 'Project name is required'
      if (!form.budget) e.budget = 'Please select a budget'
      if (!form.timeline) e.timeline = 'Please select a timeline'
    }
    if (s === 5) {
      if (!form.firstName.trim()) e.firstName = 'Required'
      if (!form.lastName.trim()) e.lastName = 'Required'
      if (!form.email.includes('@')) e.email = 'Valid email required'
      if (form.phone.trim().length < 7) e.phone = 'Phone required'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (!validate(step)) return

    if (step === 1 && !form.isSaasProject) {
      setStep(3) // skip SaaS step
    } else {
      setStep(s => Math.min(s + 1, 6))
    }
  }
  const back = () => {
    if (step === 3 && !form.isSaasProject) {
      setStep(1)
    } else {
      setStep(s => Math.max(s - 1, 1))
    }
  }

  const submit = async () => {
    if (!validate(5)) return
    setSubmitting(true); setGlobalErr('')
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) { setRefCode(data.refCode); setSubmitted(true) }
      else setGlobalErr(data.error || 'Something went wrong. Please try again.')
    } catch {
      setGlobalErr('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const ChevronRight = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
  const ChevronLeft = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
  const Check = () => (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="1.5,7 5,10.5 12.5,3" />
    </svg>
  )

  /* ── SUCCESS ── */
  if (submitted) return (
    <div className="booking-form-wrapper">
      <div className="success">
        <div className="success__icon">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="var(--accent)" strokeWidth="2.5">
            <polyline points="6,16 13,23 26,9" />
          </svg>
        </div>
        <h3 className="success__title">You're all booked in.</h3>
        <p className="success__msg">
          We've received your project brief. The Monakin Studio team will be in touch within <strong>24 hours</strong> with a detailed proposal.
        </p>
        <div className="success__ref">
          <span className="success__ref-label">Your Booking Reference</span>
          <span className="success__ref-code">{refCode}</span>
        </div>
        <div className="success__next">
          <span className="success__next-title">What happens next</span>
          <ul className="success__next-list">
            <li>Check your inbox for a confirmation email</li>
            <li>Our team reviews your brief within 24 hours</li>
            <li>You'll receive a detailed proposal + discovery call invite</li>
            <li>We kick off your project after alignment</li>
          </ul>
        </div>
      </div>
    </div>
  )
  const togglePriority = (value: string) => {
    const arr = form.priority
    set('priority',
      arr.includes(value)
        ? arr.filter(v => v !== value)
        : [...arr, value]
    )
  }

  const selectedNames = form.services.map(id => STUDIO_SERVICES.find(s => s.id === id)?.name).filter(Boolean)

  return (
    <div className="booking-form-wrapper">
      <div className="booking-layout">
        <StepIndicator current={step} />
        <div className="form-body">
          {globalErr && <div className="global-error">{globalErr}</div>}

          {/* ── STEP 1: SERVICES ── */}
          <div className={`form-step${step === 1 ? ' form-step--active' : ''}`}>
            <h3 className="form-step__title">Select Services</h3>
            <p className="form-step__desc">Choose one or more services. Mix and match — we handle cross-discipline projects.</p>

            <div className="service-selector">
              {STUDIO_SERVICES.map(s => {
                const sel = form.services.includes(s.id)
                return (
                  <button
                    key={s.id}
                    type="button"
                    className={`service-option${sel ? ' service-option--selected' : ''}`}
                    onClick={() => toggle('services', s.id)}
                  >
                    <div className="service-option__left">
                      <div className="service-option__check">{sel && <Check />}</div>
                      <div className="service-option__info">
                        <span className="service-option__name">{s.name}</span>
                        <span className="service-option__sub">{s.description}</span>
                      </div>
                    </div>
                  </button>
                )
              })}

              {/* SaaS toggle */}
              <button
                type="button"
                className={`service-option service-option--saas${form.isSaasProject ? ' service-option--selected' : ''}`}
                onClick={() => set('isSaasProject', !form.isSaasProject)}
              >
                <div className="service-option__left">
                  <div className="service-option__check">{form.isSaasProject && <Check />}</div>
                  <div className="service-option__info">
                    <span className="service-option__name">SaaS Platform Development</span>
                    <span className="service-option__sub">Full-stack SaaS from zero — auth, billing, dashboards & more</span>
                  </div>
                </div>
              </button>
            </div>

            {errors.services && <p className="field-error">{errors.services}</p>}

            <div className="form-nav form-nav--end">
              <button type="button" className="btn btn--primary" onClick={next}>
                Next <ChevronRight />
              </button>
            </div>
          </div>

          {/* ── STEP 2: SAAS DETAILS ── */}
          <div className={`form-step${step === 2 ? ' form-step--active' : ''}`}>
            <h3 className="form-step__title">SaaS Details</h3>
            <p className="form-step__desc">
              {form.isSaasProject
                ? 'Tell us more about your SaaS product so we can scope it accurately.'
                : "You haven't selected SaaS — fill in any relevant details or skip to the next step."}
            </p>

            <div className="field">
              <span className="field-label">Type of SaaS</span>
              <div className="choice-grid-2">
                {SAAS_TYPES.map(t => (
                  <button key={t} type="button"
                    className={`choice-btn${form.saasType === t ? ' choice-btn--selected' : ''}`}
                    onClick={() => set('saasType', t)}
                  >{t}</button>
                ))}
              </div>
            </div>

            <div className="field">
              <span className="field-label">Expected User Base</span>
              <div className="choice-grid-auto">
                {SAAS_USER_RANGES.map(r => (
                  <button key={r} type="button"
                    className={`choice-btn${form.saasUsers === r ? ' choice-btn--selected' : ''}`}
                    onClick={() => set('saasUsers', r)}
                  >{r}</button>
                ))}
              </div>
            </div>

            <div className="field">
              <span className="field-label">Key Features Needed</span>
              <div className="feature-list">
                {SAAS_FEATURES.map(f => {
                  const checked = form.saasFeatures.includes(f.id)
                  return (
                    <button key={f.id} type="button"
                      className={`feature-btn${checked ? ' feature-btn--selected' : ''}`}
                      onClick={() => toggle('saasFeatures', f.id)}
                    >
                      <div className="feature-btn__box">{checked && <Check />}</div>
                      <div className="feature-btn__info">
                        <span className="feature-btn__label">{f.label}</span>
                        <span className="feature-btn__sub">{f.description}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="form-nav">
              <button type="button" className="btn btn--secondary" onClick={back}><ChevronLeft /> Back</button>
              <button type="button" className="btn btn--primary" onClick={next}>Next <ChevronRight /></button>
            </div>
          </div>

          {/* ── STEP 3: PROJECT ── */}
          <div className={`form-step${step === 3 ? ' form-step--active' : ''}`}>
            <h3 className="form-step__title">Project Details</h3>
            <p className="form-step__desc">Help us understand your vision, budget, and timeline.</p>

            <div className="field">
              <label className="field-label" htmlFor="projectName">Project / Company Name *</label>
              <input id="projectName" className={`field-input${errors.projectName ? ' field-input--error' : ''}`}
                placeholder="e.g. Zenith Fintech, My Fashion Brand…"
                value={form.projectName} onChange={e => set('projectName', e.target.value)}
              />
              {errors.projectName && <p className="field-error">{errors.projectName}</p>}
            </div>

            <div className="field">
              <label className="field-label" htmlFor="description">Project Description </label>
              <textarea id="description" className={`field-textarea${errors.description ? ' field-input--error' : ''}`}
                placeholder="Describe your project goals, target audience, key features, and what success looks like…"
                value={form.description} onChange={e => set('description', e.target.value)}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {errors.description ? <p className="field-error">{errors.description}</p> : <span />}
                <span className={`char-count${form.description.length >= 20 ? ' char-count--ok' : ''}`}>
                  {form.description.length} / 20 min
                </span>
              </div>
            </div>

            <div className="field">
              <span className="field-label">Budget Range *</span>
              <div className="choice-grid-auto">
                {BUDGET_OPTIONS.map(b => (
                  <button key={b} type="button"
                    className={`choice-btn${form.budget === b ? ' choice-btn--selected' : ''}`}
                    onClick={() => set('budget', b)}
                  >{b}</button>
                ))}
              </div>
              {errors.budget && <p className="field-error">{errors.budget}</p>}
            </div>

            <div className="field">
              <span className="field-label">Timeline *</span>
              <div className="timeline-list">
                {TIMELINE_OPTIONS.map(t => (
                  <button key={t.value} type="button"
                    className={`timeline-btn${form.timeline === t.value ? ' timeline-btn--selected' : ''}`}
                    onClick={() => set('timeline', t.value)}
                  >
                    <span className="timeline-btn__label">{t.label}</span>
                    <span className="timeline-btn__note">{t.note}</span>
                  </button>
                ))}
              </div>
              {errors.timeline && <p className="field-error">{errors.timeline}</p>}
            </div>

            <div className="field">
              <span className="field-label">Priority</span>
              <div className="choice-grid-3">
                {PRIORITY_OPTIONS.map(p => (
                  <button key={p.value} type="button"
                    className={`choice-btn${form.priority.includes(p.value) ? ' choice-btn--selected' : ''}`}
                    onClick={() => togglePriority(p.value)}

                  >
                    <span className="choice-btn__label">{p.label}</span>
                    <span className="choice-btn__sub">{p.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-nav">
              <button type="button" className="btn btn--secondary" onClick={back}><ChevronLeft /> Back</button>
              <button type="button" className="btn btn--primary" onClick={next}>Next <ChevronRight /></button>
            </div>
          </div>

          {/* ── STEP 4: FILES ── */}
          <div className={`form-step${step === 4 ? ' form-step--active' : ''}`}>
            <h3 className="form-step__title">Project Files</h3>
            <p className="form-step__desc">
              Upload anything that helps us understand your project — brand assets, references, briefs, wireframes, or inspiration images.
            </p>
            <FileUpload onFilesUploaded={ids => set('uploadedFileIds', ids)} />
            <div className="form-nav">
              <button type="button" className="btn btn--secondary" onClick={back}><ChevronLeft /> Back</button>
              <button type="button" className="btn btn--primary" onClick={next}>Next <ChevronRight /></button>
            </div>
          </div>

          {/* ── STEP 5: CONTACT ── */}
          <div className={`form-step${step === 5 ? ' form-step--active' : ''}`}>
            <h3 className="form-step__title">Your Details</h3>
            <p className="form-step__desc">We'll send a confirmation and get in touch within 24 hours.</p>

            <div className="field-grid-2">
              <div className="field">
                <label className="field-label" htmlFor="firstName">First Name *</label>
                <input id="firstName" className={`field-input${errors.firstName ? ' field-input--error' : ''}`}
                  placeholder="Arjun" value={form.firstName} onChange={e => set('firstName', e.target.value)} />
                {errors.firstName && <p className="field-error">{errors.firstName}</p>}
              </div>
              <div className="field">
                <label className="field-label" htmlFor="lastName">Last Name *</label>
                <input id="lastName" className={`field-input${errors.lastName ? ' field-input--error' : ''}`}
                  placeholder="Sharma" value={form.lastName} onChange={e => set('lastName', e.target.value)} />
                {errors.lastName && <p className="field-error">{errors.lastName}</p>}
              </div>
            </div>

            <div className="field">
              <label className="field-label" htmlFor="email">Email Address *</label>
              <input id="email" type="email" className={`field-input${errors.email ? ' field-input--error' : ''}`}
                placeholder="arjun@company.com" value={form.email} onChange={e => set('email', e.target.value)} />
              {errors.email && <p className="field-error">{errors.email}</p>}
            </div>

            <div className="field">
              <label className="field-label" htmlFor="phone">Phone / WhatsApp *</label>
              <input id="phone" type="tel" className={`field-input${errors.phone ? ' field-input--error' : ''}`}
                placeholder="+91 98765 43210" value={form.phone} onChange={e => set('phone', e.target.value)} />
              {errors.phone && <p className="field-error">{errors.phone}</p>}
            </div>

            <div className="field">
              <label className="field-label" htmlFor="company">Company / Brand Name</label>
              <input id="company" className="field-input" placeholder="Optional"
                value={form.company} onChange={e => set('company', e.target.value)} />
            </div>

            <div className="field">
              <label className="field-label" htmlFor="source">How did you find us?</label>
              <div className="field-select-wrap">
                <select id="source" className="field-select" value={form.source} onChange={e => set('source', e.target.value)}>
                  <option value="">Select one…</option>
                  {SOURCE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>

            <div className="form-nav">
              <button type="button" className="btn btn--secondary" onClick={back}><ChevronLeft /> Back</button>
              <button type="button" className="btn btn--primary" onClick={next}>Review <ChevronRight /></button>
            </div>
          </div>

          {/* ── STEP 6: CONFIRM ── */}
          <div className={`form-step${step === 6 ? ' form-step--active' : ''}`}>
            <h3 className="form-step__title">Review & Confirm</h3>
            <p className="form-step__desc">Everything look right? Hit confirm and we'll be in touch within 24 hours.</p>

            {/* Services */}
            <div className="summary-block">
              <div className="summary-block__header">Services Selected</div>
              <div className="summary-row">
                <span className="summary-row__key">Services</span>
                <div className="summary-tags">
                  {selectedNames.map(n => <span key={n} className="summary-tag">{n}</span>)}
                  {form.isSaasProject && <span className="summary-tag summary-tag--dark">SaaS Platform</span>}
                  {selectedNames.length === 0 && !form.isSaasProject && <span className="summary-row__val">—</span>}
                </div>
              </div>
            </div>

            {/* Project */}
            <div className="summary-block">
              <div className="summary-block__header">Project</div>
              {[
                { k: 'Name', v: form.projectName || '—' },
                { k: 'Budget', v: form.budget || '—' },
                { k: 'Timeline', v: form.timeline || '—' },
                { k: 'Priority', v: form.priority.length ? form.priority.join(', ') : '—' },
                { k: 'Files', v: form.uploadedFileIds.length > 0 ? `${form.uploadedFileIds.length} file(s) uploaded` : 'None uploaded' },
              ].map(r => (
                <div key={r.k} className="summary-row">
                  <span className="summary-row__key">{r.k}</span>
                  <span className="summary-row__val">{r.v}</span>
                </div>
              ))}
              {form.description && (
                <div className="summary-row">
                  <span className="summary-row__key">Brief</span>
                  <span className="summary-row__val" style={{ fontSize: '0.78rem', lineHeight: 1.5 }}>
                    {form.description.length > 140 ? form.description.slice(0, 140) + '…' : form.description}
                  </span>
                </div>
              )}
            </div>

            {/* Contact */}
            <div className="summary-block">
              <div className="summary-block__header">Contact</div>
              {[
                { k: 'Name', v: `${form.firstName} ${form.lastName}` },
                { k: 'Email', v: form.email },
                { k: 'Phone', v: form.phone },
                { k: 'Company', v: form.company || '—' },
                { k: 'Source', v: form.source || '—' },
              ].map(r => (
                <div key={r.k} className="summary-row">
                  <span className="summary-row__key">{r.k}</span>
                  <span className="summary-row__val">{r.v}</span>
                </div>
              ))}
            </div>

            <p className="summary-consent">By submitting, you agree Monakin Studio may contact you about your project.</p>

            <div className="form-nav">
              <button type="button" className="btn btn--secondary" onClick={back}><ChevronLeft /> Back</button>
              <button type="button" className="btn btn--primary" onClick={submit} disabled={submitting}>
                {submitting
                  ? <><div className="btn__spinner" /> Submitting…</>
                  : <>Confirm Booking <Check /></>
                }
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
