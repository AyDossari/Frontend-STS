import React, { useState } from 'react';
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
import { LockKeyhole, ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

function LoginForm({
  title = 'Operator Sign In',
  subtitle = 'Enter dispatch or shipper credentials to access the terminal',
  username = '',
  password = '',
  setUsername,
  setPassword,
  handleSubmit,
  error,
  isLoading = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-x-hidden">
      <div className="w-full max-w-md space-y-4">
        {/* Navigation Breadcrumb / Terminal Link */}
        <div className="flex items-center justify-between px-1">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Terminal</span>
          </Link>
          <Badge variant="outline" className="text-xs font-mono text-muted-foreground border-border/60">
            ACCESS CONTROL
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
                <div className="size-10 rounded-lg flex items-center justify-center border bg-primary/10 text-primary border-primary/20">
                  <LockKeyhole className="size-5" />
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    SECURE GATEWAY
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
                <div className="space-y-1.5">
                  <Label htmlFor="username" className="text-xs font-medium text-foreground">
                    Username
                  </Label>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    required
                    value={username}
                    onChange={(event) => setUsername?.(event.target.value)}
                    disabled={isLoading}
                    className="h-9 text-sm bg-background border-border/80 focus-visible:ring-1 focus-visible:ring-ring"
                    placeholder="Enter username"
                    autoComplete="username"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-xs font-medium text-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      required
                      value={password}
                      onChange={(event) => setPassword?.(event.target.value)}
                      disabled={isLoading}
                      className="h-9 text-sm bg-background border-border/80 pr-10 focus-visible:ring-1 focus-visible:ring-ring"
                      placeholder="Enter password"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      disabled={isLoading}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 rounded-md text-sm text-destructive">
                    <Badge variant="destructive" className="flex items-center gap-1.5 px-3 py-1 text-xs">
                      <span aria-hidden="true">⚠</span>
                      <span>{error}</span>
                    </Badge>
                  </div>
                )}

                <div className="pt-2">
                  <Button type="submit" className="w-full h-9 font-medium text-sm transition-colors" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="size-4 animate-spin" />
                        <span>Authenticating...</span>
                      </span>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </div>

                {/* Registration Redirection Links */}
                <div className="pt-4 border-t border-border/40 text-center space-y-2">
                  <p className="text-xs text-muted-foreground">
                    Don&apos;t have an account yet?
                  </p>
                  <div className="flex items-center justify-center gap-3 text-xs">
                    <Link
                      to="/signup/customer"
                      className="font-medium text-foreground hover:underline transition-colors"
                    >
                      Shipper Sign Up
                    </Link>
                    <span className="text-border">•</span>
                    <Link
                      to="/signup/driver"
                      className="font-medium text-foreground hover:underline transition-colors"
                    >
                      Courier Sign Up
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {isLoading && <FormLoadingOverlay text="AUTHENTICATING" />}
        </div>

        {/* Security Telemetry Footer */}
        <p className="text-center text-xs font-mono tracking-wider text-muted-foreground/70 uppercase">
          STS Dispatch Gateway • Secure JWT Bearer Channel
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
