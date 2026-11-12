import React from "react"
import { Link } from "react-router-dom"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import StatusBadge from "./StatusBadge"
import { ArrowRight, Package, Weight, Barcode } from "lucide-react"
import { cn } from "@/lib/utils"

function ProductsCard({ props, isDetail = false, isDriverView = false, handlePickup }) {
  if (!props) return null

  return (
    <Card
      className={cn(
        "card group flex flex-col justify-between overflow-hidden transition-all duration-200",
        "border border-border/60 bg-card text-card-foreground shadow-xs",
        "hover:border-border hover:shadow-sm"
      )}
    >
      <div>
        <CardHeader className="p-5 pb-3 space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1 min-w-0">
              <div className="card-header p-0 border-0 bg-transparent">
                <CardTitle className="text-base font-semibold tracking-tight text-foreground truncate group-hover:text-primary transition-colors">
                  {props.name}
                </CardTitle>
              </div>
              {props.serial_number && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                  <Barcode className="size-3.5 text-muted-foreground/70" />
                  <span className="bg-muted/60 px-1.5 py-0.5 rounded border border-border/40">
                    #{props.serial_number}
                  </span>
                </div>
              )}
            </div>

            <StatusBadge status={props.status} />
          </div>
        </CardHeader>

        <CardContent className="p-5 pt-2 pb-4 space-y-3">
          {isDetail ? (
            <div className="space-y-2 pt-1 border-t border-border/40">
              <p className="card-text text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground font-medium">Description:</strong> {props.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Weight className="size-4 text-muted-foreground/70" />
                <p className="card-text">
                  <strong className="text-foreground font-medium">Weight:</strong> {props.weight}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                <Barcode className="size-4 text-muted-foreground/70" />
                <p className="card-text">
                  <strong className="text-foreground font-medium font-sans">Serial Number:</strong> {props.serial_number}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Preserves card-text and Status: {props.status} text for test harnesses */}
              <p className="card-text text-xs text-muted-foreground flex items-center justify-between">
                <span>
                  <strong>Status:</strong> {props.status}
                </span>
                {props.weight && (
                  <span className="inline-flex items-center gap-1 text-muted-foreground font-medium">
                    <Weight className="size-3" />
                    {props.weight} kg
                  </span>
                )}
              </p>

              {props.description && (
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {props.description}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </div>

      <CardFooter className="p-5 pt-0">
        {isDriverView && (
          <div className="btn-group w-full" aria-label="Actions">
            <Button
              onClick={() => handlePickup(props.id)}
              className="w-full gap-2 shadow-xs"
              size="sm"
            >
              <Package className="size-4" />
              Pick Up
            </Button>
          </div>
        )}

        {!isDetail && (
          <div className="btn-group w-full" aria-label="Actions">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-between group/btn text-xs font-medium hover:bg-accent"
              asChild
            >
              <Link to={`/products/${props.id}`}>
                <span>View Details</span>
                <ArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover/btn:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

export default ProductsCard
