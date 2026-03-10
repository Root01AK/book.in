'use client'

const STEPS = [
  'Services', 'SaaS', 'Project', 'Files', 'Contact', 'Confirm',
]

export default function StepIndicator({ current }: { current: number }) {
  return (
    <div className="step-indicator">
      {STEPS.map((label, i) => {
        const num   = i + 1
        const done  = num < current
        const active = num === current
        return (
          <div key={label} className="step-item">
            <div className="step-item__content">
              <div className={`step-item__circle${active ? ' step-item__circle--active' : done ? ' step-item__circle--done' : ''}`}>
                {done
                  ? <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="1.5,5.5 4.5,8.5 9.5,2.5"/></svg>
                  : num
                }
              </div>
              <span className={`step-item__label${active ? ' step-item__label--active' : done ? ' step-item__label--done' : ''}`}>
                {label}
              </span>
            </div>
           {i < STEPS.length - 1 && (
  <div className={[
    'step-item__line',
    done ? 'step-item__line--done' : '',
    (i + 2 === current) ? 'step-item__line--hidden' : '',
  ].join(' ').trim()} />
)}
          </div>
        )
      })}
    </div>
  )
}
