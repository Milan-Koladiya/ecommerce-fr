import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Slidebar from './Slidebar'
import { Table, Button } from 'react-bootstrap'
import '../css/product.css'
import DynamicModal from './DynamicDialog'
import AddProduct from './AddProduct'

const Product = () => {
    const [product, setProduct] = useState([])
    const [modal, setModal] = useState(false)
    const token = useSelector(state => state.auth.token)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch("http://localhost:5500/product/", {
                    method: 'get',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }

                })

                if (!res.ok) {
                    console.log('error')
                }

                const data = await res.json()
                setProduct(data.data || [])
            }
            catch (error) {
                console.log(error)
            }
        }
        if (token) {
            fetchProduct()
        }
    }, [token])


    return (
        <div className="product ml-50 category-layout">
            <Slidebar />
            <div className="main-content">
                <h1>Product</h1>
                <div className="proButton d-flex justify-content-end mb-3">
                    <Button onClick={() => { setModal(true) }} variant="primary">+ Add Product</Button>
                </div>
                <div className="table-container">
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>SubCategory</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product.length > 0 ? (
                                product.map((pro, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{pro.name}</td>
                                        <td>{pro.description}</td>
                                        <td>{pro.price}</td>
                                        <td>{pro.quantity}</td>
                                        <td>{pro.subcategory.name}</td>
                                        <td>{pro.subcategory.category.name}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No categories found.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>
            <DynamicModal show={modal} onHide={() => setModal(false)} title='Add Product'>
                <AddProduct onSuccess={() => {
                    setModal(false);
                    fetchProduct();
                }
                } />
            </DynamicModal>
        </div>
    )
}

export default Product
