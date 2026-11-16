import { useEffect, useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import RequestCard from '../components/RequestCard'
import LogoutButton from '../components/LogoutButton'
import { authorizedRequest } from '../lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Truck,
  Plus,
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  PackageSearch,
  RefreshCw,
  ClipboardList,
} from 'lucide-react'

function DriverDashboard() {
  const navigate = useNavigate()
  const [requests, setRequests] = useState([])
  const [errorMsg, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  async function fetchDriverRequests() {
    setIsLoading(true)
    setError('')
    try {
      const response = await authorizedRequest('get', '/driver-requests/')
      setRequests(response.data?.requests || [])
    } catch (err) {
      console.error(err)
      setError('Something went wrong while fetching driver requests.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDriverRequests()
  }, [])

  // Telemetry metrics
  const metrics = useMemo(() => {
    return {
      total: requests.length,
      pending: requests.filter((r) => r.status === 'Pending').length,
      approved: requests.filter((r) => r.status === 'Approved').length,
      pickedUp: requests.filter((r) => r.status === 'PickedUp').length,
      stored: requests.filter((r) => r.status === 'Stored').length,
    }
  }, [requests])

  // Filtered requests
  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const matchesStatus =
        statusFilter === 'ALL' || req.status === statusFilter

      const q = searchQuery.toLowerCase().trim()
      const prodName = typeof req.product === 'object' ? req.product?.name : ''
      const prodSerial = typeof req.product === 'object' ? req.product?.serial_number : ''
      const matchesSearch =
        !q ||
        req.id?.toString().includes(q) ||
        req.status?.toLowerCase().includes(q) ||
        prodName?.toLowerCase().includes(q) ||
        prodSerial?.toLowerCase().includes(q)

      return matchesStatus && matchesSearch
    })
  }, [requests, statusFilter, searchQuery])

  // Loading skeleton state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Header Skeleton */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-6 animate-pulse">
            <div className="space-y-2">
              <div className="h-4 w-32 bg-muted rounded" />
              <div className="h-8 w-64 bg-muted rounded" />
            </div>
            <div className="flex gap-2">
              <div className="h-9 w-24 bg-muted rounded" />
              <div className="h-9 w-36 bg-muted rounded" />
            </div>
          </div>

          {/* Metrics Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-card border border-border/60 rounded-xl p-4" />
            ))}
          </div>

          {/* Cards Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 bg-card border border-border/60 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Error State
  if (errorMsg) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-xl mx-auto px-4 py-16">
          <Alert variant="destructive" className="border-destructive/50">
            <AlertCircle className="size-5" />
            <AlertTitle className="text-base font-semibold">Error Loading Requests</AlertTitle>
            <AlertDescription className="mt-2 text-sm leading-relaxed">
              {/* Preserves exact errorMsg string for assertions */}
              <h2>{errorMsg}</h2>
              <div className="mt-4 flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchDriverRequests}
                  className="gap-2"
                >
                  <RefreshCw className="size-4" />
                  Retry
                </Button>
                <LogoutButton variant="ghost" size="sm" />
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  // Initial Empty State (No requests registered)
  if (!requests.length) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Top minimal bar with logout */}
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
              <Truck className="size-4 text-primary" />
              <span>STS Freight Terminal &bull; Courier Dispatch</span>
            </div>
            <LogoutButton variant="outline" size="sm" />
          </div>

          <div className="container mt-5 text-center rounded-2xl border border-dashed border-border/80 bg-card/50 p-12 shadow-xs">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-muted/80 text-muted-foreground mb-4">
              <PackageSearch className="size-7" />
            </div>

            {/* Preserves exact h2 text required by e2e test suite */}
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              No requests found.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              You haven't claimed any cargo manifests or active transit requests yet. Browse available warehouse intake cargo to create your first dispatch request.
            </p>

            {/* Preserves exact Link and LogoutButton inside mt-3 d-flex justify-content-between */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 d-flex justify-content-between">
              <LogoutButton variant="outline" size="default" />
              <Button asChild size="default" className="gap-2 shadow-xs">
                {/* Preserves className btn btn-dark for test selector compatibility */}
                <Link to="/Request/add" className="btn btn-dark">
                  <Plus className="size-4" />
                  Add New request
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 mt-4">
        {/* Operational Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
              <span className="inline-block size-2 rounded-full bg-blue-500 animate-pulse" />
              <span>Dispatch Terminal &bull; Courier Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Driver Dispatch
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage claimed freight assignments, log transit milestones, and update custody logs.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <LogoutButton variant="outline" size="default" />
            <Button
              size="default"
              className="gap-2 shadow-xs cursor-pointer"
              onClick={() => navigate('/Request/add')}
            >
              <Plus className="size-4" />
              Add New Request
            </Button>
          </div>
        </div>

        {/* Telemetry Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-border/60 bg-card p-4 shadow-xs">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Total Claims</span>
              <ClipboardList className="size-4 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground font-mono">{metrics.total}</div>
            <p className="text-xs text-muted-foreground mt-1">Claimed assignments</p>
          </div>

          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 shadow-xs">
            <div className="flex items-center justify-between text-amber-700 dark:text-amber-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Pending</span>
              <Clock className="size-4" />
            </div>
            <div className="text-2xl font-bold text-amber-700 dark:text-amber-400 font-mono">
              {metrics.pending}
            </div>
            <p className="text-xs text-amber-600/80 dark:text-amber-400/80 mt-1">Awaiting dispatch start</p>
          </div>

          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 shadow-xs">
            <div className="flex items-center justify-between text-blue-700 dark:text-blue-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">In Transit</span>
              <Truck className="size-4" />
            </div>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-400 font-mono">
              {metrics.pickedUp}
            </div>
            <p className="text-xs text-blue-600/80 dark:text-blue-400/80 mt-1">In transit with courier</p>
          </div>

          <div className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-4 shadow-xs">
            <div className="flex items-center justify-between text-sky-700 dark:text-sky-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Stored</span>
              <CheckCircle2 className="size-4" />
            </div>
            <div className="text-2xl font-bold text-sky-700 dark:text-sky-400 font-mono">
              {metrics.stored}
            </div>
            <p className="text-xs text-sky-600/80 dark:text-sky-400/80 mt-1">Delivered to warehouse</p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/60 p-3 rounded-xl border border-border/60">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by status, product, or claim ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-sm bg-background border-border/80"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {[
              { id: 'ALL', label: 'All', count: metrics.total },
              { id: 'Pending', label: 'Pending', count: metrics.pending },
              { id: 'Approved', label: 'Approved', count: metrics.approved },
              { id: 'PickedUp', label: 'In Transit', count: metrics.pickedUp },
              { id: 'Stored', label: 'Stored', count: metrics.stored },
            ].map((tab) => {
              const active = statusFilter === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    active
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`font-mono text-xs px-1.5 py-0.5 rounded-full ${
                      active
                        ? 'bg-primary-foreground/20 text-primary-foreground'
                        : 'bg-background/80 text-muted-foreground'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Request Cards Grid */}
        {filteredRequests.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border/80 p-12 text-center bg-card/30">
            <PackageSearch className="size-8 mx-auto text-muted-foreground mb-3" />
            <h3 className="text-base font-semibold text-foreground">No matching requests found</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
              No delivery requests match the current search or filter criteria.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('')
                setStatusFilter('ALL')
              }}
              className="mt-4 text-xs"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="row grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRequests.map((props) => (
              <div key={props.id} className="col-md-4 mb-4">
                <RequestCard props={props} />
              </div>
            ))}
          </div>
        )}

        {/* Bottom Actions Bar */}
        <div className="mt-8 pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-3 d-flex justify-content-between">
          <div className="text-xs text-muted-foreground font-mono">
            Dispatch Feed &bull; {filteredRequests.length} of {requests.length} active assignments
          </div>
          <div className="flex items-center gap-3">
            <LogoutButton variant="outline" size="sm" />
            <Button asChild size="sm" className="gap-2">
              <Link to="/Request/add" className="btn btn-dark">
                <Plus className="size-4" />
                Add New Requests
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DriverDashboard
