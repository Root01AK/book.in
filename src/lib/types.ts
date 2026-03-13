// src/lib/types.ts

export interface ServiceDetail {
  what: string        // what we do in detail
  whoFor: string      // who this is for
  process: string[]   // step-by-step process
  includes: string[]  // full list of what's included
  techStack?: string[]
}

export interface Service {
  id: string
  name: string
  description: string
  deliverables: string[]
  startingPrice: string
  priceNote?: string
  duration: string
  detail: ServiceDetail
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
    detail: {
      what: 'We design product interfaces grounded in real user behaviour — not assumptions. Every screen is built to guide users toward action, reduce friction, and communicate trust. We work across web, mobile, and SaaS products.',
      whoFor: 'Startups building their first product, teams redesigning an existing app, or businesses that want their digital product to feel as good as it works.',
      process: ['Discovery & stakeholder interviews', 'Competitor & UX audit', 'User personas & journey mapping', 'Low-fidelity wireframes', 'High-fidelity UI design', 'Interactive prototype', 'Usability testing', 'Developer handoff via Figma'],
      includes: ['Up to 20 designed screens', 'Mobile + desktop variants', 'Design system & component library', 'Interactive Figma prototype', 'Usability test report', 'Developer spec & handoff file', '2 rounds of revisions', 'Post-launch UX review call'],
      techStack: ['Figma', 'FigJam', 'Maze (usability testing)', 'Lottie (micro-animations)'],
    },
  },
  {
    id: 'web',
    name: 'Web Development',
    description: 'High-performance websites and web apps — React, Next.js, headless CMS.',
    deliverables: ['Responsive website', 'CMS integration', 'SEO setup', 'Performance optimisation'],
    startingPrice: '₹40,000',
    duration: '3–6 weeks',
    detail: {
      what: 'We build fast, accessible, and scalable websites using modern frameworks. From marketing sites to complex web applications — we write clean, maintainable code and optimise for Core Web Vitals and SEO from day one.',
      whoFor: 'Businesses that need a professional online presence, startups launching a product page, or teams that need a custom web app beyond what a website builder can offer.',
      process: ['Requirement gathering', 'Tech stack decision', 'Wireframe sign-off', 'Development sprints', 'CMS setup & content entry', 'SEO & performance audit', 'Cross-browser QA', 'Deployment & go-live'],
      includes: ['Fully responsive website', 'CMS integration (Sanity / Contentful / WordPress)', 'On-page SEO setup', 'Google Analytics & Search Console', 'Contact forms & integrations', 'Performance optimisation (90+ Lighthouse)', 'Domain & hosting setup', '1 month post-launch support'],
      techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Sanity / Contentful', 'Vercel / AWS'],
    },
  },
  {
    id: 'app',
    name: 'App Development',
    description: 'Native-feel mobile apps for iOS and Android — Flutter or React Native.',
    deliverables: ['iOS + Android app', 'API integration', 'App Store submission', 'Analytics'],
    startingPrice: '₹80,000',
    duration: '6–12 weeks',
    detail: {
      what: 'We build cross-platform mobile apps that feel native — smooth animations, offline support, and hardware access. We handle everything from UX to App Store submission, so you can focus on your product.',
      whoFor: 'Founders launching a consumer app, businesses extending their service to mobile, or teams that need a companion app for an existing SaaS product.',
      process: ['Product scoping & feature list', 'App architecture design', 'UI/UX for mobile', 'Development (Flutter / React Native)', 'API & backend integration', 'Internal beta testing', 'App Store & Play Store submission', 'Post-launch monitoring'],
      includes: ['iOS + Android app from one codebase', 'Push notifications', 'Offline mode', 'Authentication (email, Google, Apple)', 'In-app purchases (optional)', 'App Store & Google Play submission', 'Crash reporting & analytics setup', '1 month support post-launch'],
      techStack: ['Flutter', 'React Native', 'Firebase', 'REST APIs', 'Fastlane (deployment)'],
    },
  },
  {
    id: 'ecommerce',
    name: 'Ecommerce',
    description: 'Conversion-focused online stores. Shopify, WooCommerce, or fully custom.',
    deliverables: ['Store setup & design', 'Payment gateway', 'Inventory management', 'Mobile checkout'],
    startingPrice: '₹55,000',
    duration: '4–7 weeks',
    detail: {
      what: 'We build online stores optimised for one thing — converting browsers into buyers. From product pages to checkout flow, every decision is made with conversion rate in mind. We work with Shopify, WooCommerce, and fully custom stacks.',
      whoFor: 'D2C brands launching online, retail businesses moving to ecommerce, or existing stores that want a redesign to boost conversion rates.',
      process: ['Product & catalogue setup', 'Store design & branding', 'Payment gateway integration', 'Shipping & logistics setup', 'Mobile checkout optimisation', 'Abandoned cart & email flows', 'SEO & product descriptions', 'Launch & post-launch monitoring'],
      includes: ['Custom store design', 'Unlimited product listings', 'Payment gateway (Razorpay / Stripe / COD)', 'GST-compliant invoicing', 'Discount & coupon system', 'Wishlist & cart features', 'Mobile-optimised checkout', 'Inventory & order management', 'Basic email automation'],
      techStack: ['Shopify', 'WooCommerce', 'Next.js Commerce', 'Razorpay', 'Stripe', 'Klaviyo'],
    },
  },
  {
    id: 'software',
    name: 'Custom Software',
    description: 'ERP, CRM, internal tools and automation systems for your exact workflows.',
    deliverables: ['Requirements workshop', 'Custom backend', 'Admin dashboard', 'Training & docs'],
    startingPrice: '₹1,20,000',
    priceNote: 'Based on scope',
    duration: '8–20 weeks',
    detail: {
      what: 'Off-the-shelf software rarely fits complex operations. We build custom tools — ERPs, CRMs, internal dashboards, workflow automation — that map to exactly how your team works, not the other way around.',
      whoFor: 'Mid-size businesses with unique workflows, operations teams drowning in spreadsheets, or companies that have outgrown their existing software.',
      process: ['Deep requirements workshop', 'System architecture design', 'Database schema & API design', 'Iterative development sprints', 'Admin dashboard build', 'Data migration (if needed)', 'Staff training sessions', 'Documentation & handover'],
      includes: ['Custom web application', 'Role-based access control', 'Admin dashboard with reporting', 'REST API', 'Data import / export', 'Audit logs & activity tracking', 'Comprehensive documentation', 'Staff training sessions', '3 months post-launch support'],
      techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'Prisma', 'Redis', 'Docker', 'AWS / GCP'],
    },
  },
  {
    id: 'branding',
    name: 'Branding',
    description: 'Logo, identity, and brand guidelines. A visual language your audience remembers.',
    deliverables: ['Logo suite', 'Color & typography', 'Brand guidelines PDF', 'Asset library'],
    startingPrice: '₹18,000',
    duration: '2–3 weeks',
    detail: {
      what: 'A brand is more than a logo — it is the feeling people get when they encounter your business. We build visual identities that are distinctive, consistent, and built to grow with your company across every touchpoint.',
      whoFor: 'New businesses that need an identity from scratch, established brands that feel outdated, or startups preparing for a product launch or funding round.',
      process: ['Brand discovery workshop', 'Competitor & market research', 'Moodboard & direction', 'Logo concepts (3 directions)', 'Refinement & sign-off', 'Full brand system build', 'Brand guidelines document', 'Asset library delivery'],
      includes: ['Primary + secondary logo', 'Logomark / icon', 'Colour palette (primary + secondary)', 'Typography system', 'Business card design', 'Email signature', 'Social media kit (profile + cover images)', 'Brand guidelines PDF (20+ pages)', 'All source files (AI, SVG, PNG, PDF)'],
      techStack: ['Adobe Illustrator', 'Figma', 'Adobe InDesign'],
    },
  },
  {
    id: 'smm',
    name: 'Social Media Marketing',
    description: 'Strategy, content creation, and paid ad management. Grow with purpose.',
    deliverables: ['Content calendar', 'Graphic templates', 'Ads management', 'Monthly analytics'],
    startingPrice: '₹15,000',
    priceNote: '/month',
    duration: 'Ongoing retainer',
    detail: {
      what: 'We manage your brands social presence end-to-end — strategy, content creation, scheduling, community management, and paid ads. Every post is crafted to build audience and drive measurable results, not just likes.',
      whoFor: 'Brands that want to build an audience, D2C businesses running paid acquisition, or founders who dont have time to manage social media themselves.',
      process: ['Brand & audience audit', 'Competitor analysis', 'Content strategy & pillars', 'Monthly content calendar', 'Graphic & video creation', 'Scheduling & posting', 'Community management', 'Monthly performance report'],
      includes: ['30 posts/month (feed + stories)', 'Platform management (Instagram, LinkedIn, X)', 'Custom graphic templates', 'Caption copywriting', 'Hashtag strategy', 'Paid ad management (Meta / Google)', 'Monthly analytics report', 'Quarterly strategy review'],
      techStack: ['Meta Business Suite', 'Canva Pro', 'Later / Buffer', 'Google Ads', 'Meta Ads Manager'],
    },
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