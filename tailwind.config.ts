import type { Config } from 'tailwindcss'

const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.ts'],
  theme: {
    extend: {
      colors: {
        background: token('background'),
        surface: token('surface'),
        floor: token('floor'),
        foreground: token('foreground'),
        muted: token('muted'),
        border: token('border'),
        accent: {
          DEFAULT: token('accent'),
          soft: token('accent-soft'),
          foreground: token('accent-foreground'),
        },
        signal: token('signal'),
        copper: token('copper'),
        gold: token('gold'),
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
      },
    },
  },
}
export default config
