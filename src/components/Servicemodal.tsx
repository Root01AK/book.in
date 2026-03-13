'use client'
import { useEffect } from 'react'
import type { Service } from '../lib/types'

interface Props {
  service: Service | null
  onClose: () => void
}

export default function ServiceModal({ service, onClose }: Props) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  // Lock scroll when open
  useEffect(() => {
    if (service) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [service])

  if (!service) return null

  return (
    <>
      {/* Backdrop */}
      <div className="smodal__backdrop" onClick={onClose} aria-hidden="true" />

      {/* Drawer */}
      <aside className="smodal" role="dialog" aria-modal="true" aria-label={service.name}>

        {/* Header */}
        <div className="smodal__header">
          <div>
            <span className="smodal__kicker">Service Details</span>
            <h2 className="smodal__title">{service.name}</h2>
          </div>
          <button className="smodal__close" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="smodal__body">

          {/* Price + duration strip */}
          <div className="smodal__meta">
            <div className="smodal__meta-item">
              <span className="service-item__price-from">Starting from</span>
              <span className="service-item__price-amount">
                {service.startingPrice}
                {service.priceNote && <small>{service.priceNote}</small>}
              </span>
            </div>
            <div className="smodal__meta-divider"/>
            <div className="smodal__meta-item">
              <span className="service-item__price-from">Timeline</span>
              <span className="service-item__price-amount">{service.duration}</span>
            </div>
          </div>

          {/* What we do */}
          <div className="smodal__section">
            <h3 className="smodal__section-title">What We Do</h3>
            <p className="smodal__text">{service.detail.what}</p>
          </div>

          {/* Who is it for */}
          <div className="smodal__section">
            <h3 className="smodal__section-title">Who Is This For</h3>
            <p className="smodal__text">{service.detail.whoFor}</p>
          </div>

          {/* Our Process */}
          <div className="smodal__section">
            <h3 className="smodal__section-title">Our Process</h3>
            <ol className="smodal__process">
              {service.detail.process.map((step, i) => (
                <li key={i} className="smodal__process-item">
                  <span className="smodal__process-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="smodal__process-text">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* What's included */}
          <div className="smodal__section">
            <h3 className="smodal__section-title">What's Included</h3>
            <ul className="smodal__includes">
              {service.detail.includes.map((item, i) => (
                <li key={i} className="smodal__includes-item">
                  <span className="smodal__check">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Deliverables (tags) */}
          <div className="smodal__section">
            <h3 className="smodal__section-title">Key Deliverables</h3>
            <div className="smodal__tags">
              {service.deliverables.map(d => (
                <span key={d} className="smodal__tag">{d}</span>
              ))}
            </div>
          </div>

          {/* Tech stack */}
          {service.detail.techStack && service.detail.techStack.length > 0 && (
            <div className="smodal__section">
              <h3 className="smodal__section-title">Tools & Technologies</h3>
              <div className="smodal__tags">
                {service.detail.techStack.map(t => (
                  <span key={t} className="smodal__tag smodal__tag--tech">{t}</span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="smodal__cta">
            <p className="smodal__cta-text">Ready to get started with {service.name}?</p>
            <a href="#booking" className="smodal__cta-btn" onClick={onClose}>
              Book This Service →
            </a>
          </div>

        </div>
      </aside>
    </>
  )
}