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

function LoginForm({
  title = 'Login',
  username = '',
  password = '',
  setUsername,
  setPassword,
  handleSubmit,
  error,
  isLoading = false,
}) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-background px-4 overflow-hidden sm:px-6 lg:px-8">
      <div className="relative w-full max-w-md">
        <Card
          className={cn(
            'w-full border-border/60 shadow-lg transition-all duration-700 ease-in-out',
            isLoading && 'pointer-events-none scale-[0.96] opacity-0'
          )}
        >
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-semibold tracking-tight">{title}</CardTitle>
            <CardDescription>Sign in to continue</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="username" className="text-sm font-medium leading-none">
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
                  className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:outline-none border rounded-md shadow-sm"
                  placeholder="Username"
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="password" className="text-sm font-medium leading-none">
                  Password
                </Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={password}
                  onChange={(event) => setPassword?.(event.target.value)}
                  disabled={isLoading}
                  className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:outline-none border rounded-md shadow-sm"
                  placeholder="Password"
                />
              </div>

              <CardFooter className="flex-col gap-2 p-0 pt-2">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </CardFooter>

              {error && (
                <div className="flex items-center gap-2 rounded-md text-sm text-destructive">
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

export default LoginForm;
