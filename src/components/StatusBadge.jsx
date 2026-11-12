import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const STATUS_CONFIG = {
  Pending: {
    label: "Pending",
    badgeClasses: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/15 dark:text-amber-400",
    dotClass: "bg-amber-500",
  },
  Approved: {
    label: "Approved",
    badgeClasses: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-400",
    dotClass: "bg-emerald-500",
  },
  PickedUp: {
    label: "PickedUp",
    badgeClasses: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/15 dark:text-blue-400",
    dotClass: "bg-blue-500",
  },
  Stored: {
    label: "Stored",
    badgeClasses: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/30 dark:bg-sky-500/15 dark:text-sky-400",
    dotClass: "bg-sky-500",
  },
}

export function StatusBadge({ status, className }) {
  const config = STATUS_CONFIG[status] || {
    label: status || "Unknown",
    badgeClasses: "border-border bg-muted text-muted-foreground",
    dotClass: "bg-muted-foreground",
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full px-2.5 py-0.5 text-xs font-medium inline-flex items-center gap-1.5 transition-colors",
        config.badgeClasses,
        className
      )}
    >
      <span className={cn("size-1.5 rounded-full shrink-0", config.dotClass)} aria-hidden="true" />
      <span>{config.label}</span>
    </Badge>
  )
}

export default StatusBadge
