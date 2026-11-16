import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormLoadingOverlay } from '@/components/FormLoadingOverlay';
import { PackagePlus, ArrowLeft, ArrowRight, Scale, FileText, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

function PostForm({
  handleSubmit,
  name = '',
  setName,
  description = '',
  setDescription,
  weight = '',
  setWeight,
  title = 'Product Details',
  subtitle = 'Enter the details for this shipment item',
  badgeText = 'CARGO INTAKE',
  submitText = 'Submit',
  isLoading = false,
  error = '',
  onCancel,
}) {
  const navigate = useNavigate();
  const handleCancel = onCancel || (() => navigate('/CustomerDashboard'));

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-x-hidden">
      <div className="w-full max-w-lg space-y-4">
        {/* Navigation Breadcrumb / Back Link */}
        <div className="flex items-center justify-between px-1">
          <Link
            to="/CustomerDashboard"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Dashboard</span>
          </Link>
          <Badge variant="outline" className="text-xs font-mono text-muted-foreground border-border/60">
            {badgeText}
          </Badge>
        </div>

        <div className="relative w-full">
          <Card
            className={cn(
              'w-full border border-border/60 bg-card shadow-xs transition-all duration-300 rounded-xl',
              isLoading && 'pointer-events-none scale-[0.98] opacity-50'
            )}
          >
            <CardHeader className="space-y-3 p-6 pb-4">
              <div className="flex items-center justify-between">
                <div className="size-10 rounded-lg flex items-center justify-center border bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">
                  <PackagePlus className="size-5" />
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    Manifest Entry
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
                  {title}
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                  {subtitle}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="p-6 pt-2">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Product Name */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="name" className="text-xs font-medium text-foreground inline-flex items-center gap-1.5">
                      <Tag className="size-3 text-muted-foreground" />
                      <span>Product Name</span>
                    </Label>
                    <span className="text-xs font-mono text-muted-foreground">Required</span>
                  </div>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(event) => setName?.(event.target.value)}
                    disabled={isLoading}
                    className="h-9 text-sm bg-background border-border/80"
                    placeholder="e.g. Industrial Sensors Box"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="description" className="text-xs font-medium text-foreground inline-flex items-center gap-1.5">
                      <FileText className="size-3 text-muted-foreground" />
                      <span>Cargo Description</span>
                    </Label>
                    <span className="text-xs font-mono text-muted-foreground">Required</span>
                  </div>
                  <Input
                    id="description"
                    name="description"
                    type="text"
                    required
                    value={description}
                    onChange={(event) => setDescription?.(event.target.value)}
                    disabled={isLoading}
                    className="h-9 text-sm bg-background border-border/80"
                    placeholder="e.g. Fragile laser sensors with protective cushioning"
                  />
                </div>

                {/* Weight */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="weight" className="text-xs font-medium text-foreground inline-flex items-center gap-1.5">
                      <Scale className="size-3 text-muted-foreground" />
                      <span>Gross Weight (kg)</span>
                    </Label>
                    <span className="text-xs font-mono text-muted-foreground">Metric (kg)</span>
                  </div>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    step="0.01"
                    min="0.01"
                    required
                    value={weight}
                    onChange={(event) => setWeight?.(event.target.value)}
                    disabled={isLoading}
                    className="h-9 text-sm bg-background border-border/80 font-mono"
                    placeholder="0.00"
                  />
                  <p className="text-xs text-muted-foreground">
                    Specify the total verified shipment weight for courier vehicle allocation.
                  </p>
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                    <Badge variant="destructive" className="gap-1.5 py-0.5 px-2 text-xs font-medium">
                      <span aria-hidden="true">⚠</span>
                      <span>{error}</span>
                    </Badge>
                  </div>
                )}

                {/* Form Actions */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="h-9 text-sm"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="h-9 text-sm font-medium shadow-xs gap-2 min-w-[120px]"
                  >
                    <span>{isLoading ? 'Saving...' : submitText}</span>
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {isLoading && <FormLoadingOverlay text="SAVING" />}
        </div>
      </div>
    </div>
  );
}

export default PostForm;
