import type { Metadata, Viewport } from 'next'
import { Inter, Orbitron, Sarpanch } from 'next/font/google'

import './globals.css'

const _inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
})

const _orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
})

const _sarpanch = Sarpanch({
  subsets: ['latin'],
  variable: '--font-sarpanch',
  weight: '400'
})

export const metadata: Metadata = {
  title: 'Micromouse Croatia 2026',
  description:
    'Natjecanje autonomnih robota u rješavanju labirinta. Pridružite se Micromouse Croatia 2026!',
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
    <html lang="hr" className={`${_inter.variable} ${_orbitron.variable} ${_sarpanch.variable}`}>
      <body className="font-sans antialiased bg-dark-bg text-foreground">
        {children}
      </body>
    </html>
  )
}
