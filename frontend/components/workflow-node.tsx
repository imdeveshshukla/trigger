import type React from "react"
import { Card } from "@/components/ui/card"

interface WorkflowNodeProps {
  icon: React.ReactNode
  title: string
  description: string
  color?: string
  className?: string
}

export function WorkflowNode({ icon, title, description, color = "bg-primary", className = "" }: WorkflowNodeProps) {
  return (
    <Card className={`p-4 border-2 border-border/50 hover:border-primary/50 transition-all duration-300 ${className}`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center text-white`}>{icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-foreground truncate">{title}</h3>
          <p className="text-xs text-muted-foreground truncate">{description}</p>
        </div>
      </div>
    </Card>
  )
}
