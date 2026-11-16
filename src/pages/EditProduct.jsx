import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authorizedRequest } from '../lib/api';
import PostForm from '../components/PostForm';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [errorMsg, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsFetching(true);
      try {
        const response = await authorizedRequest('get', `/products/${id}/`);
        const product = response.data;
        setName(product.name);
        setDescription(product.description);
        setWeight(product.weight);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch product.');
      } finally {
        setIsFetching(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await authorizedRequest("patch", `/products/${id}/`, {
        name,
        description,
        weight,
      });
      navigate(`/products/${id}`);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError('Failed to update product.');
    }
  };

  if (errorMsg && !name && !isFetching) {
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
    <PostForm
      title="Edit Product"
      subtitle="Update the specifications for this shipment product"
      badgeText="SPECIFICATION UPDATE"
      submitText="Save Changes"
      handleSubmit={handleSubmit}
      name={name}
      setName={setName}
      description={description}
      setDescription={setDescription}
      weight={weight}
      setWeight={setWeight}
      error={errorMsg}
      isLoading={isLoading || isFetching}
      onCancel={() => navigate(`/products/${id}`)}
    />
  );
}

export default EditProduct;
