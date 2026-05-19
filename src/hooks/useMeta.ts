import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const META: Record<string, { title: string; canonical: string }> = {
  '/': {
    title: 'Gideon Dynamics — Intelligence · Defense · Cyber Operations',
    canonical: 'https://www.thegideoncorp.com/',
  },
  '/programs': {
    title: 'Programs — AXEHEAD · CARTOGRAPHER · REDOUBT | Gideon Dynamics',
    canonical: 'https://www.thegideoncorp.com/programs',
  },
  '/capabilities': {
    title: 'Capabilities — Full-Spectrum Defense | Gideon Dynamics',
    canonical: 'https://www.thegideoncorp.com/capabilities',
  },
  '/mission': {
    title: 'Mission | Gideon Dynamics',
    canonical: 'https://www.thegideoncorp.com/mission',
  },
  '/contact': {
    title: 'Request Briefing | Gideon Dynamics',
    canonical: 'https://www.thegideoncorp.com/contact',
  },
}

export function useMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = META[pathname]
    if (!meta) return

    document.title = meta.title

    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = meta.canonical
  }, [pathname])
}
