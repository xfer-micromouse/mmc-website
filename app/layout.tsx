import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'

import { SiteShell } from '@/components/site-shell'
import { EDITION_YEAR, SITE_URL } from '@/lib/config'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-space-grotesk',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-jetbrains-mono',
})

// Runs before paint: show the boot screen once per session, never with reduced motion.
const bootScript = `try{if(!sessionStorage.getItem('mmz-booted')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('boot');sessionStorage.setItem('mmz-booted','1')}}catch(e){}`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `Micromouse Zagreb ${EDITION_YEAR}`,
  description:
    `Natjecanje autonomnih robota u rješavanju labirinta. Pridružite se Micromouse Zagreb ${EDITION_YEAR}!`,
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
    title: `Micromouse Zagreb ${EDITION_YEAR}`,
    description: 'Natjecanje autonomnih robota u rješavanju labirinta.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#140F1F',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="hr"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="font-sans antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
