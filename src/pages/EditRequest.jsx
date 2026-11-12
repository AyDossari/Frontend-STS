import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authorizedRequest } from '../lib/api';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

function EditRequest() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState('');
  const [errorMsg, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchRequest = async () => {
      setIsFetching(true);
      try {
        const response = await authorizedRequest('get', `/driver-requests/${id}/`);
        const request = response.data;
        setStatus(request.status);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch request.');
      } finally {
        setIsFetching(false);
      }
    };

    fetchRequest();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await authorizedRequest("patch", `/driver-requests/${id}/`, {
        status,
      });
      navigate('/DriverDashboard');
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError('Failed to update request.');
    }
  };

  if (errorMsg && !status && !isFetching) {
    return (
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-background px-4 py-8">
        <Card className="w-full max-w-md border-border/60 shadow-lg text-center">
          <CardHeader className="space-y-2">
            <CardTitle className="text-xl font-semibold">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              <Badge variant="destructive">
                <span aria-hidden="true">⚠</span>
                <span>{errorMsg}</span>
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-md">
        <Card
          className={cn(
            'w-full border-border/60 shadow-lg transition-all duration-700 ease-in-out',
            (isLoading || isFetching) && 'pointer-events-none scale-[0.96] opacity-0'
          )}
        >
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-semibold tracking-tight">Edit Pickup Request</CardTitle>
            <CardDescription>Update the status of this shipment pickup request</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="status" className="text-sm font-medium leading-none">
                  Status
                </Label>
                <Select
                  value={status}
                  onValueChange={(value) => setStatus(value)}
                  disabled={isLoading || isFetching}
                >
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="-- Select Status --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PickedUp">Picked Up</SelectItem>
                    <SelectItem value="Stored">Stored</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <CardFooter className="flex-col gap-2 p-0 pt-2">
                <Button type="submit" className="w-full" disabled={isLoading || isFetching}>
                  {isLoading ? 'Updating...' : 'Update Status'}
                </Button>
              </CardFooter>

              {errorMsg && (
                <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  <Badge variant="destructive">
                    <span aria-hidden="true">⚠</span>
                    <span>{errorMsg}</span>
                  </Badge>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {(isLoading || isFetching) && <FormLoadingOverlay text="LOADING" />}
      </div>
    </div>
  );
}

export default EditRequest;
