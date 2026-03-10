'use client'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <header className="navbar">
      <Link href="/" className="navbar__logo-link">
        <Image
          src="/logo.png"
          alt="Monakin Studio"
          width={140}
          height={30}
          className="navbar__logo-img"
          priority
        />
      </Link>
      <div className="navbar__right">
        <span className="navbar__tag">Service Booking Portal</span>
        <a href="tel:+919999999999" className="navbar__contact">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .92h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.77a16 16 0 006.72 6.72l1.21-1.21a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
          Call Us
        </a>
        <a href="mailto:sayhello@monakin.in" className="navbar__contact navbar__contact--mail">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          Mail Us
        </a>
      </div>
    </header>
  )
}