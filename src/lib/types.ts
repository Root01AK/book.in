// src/lib/types.ts

export interface Service {
  id: string
  name: string
  description: string
  deliverables: string[]
  startingPrice: string
  priceNote?: string
  duration: string
}

export interface SaasFeature {
  id: string
  label: string
  description: string
}

export interface BookingFormData {
  services: string[]
  isSaasProject: boolean
  saasType: string
  saasUsers: string
  saasFeatures: string[]
  projectName: string
  description: string
  budget: string
  timeline: string
  priority: string
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  source: string
  uploadedFileIds: string[]
}

export const STUDIO_SERVICES: Service[] = [
  {
    id: 'uiux',
    name: 'UI / UX Design',
    description: 'Research-driven interfaces that convert visitors into customers.',
    deliverables: ['User research & personas', 'Wireframes & prototypes', 'Design system', 'Figma handoff'],
    startingPrice: '₹25,000',
    duration: '2–4 weeks',
  },
  {
    id: 'web',
    name: 'Web Development',
    description: 'High-performance websites and web apps — React, Next.js, headless CMS.',
    deliverables: ['Responsive website', 'CMS integration', 'SEO setup', 'Performance optimisation'],
    startingPrice: '₹40,000',
    duration: '3–6 weeks',
  },
  {
    id: 'app',
    name: 'App Development',
    description: 'Native-feel mobile apps for iOS and Android — Flutter or React Native.',
    deliverables: ['iOS + Android app', 'API integration', 'App Store submission', 'Analytics'],
    startingPrice: '₹80,000',
    duration: '6–12 weeks',
  },
  {
    id: 'ecommerce',
    name: 'Ecommerce',
    description: 'Conversion-focused online stores. Shopify, WooCommerce, or fully custom.',
    deliverables: ['Store setup & design', 'Payment gateway', 'Inventory management', 'Mobile checkout'],
    startingPrice: '₹55,000',
    duration: '4–7 weeks',
  },
  {
    id: 'software',
    name: 'Custom Software',
    description: 'ERP, CRM, internal tools and automation systems for your exact workflows.',
    deliverables: ['Requirements workshop', 'Custom backend', 'Admin dashboard', 'Training & docs'],
    startingPrice: '₹1,20,000',
    priceNote: 'Based on scope',
    duration: '8–20 weeks',
  },
  {
    id: 'branding',
    name: 'Branding',
    description: 'Logo, identity, and brand guidelines. A visual language your audience remembers.',
    deliverables: ['Logo suite', 'Color & typography', 'Brand guidelines PDF', 'Asset library'],
    startingPrice: '₹18,000',
    duration: '2–3 weeks',
  },
  {
    id: 'smm',
    name: 'Social Media Marketing',
    description: 'Strategy, content creation, and paid ad management. Grow with purpose.',
    deliverables: ['Content calendar', 'Graphic templates', 'Ads management', 'Monthly analytics'],
    startingPrice: '₹15,000',
    priceNote: '/month',
    duration: 'Ongoing retainer',
  },
]

export const SAAS_FEATURES: SaasFeature[] = [
  { id: 'auth', label: 'Auth & User Management', description: 'Social login, roles, permissions' },
  { id: 'billing', label: 'Subscription Billing', description: 'Stripe, plans, invoices' },
  { id: 'dashboard', label: 'Analytics Dashboard', description: 'Charts, KPIs, exports' },
  { id: 'api', label: 'Public API / Webhooks', description: 'REST or GraphQL endpoints' },
  { id: 'email', label: 'Email Automation', description: 'Transactional + drip sequences' },
  { id: 'multitenancy', label: 'Multi-tenancy', description: 'Org workspaces, sub-domains' },
  { id: 'mobile', label: 'Mobile App', description: 'Companion iOS + Android' },
  { id: 'ai', label: 'AI / ML Features', description: 'LLM integration, predictions' },
]

export const BUDGET_OPTIONS = [
  'Under ₹25K', '₹25K – ₹75K', '₹75K – ₹2L',
  '₹2L – ₹5L', '₹5L – ₹10L', '₹10L+', "Let's discuss",
]

export const TIMELINE_OPTIONS = [
  { value: 'ASAP', label: 'ASAP', note: 'Rush delivery — premium rate' },
  { value: '1 Month', label: '1 Month', note: 'Focused sprint' },
  { value: '1–3 Months', label: '1–3 Months', note: 'Recommended for most projects' },
  { value: '3–6 Months', label: '3–6 Months', note: 'Larger scope / multiple services' },
  { value: '6+ Months', label: '6+ Months', note: 'Enterprise / ongoing' },
]

export const PRIORITY_OPTIONS = [
  { value: 'quality', label: 'Top Quality', sub: 'Best outcome' },
  { value: 'speed', label: 'Fast Delivery', sub: 'Ship quickly' },
  { value: 'budget', label: 'Budget First', sub: 'Best value' },
]

export const SAAS_TYPES = [
  'B2B SaaS', 'B2C SaaS', 'Internal Tool',
  'Marketplace', 'Developer Tool', 'AI-powered App', 'Other',
]

export const SAAS_USER_RANGES = [
  '< 100 users', '100 – 1,000', '1,000 – 10,000',
  '10,000 – 1L', '1L+ users',
]

export const SOURCE_OPTIONS = [
  'Instagram', 'Google Search', 'LinkedIn', 'Twitter / X',
  'Behance / Dribbble', 'Referral', 'Existing Client', 'Other',
]

export const EMPTY_FORM: BookingFormData = {
  services: [], isSaasProject: false,
  saasType: '', saasUsers: '', saasFeatures: [],
  projectName: '', description: '', budget: '', timeline: '', priority: '',
  firstName: '', lastName: '', email: '', phone: '', company: '', source: '',
  uploadedFileIds: [],
}
