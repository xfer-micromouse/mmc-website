import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/config'

const routes = ['', '/za-studente', '/pravila']

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }))
}
