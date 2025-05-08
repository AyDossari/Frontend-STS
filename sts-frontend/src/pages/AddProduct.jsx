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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await authorizedRequest('post', '/products/', {
        name,
        description,
        weight,
      });
      navigate('/CustomerDashboard'); 
    } catch (err) {
      console.log(err);
      setError('Failed to add product.');
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
      <PostForm
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        weight={weight}
        setWeight={setWeight}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default AddProduct;
