"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Play, Pause, BarChart3 } from "lucide-react"
import { WorkflowConnection } from "./workflow-connection"
import { WorkflowNode } from "./workflow-node"

interface WorkflowCardProps {
  title: string
  description: string
  status: "active" | "paused" | "draft"
  executions: number
  nodes: Array<{
    icon: React.ReactNode
    title: string
    description: string
    color: string
  }>
  onToggle: () => void
  onEdit: () => void
}

export function WorkflowCard({ title, description, status, executions, nodes, onToggle, onEdit }: WorkflowCardProps) {
  const statusColors = {
    active: "bg-green-500/10 text-green-500 border-green-500/20",
    paused: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    draft: "bg-gray-500/10 text-gray-500 border-gray-500/20",
  }

  return (
    <Card className="border-border/50 hover:border-primary/30 transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold truncate">{title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Badge className={statusColors[status]} variant="outline">
              {status}
            </Badge>
            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Workflow visualization */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {nodes.map((node, index) => (
            <React.Fragment key={index}>
              <div className="flex-shrink-0">
                <WorkflowNode
                  icon={node.icon}
                  title={node.title}
                  description={node.description}
                  color={node.color}
                  className="min-w-[200px]"
                />
              </div>
              {index < nodes.length - 1 && (
                <WorkflowConnection className="flex-shrink-0 w-8" animated={status === "active"} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Stats and actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <BarChart3 className="w-4 h-4" />
              <span>{executions.toLocaleString()} runs</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onEdit}>
              Edit
            </Button>
            <Button
              variant={status === "active" ? "secondary" : "default"}
              size="sm"
              onClick={onToggle}
              className={status === "active" ? "" : "pulse-glow"}
            >
              {status === "active" ? (
                <>
                  <Pause className="w-4 h-4 mr-1" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-1" />
                  Start
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
