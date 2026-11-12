import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';
import { authorizedRequest } from '../lib/api';

function AddProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await authorizedRequest('post', '/products/', {
        name,
        description,
        weight,
      });
      navigate('/CustomerDashboard'); 
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError('Failed to add product.');
    }
  };

  return (
    <PostForm
      title="Add New Product"
      subtitle="Create a new shipment product for pickup"
      submitText="Add Product"
      name={name}
      setName={setName}
      description={description}
      setDescription={setDescription}
      weight={weight}
      setWeight={setWeight}
      handleSubmit={handleSubmit}
      error={error}
      isLoading={isLoading}
    />
  );
}

export default AddProduct;
