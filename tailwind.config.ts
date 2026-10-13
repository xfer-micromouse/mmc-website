import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        secondary: 'hsl(var(--secondary))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        border: 'hsl(var(--border))',
        'neon-peach': '#FF9F76',
        'neon-pink': '#FF5E78',
        'neon-purple': '#A64AF5',
        'dark-bg': '#0f0e13',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-sarpanch)'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
}
export default config
