interface WorkflowConnectionProps {
  className?: string
  animated?: boolean
}

export function WorkflowConnection({ className = "", animated = false }: WorkflowConnectionProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="w-full h-0.5 bg-border"></div>
      {animated && <div className="absolute top-0 left-0 w-4 h-0.5 bg-primary flow-animation"></div>}
      <div className="absolute -right-1 -top-1 w-2 h-2 bg-primary rounded-full"></div>
    </div>
  )
}
