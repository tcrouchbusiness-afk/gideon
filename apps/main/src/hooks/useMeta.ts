import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface PageMeta {
  title: string
  description: string
  canonical: string
}

const META: Record<string, PageMeta> = {
  '/': {
    title: 'Gideon Dynamics — Intelligence · Defense · Cyber Operations',
    description: 'Gideon Dynamics delivers nation-grade signals intelligence, cyber operations, and defense solutions. SIGINT, threat assessment, zero trust architecture, vulnerability scanning, and executive protection programs.',
    canonical: 'https://www.thegideoncorp.com/',
  },
  '/programs': {
    title: 'Programs — AXEHEAD · CARTOGRAPHER · REDOUBT | Gideon Dynamics',
    description: 'Sovereign defense programs: AXEHEAD resilience validation, CARTOGRAPHER ground-truth asset mapping, and REDOUBT sovereign AI defense. Cleared engineering teams embedded inside partner enclaves.',
    canonical: 'https://www.thegideoncorp.com/programs',
  },
  '/capabilities': {
    title: 'Capabilities — Full-Spectrum Defense | Gideon Dynamics',
    description: 'Full-spectrum defense capabilities: signals intelligence, adversary simulation, sovereign AI inference, zero-trust architecture, dark web monitoring, attribution analysis, and executive protection.',
    canonical: 'https://www.thegideoncorp.com/capabilities',
  },
  '/mission': {
    title: 'Mission — Sovereignty as an Operational Posture | Gideon Dynamics',
    description: 'Founded by U.S. military veterans and sovereign-defense engineers. Gideon Dynamics embeds operators and sovereign systems inside partner perimeters — accountable to partner authority, not vendor reachback.',
    canonical: 'https://www.thegideoncorp.com/mission',
  },
  '/contact': {
    title: 'Request a Briefing | Gideon Dynamics',
    description: 'Request a confidential briefing with the Gideon Dynamics team. Engagements begin with a sponsor-authorized scoping call. All communications handled through secure channels.',
    canonical: 'https://www.thegideoncorp.com/contact',
  },
}

function setMeta(selector: string, attr: string, value: string) {
  let el = document.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    const [, attrName, attrValue] = selector.match(/\[(\w+)="([^"]+)"\]/) ?? []
    if (attrName) el.setAttribute(attrName, attrValue)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

export function useMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = META[pathname]
    if (!meta) return

    document.title = meta.title

    // Description
    setMeta('meta[name="description"]', 'content', meta.description)

    // Canonical
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = meta.canonical

    // OG tags
    setMeta('meta[property="og:title"]',       'content', meta.title)
    setMeta('meta[property="og:description"]', 'content', meta.description)
    setMeta('meta[property="og:url"]',         'content', meta.canonical)

    // Twitter tags
    setMeta('meta[name="twitter:title"]',       'content', meta.title)
    setMeta('meta[name="twitter:description"]', 'content', meta.description)
  }, [pathname])
}
