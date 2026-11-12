import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormLoadingOverlay } from '@/components/FormLoadingOverlay';
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
  submitText = 'Submit',
  isLoading = false,
  error = '',
}) {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-md">
        <Card
          className={cn(
            'w-full border-border/60 shadow-lg transition-all duration-700 ease-in-out',
            isLoading && 'pointer-events-none scale-[0.96] opacity-0'
          )}
        >
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-semibold tracking-tight">{title}</CardTitle>
            <CardDescription>{subtitle}</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="name" className="text-sm font-medium leading-none">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(event) => setName?.(event.target.value)}
                  disabled={isLoading}
                  className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:outline-none border rounded-md shadow-sm"
                  placeholder="Product Name"
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="description" className="text-sm font-medium leading-none">
                  Description
                </Label>
                <Input
                  id="description"
                  name="description"
                  type="text"
                  required
                  value={description}
                  onChange={(event) => setDescription?.(event.target.value)}
                  disabled={isLoading}
                  className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:outline-none border rounded-md shadow-sm"
                  placeholder="Description"
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="weight" className="text-sm font-medium leading-none">
                  Weight (kg)
                </Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  step="0.01"
                  required
                  value={weight}
                  onChange={(event) => setWeight?.(event.target.value)}
                  disabled={isLoading}
                  className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:outline-none border rounded-md shadow-sm"
                  placeholder="Weight (kg)"
                />
              </div>

              <CardFooter className="flex-col gap-2 p-0 pt-2">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Saving...' : submitText}
                </Button>
              </CardFooter>

              {error && (
                <div className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive">
                  <Badge variant="destructive">
                    <span aria-hidden="true">⚠</span>
                    <span>{error}</span>
                  </Badge>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {isLoading && <FormLoadingOverlay text="LOADING" />}
      </div>
    </div>
  );
}

export default PostForm;
