import { useEffect, useMemo, useState } from 'react';
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
import { ThemeProvider } from "@/components/theme-provider"
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
  const [displayLocation, setDisplayLocation] = useState(location);
  const [phase, setPhase] = useState('idle');
  const [pendingLocation, setPendingLocation] = useState(null);
  const pixelCurtainDebug = false;

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname || location.search !== displayLocation.search) {
      setPendingLocation(location);
      setPhase('cover');
    }
  }, [location, displayLocation]);

  const curtainProps = useMemo(
    () => ({
      duration: 900,
      gridSize: pixelCurtainDebug ? { rows: 10, cols: 10 } : undefined,
      pixelSize: 44,
      direction: 'diagonal-tl-br',
      easing: 'easeInOut',
      colors: ['#ffffff', '#ffffff', '#ffffff'],
      softness: 0.2,
      jitter: 0.12,
      zIndex: 80,
      debug: pixelCurtainDebug,
      debugBorder: pixelCurtainDebug,
      debugOpaque: pixelCurtainDebug,
    }),
    [pixelCurtainDebug]
  );

  const handleCoverDone = () => {
    if (pendingLocation) {
      setDisplayLocation(pendingLocation);
      setPendingLocation(null);
    }
    setPhase('reveal');
  };

  const handleRevealDone = () => {
    setPhase('idle');
  };

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
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
