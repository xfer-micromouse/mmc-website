import type { Metadata, Viewport } from 'next'
import { Inter, Orbitron, Sarpanch } from 'next/font/google'

import { SiteShell } from '@/components/site-shell'
import { SITE_URL } from '@/lib/config'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
})

const sarpanch = Sarpanch({
  subsets: ['latin'],
  variable: '--font-sarpanch',
  weight: '400',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Micromouse Zagreb 2026',
  description:
    'Natjecanje autonomnih robota u rješavanju labirinta. Pridružite se Micromouse Zagreb 2026!',
  keywords: [
    'micromouse',
    'micromouse zagreb',
    'robotika natjecanje',
    'autonomni roboti',
    'robotics competition',
  ],
  icons: {
    icon: '/logo.svg',
  },
  openGraph: {
    title: 'Micromouse Zagreb 2026',
    description:
      'Natjecanje autonomnih robota u rješavanju labirinta.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0f0e13',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="hr" className={`${inter.variable} ${orbitron.variable} ${sarpanch.variable}`}>
      <body className="font-sans antialiased bg-dark-bg text-foreground">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
