import { useEffect, useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authorizedRequest } from '../lib/api';
import ProductCard from '../components/ProductsCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Truck,
  ArrowLeft,
  Search,
  PackageSearch,
  AlertCircle,
  RefreshCw,
  Boxes,
  PackageCheck,
} from 'lucide-react';

function AddRequest() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isClaiming, setIsClaiming] = useState(false);
  const navigate = useNavigate();

  const fetchAvailableProducts = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await authorizedRequest('get', '/driver-requests/');
      setProducts(response.data?.available_products || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load available products.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInitiatePickup = (productOrId) => {
    if (typeof productOrId === 'object' && productOrId !== null) {
      setSelectedProduct(productOrId);
    } else {
      const found = products.find((p) => p.id === productOrId);
      setSelectedProduct(found || { id: productOrId });
    }
  };

  const handleConfirmPickup = async () => {
    if (!selectedProduct) return;
    setIsClaiming(true);
    setError('');
    try {
      await authorizedRequest('post', '/driver-requests/', {
        product: selectedProduct.id,
      });
      setSelectedProduct(null);
      navigate('/DriverDashboard');
    } catch (err) {
      console.error(err);
      setError('Failed to create pickup request.');
      setIsClaiming(false);
      setSelectedProduct(null);
    }
  };

  useEffect(() => {
    fetchAvailableProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return products;
    return products.filter((p) => {
      return (
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.serial_number?.toLowerCase().includes(q)
      );
    });
  }, [products, searchQuery]);

  // Loading Skeleton State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-6 animate-pulse">
            <div className="space-y-2">
              <div className="h-4 w-32 bg-muted rounded" />
              <div className="h-8 w-64 bg-muted rounded" />
            </div>
            <div className="h-9 w-32 bg-muted rounded" />
          </div>

          <div className="h-12 bg-muted/40 rounded-xl animate-pulse" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-card border border-border/60 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error && !products.length) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-xl mx-auto px-4 py-16">
          <Alert variant="destructive" className="border-destructive/50">
            <AlertCircle className="size-5" />
            <AlertTitle className="text-base font-semibold">Error Loading Freight</AlertTitle>
            <AlertDescription className="mt-2 text-sm leading-relaxed">
              <p>{error}</p>
              <div className="mt-4 flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchAvailableProducts}
                  className="gap-2"
                >
                  <RefreshCw className="size-4" />
                  Retry
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/DriverDashboard">Back to Dispatch</Link>
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  // Initial Empty State (No available products)
  if (!products.length) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Top minimal bar */}
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
              <Truck className="size-4 text-primary" />
              <span>STS Freight Terminal &bull; Driver Intake</span>
            </div>
            <Badge variant="outline" className="text-xs font-mono text-muted-foreground border-border/60">
              DISPATCH QUEUE
            </Badge>
          </div>

          <div className="container mt-5 text-center rounded-2xl border border-dashed border-border/80 bg-card/50 p-12 shadow-xs">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-muted/80 text-muted-foreground mb-4">
              <PackageCheck className="size-7 text-primary" />
            </div>

            {/* Preserves exact text for compatibility */}
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              No available products for pickup.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              All customer cargo has been claimed by active couriers or no new shipment manifests are currently awaiting dispatch.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 d-flex justify-content-between">
              <Button asChild variant="outline" size="default" className="gap-2 shadow-xs">
                <Link to="/DriverDashboard" className="btn btn-dark">
                  <ArrowLeft className="size-4" />
                  Back to Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 mt-4">
        {/* Navigation Breadcrumb & Back Link */}
        <div className="flex items-center justify-between">
          <Link
            to="/DriverDashboard"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Driver Dashboard</span>
          </Link>
          <Badge variant="outline" className="text-xs font-mono text-muted-foreground border-border/60">
            CARGO DISPATCH QUEUE
          </Badge>
        </div>

        {/* Operational Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
              <span className="inline-block size-2 rounded-full bg-blue-500 animate-pulse" />
              <span>Available Freight Intake &bull; Driver Pickup Queue</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Available Cargo for Pickup
            </h1>
            <p className="text-sm text-muted-foreground">
              Review verified customer shipments awaiting transport and claim custody for warehouse transit.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button asChild variant="outline" size="default" className="gap-2 shadow-xs">
              <Link to="/DriverDashboard">
                <ArrowLeft className="size-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>

        {/* Error notification banner if claim fails */}
        {error && (
          <Alert variant="destructive" className="border-destructive/50">
            <AlertCircle className="size-4" />
            <AlertTitle className="text-sm font-semibold">Action Failed</AlertTitle>
            <AlertDescription className="text-xs">
              <p>{error}</p>
            </AlertDescription>
          </Alert>
        )}

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card/60 p-3 rounded-xl border border-border/60">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Filter cargo by name, description, or #serial..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-sm bg-background border-border/80"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <Boxes className="size-4 text-primary" />
            <span>
              {filteredProducts.length} of {products.length} shipments available
            </span>
          </div>
        </div>

        {/* Available Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border/80 p-12 text-center bg-card/30">
            <PackageSearch className="size-8 mx-auto text-muted-foreground mb-3" />
            <h3 className="text-base font-semibold text-foreground">No matching cargo found</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
              No available shipments match your search query.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchQuery('')}
              className="mt-4 text-xs"
            >
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="row grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((props) => (
              <div key={props.id} className="col-md-4 mb-4">
                <ProductCard
                  props={props}
                  handlePickup={handleInitiatePickup}
                  isDetail={true}
                  isDriverView={true}
                  isClaiming={selectedProduct?.id === props.id && isClaiming}
                />
              </div>
            ))}
          </div>
        )}

        {/* Bottom Actions Bar (matches test container expectations) */}
        <div className="mt-8 pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-3 d-flex justify-content-between">
          <div className="text-xs text-muted-foreground font-mono">
            Freight Intake &bull; {filteredProducts.length} items ready for transport
          </div>
          <div className="flex items-center gap-3">
            <Button asChild size="sm" variant="outline" className="gap-2">
              <Link to="/DriverDashboard" className="btn btn-dark">
                <ArrowLeft className="size-4" />
                Back
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog / Modal Window */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="size-9 rounded-lg flex items-center justify-center border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Truck className="size-4" />
              </div>
              <DialogTitle className="text-lg font-semibold tracking-tight text-foreground">
                Confirm Cargo Pickup
              </DialogTitle>
            </div>
            <DialogDescription className="text-xs text-muted-foreground leading-relaxed pt-1">
              Are you sure you want to claim this shipment for pickup? Once confirmed, this cargo will be assigned to your dispatch manifest.
            </DialogDescription>
          </DialogHeader>

          {selectedProduct && (
            <div className="rounded-lg border border-border/60 bg-muted/30 p-3 space-y-2 my-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium">Cargo Name:</span>
                <span className="font-semibold text-foreground truncate max-w-[200px]">
                  {selectedProduct.name || `Product #${selectedProduct.id}`}
                </span>
              </div>
              {selectedProduct.serial_number && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Serial Number:</span>
                  <span className="font-mono bg-muted px-1.5 py-0.5 rounded border border-border/40">
                    #{selectedProduct.serial_number}
                  </span>
                </div>
              )}
              {selectedProduct.weight && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Verified Weight:</span>
                  <span className="font-mono font-medium">{selectedProduct.weight} kg</span>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setSelectedProduct(null)}
              disabled={isClaiming}
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleConfirmPickup}
              disabled={isClaiming}
              className="gap-2 shadow-xs"
            >
              <Truck className="size-3.5" />
              <span>{isClaiming ? 'Claiming Cargo...' : 'Confirm Pickup'}</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddRequest;
