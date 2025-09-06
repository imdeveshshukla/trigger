type LogoProps = {
  className?: string
  withWordmark?: boolean
  label?: string
}

/**
 * Triggers Logo
 * - Mark: stylized "T" formed by connected nodes/edges (automation/workflows)
 * - Wordmark: "Triggers" (or variants) using font-sans; inherits currentColor
 *
 * Colors:
 * - The component inherits currentColor. Set via parent classes (e.g., text-blue-600).
 * Accessibility:
 * - Includes <title> for screen readers; pass label to customize.
 */
export function Logo({ className, withWordmark = true, label = "Triggers logo" }: LogoProps) {
  return (
    <div className={"flex items-center gap-2 " + className}>
      <svg width="28" height="28" viewBox="0 0 48 48" role="img" aria-label={label} className="shrink-0">
        <title>{label}</title>
        {/* Outer shield/rounded-square for recognizability as an app icon */}
        <rect x="3" y="3" width="42" height="42" rx="10" ry="10" fill="none" stroke="currentColor" strokeWidth="2.5" />

        {/* Stylized 'T' built from nodes and connectors */}
        {/* Top bar */}
        <circle cx="16" cy="16" r="3" fill="currentColor" />
        <circle cx="32" cy="16" r="3" fill="currentColor" />
        <line x1="19" y1="16" x2="29" y2="16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

        {/* Stem */}
        <line x1="24" y1="19" x2="24" y2="29" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

        {/* Bottom node */}
        <circle cx="24" cy="33" r="3" fill="currentColor" />

        {/* Subtle signal arcs to imply 'trigger -> action' */}
        <path
          d="M36 16c3 0 5 2 5 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.35"
        />
        <path
          d="M12 16c-3 0-5 2-5 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.35"
        />
      </svg>

      {withWordmark && <span className="font-sans text-base font-semibold tracking-tight leading-none">Triggers</span>}
    </div>
  )
}

export default Logo
