import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductsCard'

function CustomerDashboard() {
    const [products, setProducts] = useState([])
    const [errorMsg, setError] = useState('')

    async function fetchCustomerProducts() {
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            const response = await axios.get(`${apiUrl}/products/`)
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
    if (!products.length) return <h2>No products found.</h2>

    return (
        <>
            {products.map(product => (
                <ProductCard key={product.id} product={product}  />
            ))}
        </>
    )
}

export default CustomerDashboard
