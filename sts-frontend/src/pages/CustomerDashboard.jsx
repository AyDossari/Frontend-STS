import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductsCard'
import LogoutButton from '../components/LogoutButton';
import { authorizedRequest } from '../lib/api'
import { Link } from 'react-router-dom';


function CustomerDashboard() {
    const [products, setProducts] = useState([])
    const [errorMsg, setError] = useState('')

    async function fetchCustomerProducts() {
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            const response = await authorizedRequest('get', '/products/')
            setProducts(response.data)
        } catch (err) {
            console.error(err)
            setError('Something went wrong while fetching products.')
        }
    }

    useEffect(() => {
        fetchCustomerProducts()
    }, [])

    if (errorMsg) return <h2>{errorMsg}</h2>
    if (!products.length) {
        return (
          <div className="container mt-5 text-center">
            <h2>No products found.</h2>
            <div className="mt-3 d-flex justify-content-between">
              <LogoutButton />
              <Link to="/products/add" className="btn btn-dark">
                Add New Product
              </Link>
            </div>
          </div>
        )
      }
    
    return (
        <>
            <div className="container mt-4">
                <div className="row">
                    {products.map(props => (
                        <div key={props.id} className="col-md-4 mb-4">
                            <ProductCard props={props} />
                        </div>
                    ))}
                </div>
                <div className="mt-3 d-flex justify-content-between">
                    <LogoutButton />
                    <Link to="/products/add" className="btn btn-dark">
                        Add New Product
                    </Link>
                </div>
            </div>
        </>
    )
}

export default CustomerDashboard
