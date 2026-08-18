import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-background px-4 overflow-hidden">
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
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium leading-none">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  required
                  value={username}
                  onChange={(event) => setUsername?.(event.target.value)}
                  disabled={isLoading}
                  className={cn(
                    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    error && 'border-destructive focus-visible:ring-destructive'
                  )}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium leading-none">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(event) => setPassword?.(event.target.value)}
                  disabled={isLoading}
                  className={cn(
                    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    error && 'border-destructive focus-visible:ring-destructive'
                  )}
                />
              </div>

              <CardFooter className="flex-col gap-2 p-0 pt-2">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </CardFooter>

              {error && (
                <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  <span aria-hidden="true">âš </span>
                  <span>{error}</span>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: 'oklch(0.14 0 0)' }}
          >
            <div
              aria-label="Loading"
              className="relative flex select-none items-center justify-center uppercase leading-none"
              style={{
                fontFamily: 'Segoe UI, sans-serif',
                fontSize: 'clamp(3rem, 6vw, 8rem)',
                lineHeight: 0.9,
                letterSpacing: '-0.03em',
                fontWeight: 400,
              }}
            >
              {Array.from('LOADING').map((letter, index) => {
                const letters = Array.from('LOADING');
                const centerIndex = Math.floor(letters.length / 2);
                const delay = Math.abs(index - centerIndex) * 0.16;

                return (
                  <span
                    key={`${letter}-${index}`}
                    style={{
                      position: 'relative',
                      display: 'inline-block',
                      minWidth: '0.32em',
                    }}
                  >
                    <span style={{ color: 'oklch(0.94 0.01 240)', opacity: 0.26 }}>{letter}</span>
                    <motion.span
                      initial={{ width: '0%', opacity: 0.3 }}
                      animate={{
                        width: ['0%', '35%', '65%', '100%'],
                        opacity: [0.3, 1, 1, 1],
                      }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        delay,
                        ease: 'easeInOut',
                      }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        color: 'oklch(0.94 0.01 240)',
                        backgroundImage: 'linear-gradient(90deg, oklch(0.99 0.003 240) 0%, oklch(0.92 0.01 240) 22%, oklch(0.78 0.015 240) 48%, oklch(0.62 0.02 240) 72%, oklch(0.42 0.02 240) 100%)',
                        backgroundSize: '220% 100%',
                        backgroundPosition: '100% 0%',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {letter}
                    </motion.span>
                  </span>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
