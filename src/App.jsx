import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import CustomerSignup from './pages/CustomerSignup';
import DriverSignup from './pages/DriverSignup';
import Login from './pages/LoginPage';
import CustomerDashboard from './pages/CustomerDashboard';
import DriverDashboard from './pages/DriverDashboard';
import AddProduct from './pages/AddProduct';
import AddRequest from './pages/AddRequest';
import ProductDetail from './pages/ProductDetail';
import RequestDetail from './pages/RequestDetail';
import EditProduct from './pages/EditProduct';
import EditRequest from './pages/EditRequest';
import HomePage from './pages/HomePage';
import Navbar from './components/NavBar';
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import PixelCurtains from './components/PixelCurtains';

const appRoutes = [
  { path: '/', element: <HomePage /> },
  { path: '/signup/customer', element: <CustomerSignup /> },
  { path: '/signup/driver', element: <DriverSignup /> },
  { path: '/login', element: <Login /> },
  { path: '/CustomerDashboard', element: <CustomerDashboard /> },
  { path: '/DriverDashboard', element: <DriverDashboard /> },
  { path: '/products/add', element: <AddProduct /> },
  { path: '/Request/add', element: <AddRequest /> },
  { path: '/products/:id', element: <ProductDetail /> },
  { path: '/Requests/:id', element: <RequestDetail /> },
  { path: '/products/:id/edit', element: <EditProduct /> },
  { path: '/Requests/:id/edit', element: <EditRequest /> },
];

function RoutesWithPixelCurtains() {
  const location = useLocation();
  const themeContext = useTheme();
  const theme = themeContext?.theme || 'dark';
  const [displayLocation, setDisplayLocation] = useState(location);
  const [phase, setPhase] = useState('idle');
  const pendingLocationRef = useRef(null);

  // Accessible reduced-motion preference detection
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Theme-aware palette strictly derived from "The Freight Terminal" design spec - Quieter, low-contrast tones
  const curtainColors = useMemo(() => {
    if (theme === 'light') {
      return ['#ffffff', '#fafafa', '#f4f4f5'];
    }
    return ['#09090b', '#101013', '#16161a'];
  }, [theme]);

  // Quieter, understated operational transition: fine-grain tiles, gentle ease-out, low jitter, feathered softness
  const curtainProps = useMemo(
    () => ({
      duration: 260,
      pixelSize: 56,
      direction: 'top-bottom',
      easing: 'easeOut',
      colors: curtainColors,
      softness: 0.36,
      jitter: 0.10,
      zIndex: 80,
    }),
    [curtainColors]
  );

  // Route change transition trigger
  useEffect(() => {
    const hasChanged =
      location.pathname !== displayLocation.pathname ||
      location.search !== displayLocation.search ||
      location.hash !== displayLocation.hash;

    if (!hasChanged) return;

    if (prefersReducedMotion) {
      setDisplayLocation(location);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }

    pendingLocationRef.current = location;
    setPhase('cover');
  }, [location, displayLocation, prefersReducedMotion]);

  // Once covered: update location, restore scroll to top, and begin reveal
  const handleCoverDone = useCallback(() => {
    if (pendingLocationRef.current) {
      setDisplayLocation(pendingLocationRef.current);
      pendingLocationRef.current = null;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setPhase('reveal');
  }, []);

  // Once revealed: settle back to idle
  const handleRevealDone = useCallback(() => {
    setPhase('idle');
  }, []);

  // Defensive timeout failsafe: guarantees transitions never get permanently stuck
  useEffect(() => {
    if (phase === 'idle') return;

    const safetyTimer = setTimeout(() => {
      if (pendingLocationRef.current) {
        setDisplayLocation(pendingLocationRef.current);
        pendingLocationRef.current = null;
      }
      setPhase('idle');
    }, 900);

    return () => clearTimeout(safetyTimer);
  }, [phase]);

  return (
    <>
      <div className="min-h-screen flex flex-col w-full max-w-full overflow-x-hidden bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
        <Navbar />
        <main className="flex-grow w-full max-w-full overflow-x-hidden">
          <Routes location={displayLocation}>
            {appRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        </main>
      </div>

      <PixelCurtains
        {...curtainProps}
        active={phase === 'cover'}
        mode="cover"
        onComplete={handleCoverDone}
      />
      <PixelCurtains
        {...curtainProps}
        active={phase === 'reveal'}
        mode="reveal"
        onComplete={handleRevealDone}
      />
    </>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <RoutesWithPixelCurtains />
      </Router>
    </ThemeProvider>
  );
}

export default App;
