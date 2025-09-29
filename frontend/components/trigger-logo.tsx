export function TriggerLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`${className} relative`}>
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Lightning bolt with circuit pattern */}
        <path d="M20 2L8 18h6l-2 12 12-16h-6l2-12z" fill="url(#triggerGradient)" className="drop-shadow-lg" />
        {/* Circuit nodes */}
        <circle cx="12" cy="8" r="1.5" fill="currentColor" className="text-primary" />
        <circle cx="20" cy="14" r="1.5" fill="currentColor" className="text-primary" />
        <circle cx="16" cy="22" r="1.5" fill="currentColor" className="text-primary" />

        <defs>
          <linearGradient id="triggerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(59 130 246)" />
            <stop offset="50%" stopColor="rgb(147 51 234)" />
            <stop offset="100%" stopColor="rgb(59 130 246)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
