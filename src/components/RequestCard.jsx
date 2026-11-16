import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authorizedRequest } from '../lib/api';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge from "./StatusBadge";
import { ArrowRight, Weight, Barcode, Calendar, User, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

function RequestCard({ props, isDetail = false, isDriverView = false, handlePickup }) {
  const [productDetail, setProductDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchProduct = async () => {
      setIsLoading(true);
      if (props.product && typeof props.product === 'object' && props.product.name) {
        if (isMounted) {
          setProductDetail(props.product);
          setIsLoading(false);
        }
      } else if (props.product) {
        try {
          const response = await authorizedRequest('get', `/products/${props.product}/`);
          if (isMounted) {
            setProductDetail(response.data);
            setIsLoading(false);
          }
        } catch (err) {
          console.error("Failed to fetch product", err);
          if (isMounted) setIsLoading(false);
        }
      } else {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchProduct();
    return () => { isMounted = false; };
  }, [props.product]);

  if (isLoading || !productDetail) {
    return (
      <Card className="card w-full border border-border/60 bg-card p-5 animate-pulse min-h-[180px] flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div className="h-5 w-32 bg-muted rounded" />
            <div className="h-5 w-16 bg-muted rounded-full" />
          </div>
          <div className="h-4 w-48 bg-muted rounded" />
          <div className="h-4 w-24 bg-muted rounded" />
        </div>
        <div className="h-8 w-full bg-muted rounded mt-4" />
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "card group flex flex-col justify-between overflow-hidden transition-all duration-200",
        "border border-border/60 bg-card text-card-foreground shadow-xs",
        "hover:border-border hover:shadow-sm w-full"
      )}
    >
      <div>
        <CardHeader className="p-5 pb-3 space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1 min-w-0">
              <div className="card-header p-0 border-0 bg-transparent">
                <CardTitle className="text-base font-semibold tracking-tight text-foreground truncate group-hover:text-primary transition-colors">
                  {productDetail.name}
                </CardTitle>
              </div>
              {productDetail.serial_number && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                  <Barcode className="size-3.5 text-muted-foreground/70" />
                  <span className="bg-muted/60 px-1.5 py-0.5 rounded border border-border/40">
                    #{productDetail.serial_number}
                  </span>
                </div>
              )}
            </div>

            <StatusBadge status={props.status} />
          </div>
        </CardHeader>

        <CardContent className="card-body p-5 pt-2 pb-4 space-y-3">
          {isDetail ? (
            <div className="space-y-2 pt-1 border-t border-border/40">
              <p className="card-text text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground font-medium">Description:</strong> {productDetail.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Weight className="size-4 text-muted-foreground/70" />
                <p className="card-text">
                  <strong className="text-foreground font-medium">Weight:</strong> {productDetail.weight}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                <Barcode className="size-4 text-muted-foreground/70" />
                <p className="card-text">
                  <strong className="text-foreground font-medium font-sans">Serial Number:</strong> {productDetail.serial_number}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="size-4 text-muted-foreground/70" />
                <p className="card-text">
                  <strong className="text-foreground font-medium">Customer:</strong> {productDetail.customer?.full_name || 'N/A'}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="size-4 text-muted-foreground/70" />
                <p className="card-text">
                  <strong className="text-foreground font-medium">Phone:</strong> {productDetail.customer?.phone_number || 'N/A'}
                </p>
              </div>
              {props.created_at && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="size-3.5 text-muted-foreground/70" />
                  <p className="card-text">
                    <strong className="text-foreground font-medium">Created at:</strong> {props.created_at}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <p className="card-text text-xs text-muted-foreground flex items-center justify-between">
                <span>
                  <strong>Status:</strong> {props.status}
                </span>
                {productDetail.weight && (
                  <span className="inline-flex items-center gap-1 text-muted-foreground font-medium">
                    <Weight className="size-3" />
                    {productDetail.weight} kg
                  </span>
                )}
              </p>

              {productDetail.description && (
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {productDetail.description}
                </p>
              )}
            </div>
          )}

          {isDriverView && (
            <Button onClick={() => handlePickup(props.id)} className="btn btn-primary w-full mt-2" size="sm">
              Pick Up
            </Button>
          )}
        </CardContent>
      </div>

      {!isDetail && (
        <CardFooter className="p-5 pt-0">
          <div className="btn-group w-full" aria-label="Actions">
            <Button asChild variant="outline" size="sm" className="w-full justify-between group/btn">
              <Link to={`/Requests/${props.id}`} className="btn btn-outline-light btn-sm">
                <span className="text-xs font-medium">View Details</span>
                <ArrowRight className="size-3.5 transition-transform group-hover/btn:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

export default RequestCard;
