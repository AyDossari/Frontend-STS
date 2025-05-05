import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authorizedRequest } from '../lib/api';
import PostForm from '../components/PostForm';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [errorMsg, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await authorizedRequest('get', `/products/${id}/`);
        const product = response.data;
        setName(product.name);
        setDescription(product.description);
        setWeight(product.weight);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch product.');
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await authorizedRequest("patch", `/products/${id}/`, {
        name,
        description,
        weight,
      });
      navigate(`/products/${id}`);
    } catch (err) {
      console.log(err);
      setError('Failed to update product.');
    }
  };

  if (errorMsg) return <h2>{errorMsg}</h2>;

  return (
    <PostForm
      handleSubmit={handleSubmit}
      name={name}
      setName={setName}
      description={description}
      setDescription={setDescription}
      weight={weight}
      setWeight={setWeight}
    />
  );
}

export default EditProduct;
