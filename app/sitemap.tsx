import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://micromouse.xfer.hr',
      lastModified: new Date(),
    },
    {
      url: 'https://micromouse.xfer.hr/#about',
      lastModified: new Date(),
    },
    {
      url: 'https://micromouse.xfer.hr/za-studente',
      lastModified: new Date(),
    },
    {
      url: 'https://micromouse.xfer.hr/pravila',
      lastModified: new Date(),
    },
  ]
}