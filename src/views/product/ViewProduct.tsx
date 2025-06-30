import { useState, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import DynamicModal from '../../components/dynamivModal'
import AddProduct from './AddProducts'
import useProduct from '../../hooks/useProduct'
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import EditProduct from './EditProduct'
import type { IProduct } from '../../types/product.type'

const ViewProduct = () => {
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectProduct, setSelectProduct] = useState<IProduct|null>(null)
    const { viewProduct, deleteProduct } = useProduct();
    const [product, setProduct] = useState<IProduct[]>([]);

    useEffect(() => {
        handleFetchProduct();
    }, []);

    const handleFetchProduct = async () => {
        const res:any = await viewProduct();
        if (res.payload) {
            setProduct(res.payload);
        }
    };


    const handleDelete = async (id:string) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            await deleteProduct(id);
            handleFetchProduct();

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
                                <th>Category</th>
                                <th>SubCategory</th>
                                <th>Image</th>
                                <th colSpan={2}>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(product) && product.length > 0 ? (
                                product.map((pro, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{pro.name}</td>
                                        <td>{pro.description}</td>
                                        <td>{pro.price}</td>
                                        <td>{pro.quantity}</td>
                                        <td>{pro.subcategory?.category?.name || '-'}</td>
                                        <td>{pro.subcategory?.name || '-'}</td>
                                        <td>  {pro.image_url ? (
                                            <img src={pro.image_url} alt={pro.name} style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                            // onError={(e) => { e.target.src = '/default-image.png' }}
                                            />) : (
                                            'No image'
                                        )}
                                        </td>
                                        <td>{<FaEdit onClick={() => { setSelectProduct(pro); setShowEditModal(true); }} />}</td>
                                        <td>{<MdDelete onClick={() => handleDelete(pro.id)} />}</td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={9}>No Product found.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>
            <DynamicModal show={showModal} onHide={() => setShowModal(false)} title='Add Product'>
                <AddProduct onSuccess={() => {
                    setShowModal(false);
                    handleFetchProduct();
                }
                } />
            </DynamicModal>

            <DynamicModal show={showEditModal} onHide={()=>setShowEditModal(false)} title="Edit Product">
                <EditProduct
                    product={selectProduct}
                    onSuccess={() => {
                        setShowEditModal(false);
                        setSelectProduct(null)
                        handleFetchProduct();
                    }} />
            </DynamicModal>
        </div>
    )
}

export default ViewProduct
