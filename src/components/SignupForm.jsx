import React from 'react';
import { Link } from 'react-router-dom';
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
import { Boxes, Truck, ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

function SignupForm({ isLoading = false, subtitle, role = 'customer', ...props }) {
  const isDriver = role === 'driver' || props.showVehicleType;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-x-hidden">
      <div className="w-full max-w-lg space-y-4">
        {/* Navigation Breadcrumb / Back Link */}
        <div className="flex items-center justify-between px-1">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Terminal</span>
          </Link>
          <Badge variant="outline" className="text-xs font-mono text-muted-foreground border-border/60">
            {isDriver ? 'COURIER DISPATCH' : 'SHIPPER REGISTRATION'}
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
                <div
                  className={cn(
                    'size-10 rounded-lg flex items-center justify-center border',
                    isDriver
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                      : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
                  )}
                >
                  {isDriver ? <Truck className="size-5" /> : <Boxes className="size-5" />}
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    Step 1 of 1
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
                  {props.title}
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                  {subtitle ||
                    (isDriver
                      ? 'Register your courier credentials to claim freight and log delivery milestones.'
                      : 'Create your shipper account to submit cargo manifests and track warehouse intake.')}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="p-6 pt-2">
              <form onSubmit={props.handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Left Column */}
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="username" className="text-xs font-medium text-foreground">
                        Username
                      </Label>
                      <Input
                        type="text"
                        id="username"
                        name="username"
                        value={props.username}
                        onChange={(e) => props.setUsername(e.target.value)}
                        className="h-9 text-sm bg-background border-border/80"
                        placeholder="Choose username"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs font-medium text-foreground">
                        Email Address
                      </Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={props.email}
                        onChange={(e) => props.setEmail(e.target.value)}
                        className="h-9 text-sm bg-background border-border/80"
                        placeholder="name@company.com"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="password" className="text-xs font-medium text-foreground">
                        Password
                      </Label>
                      <Input
                        type="password"
                        id="password"
                        name="password"
                        value={props.password}
                        onChange={(e) => props.setPassword(e.target.value)}
                        className="h-9 text-sm bg-background border-border/80"
                        placeholder="Min. 8 characters"
                        required
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="full_name" className="text-xs font-medium text-foreground">
                        Full Name
                      </Label>
                      <Input
                        type="text"
                        id="full_name"
                        name="full_name"
                        value={props.full_name}
                        onChange={(e) => props.setFullName(e.target.value)}
                        className="h-9 text-sm bg-background border-border/80"
                        placeholder="Full name"
                        required
                      />
                    </div>

                    {props.showAddress && (
                      <div className="space-y-1.5">
                        <Label htmlFor="address" className="text-xs font-medium text-foreground">
                          Address / Location
                        </Label>
                        <Input
                          type="text"
                          id="address"
                          name="address"
                          value={props.address}
                          onChange={(e) => props.setAddress(e.target.value)}
                          className="h-9 text-sm bg-background border-border/80"
                          placeholder="Warehouse or company address"
                          required
                        />
                      </div>
                    )}

                    {props.showVehicleType && (
                      <div className="space-y-1.5">
                        <Label htmlFor="vehicle_type" className="text-xs font-medium text-foreground">
                          Vehicle Type
                        </Label>
                        <Input
                          type="text"
                          id="vehicle_type"
                          name="vehicle_type"
                          value={props.vehicle_type}
                          onChange={(e) => props.setVehicleType(e.target.value)}
                          className="h-9 text-sm bg-background border-border/80"
                          placeholder="e.g. Van, 18-Wheeler, Flatbed"
                          required
                        />
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <Label htmlFor="phone_number" className="text-xs font-medium text-foreground">
                        Phone Number
                      </Label>
                      <Input
                        type="text"
                        id="phone_number"
                        name="phone_number"
                        value={props.phone_number}
                        onChange={(e) => props.setPhoneNumber(e.target.value)}
                        className="h-9 text-sm bg-background border-border/80"
                        placeholder="+996 (05X) 000-0000"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Error Banner */}
                {props.error && (
                  <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                    <Badge variant="destructive" className="gap-1.5 py-0.5 px-2 text-xs font-medium">
                      <span aria-hidden="true">⚠</span>
                      <span>{props.error}</span>
                    </Badge>
                  </div>
                )}

                {/* Form Actions */}
                <div className="pt-2 space-y-3">
                  <Button
                    type="submit"
                    className="w-full h-9 text-sm font-medium shadow-xs gap-2"
                    disabled={isLoading}
                  >
                    <span>{isLoading ? 'Processing Registration...' : 'Complete Registration'}</span>
                    <ArrowRight className="size-4" />
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    Already registered?{' '}
                    <Link
                      to="/login"
                      className="text-foreground font-medium underline underline-offset-4 hover:text-primary transition-colors"
                    >
                      Log in here
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {isLoading && <FormLoadingOverlay text="REGISTERING" />}
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
