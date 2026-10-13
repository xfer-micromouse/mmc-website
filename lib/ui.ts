const buttonBase =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md px-5 py-2.5 text-sm font-medium transition active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100"

export const buttonStyles = {
  primary: `${buttonBase} bg-accent text-accent-foreground hover:bg-accent/90`,
  secondary: `${buttonBase} border border-border text-foreground hover:bg-surface`,
}
