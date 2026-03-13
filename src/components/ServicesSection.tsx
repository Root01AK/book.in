'use client'
import { useState } from 'react'
import { STUDIO_SERVICES, type Service } from '@/lib/types'
import ServiceModal from '../components/Servicemodal'

export default function ServicesSection() {
  const [active, setActive] = useState<Service | null>(null)

  return (
    <>
      <div className="services-list">
        {STUDIO_SERVICES.map(s => (
          <div key={s.id} className="service-item">
            <div className="service-item__left">
              <div className="service-item__name">{s.name}</div>
              <div className="service-item__desc">{s.description}</div>
              <div className="service-item__tags">
                {s.deliverables.map(d => (
                  <span key={d} className="service-item__tag">{d}</span>
                ))}
              </div>
              {/* Learn More button */}
              <button
                className="service-item__btn"
                onClick={() => setActive(s)}
                type="button"
              >
                View Full Details
              </button>
            </div>
            <div className="service-item__price">
              <span className="service-item__price-from">STARTING From</span>
              <span className="service-item__price-amount">{s.startingPrice}</span>
              {s.priceNote && <span className="service-item__price-note">{s.priceNote}</span>}
              <span className="service-item__price-duration">{s.duration}</span>
            </div>
          </div>
        ))}
      </div>

      <ServiceModal service={active} onClose={() => setActive(null)} />
    </>
  )
}