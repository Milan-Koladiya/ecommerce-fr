import React, { useState, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import DynamicModal from '../../components/dynamivModal'
import AddProduct from '../../views/product/AddProducts'
import useProduct from '../../hooks/useProduct'

const ViewProduct = () => {
    const [showModal, setShowModal] = useState(false);
    const { viewProduct, loading, message, error, alertType } = useProduct();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        handleFetchProduct();
    }, []);

    const handleFetchProduct = async () => {
        const res = await viewProduct();
        if (res.payload) {
            setProduct(res.payload);
        }
    };


    return (
        <div style={{ marginLeft: '180px', marginBlockStart: '50px', borderRadius: '10px', backgroundColor: '#f8f9fa', padding: '20px' }} className="product ml-50 category-layout">
            <div className="main-content">
                <h1>Product</h1>
                <div className="proButton d-flex justify-content-end mb-3">
                    <Button onClick={() => { setShowModal(true) }} variant="primary">+ Add Product</Button>
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
                                <th>Image</th>
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
                                        <td>{pro.subcategory.category.name}</td>
                                        <td>{pro.subcategory.name}</td>
                                        <td>  {

                                            pro.image_url ? (<img
                                                src={pro.image_url}
                                                alt={pro.name}
                                                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                            // onError={(e) => { e.target.src = '/default-image.png' }}
                                            />) : (
                                                'No image'
                                            )}
                                        </td>
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
            <DynamicModal show={showModal} onHide={() => setShowModal(false)} title='Add Product'>
                <AddProduct onSuccess={() => {
                    setShowModal(false);
                    fetchProduct();
                }
                } />
            </DynamicModal>
        </div>
    )
}

export default ViewProduct
