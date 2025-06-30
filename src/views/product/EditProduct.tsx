import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import useCategory from '../../hooks/useCategory';
import useSubcategory from '../../hooks/useSubcategory';
import useProduct from '../../hooks/useProduct';
import Alert from '../../components/common/alert';
import type { ICategory } from '../../types/categoryType';
import type { ISubcategory } from '../../types/subcategoryType';
import type { IProduct } from '../../types/productType';

interface EditProductProps {
    product: IProduct|null;
    onSuccess: () => void;
}

const EditProduct: React.FC<EditProductProps> = ({ onSuccess, product }) => {
    const { editProduct, loading, alertType, message, closeAlert } = useProduct();
    const { viewCategory } = useCategory();
    const { viewSubcategory } = useSubcategory();

    const [categories, setCategories] = useState<ICategory[]>([]);
    const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);

    const [input, setInput] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        file: null,
        category_id: '',
        subcategory_id: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            const catRes: any = await viewCategory();
            const subRes: any = await viewSubcategory();
            if (catRes?.payload) setCategories(catRes.payload.data);
            if (subRes?.payload) setSubcategories(subRes.payload);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (
            product &&
            Object.keys(product).length > 0 &&
            categories.length > 0 &&
            subcategories.length > 0
        ) {
            setInput((prev) => ({
                ...prev,
                name: product.name || '',
                description: product.description || '',
                price: product.price || '',
                quantity: product.quantity || '',
                category_id: product.subcategory?.category?.id
                    ? product.subcategory.category.id.toString()
                    : product.category_id?.toString() || '',
                subcategory_id: product.subcategory?.id
                    ? product.subcategory.id.toString()
                    : product.subcategory_id?.toString() || '',
                file: null,
            }));
        }
    }, [product, categories, subcategories]);

    const handleChange = (e: any) => {
        const { name, type, value, files } = e.target;
        if (type === 'file') {
            setInput((prev) => ({ ...prev, file: files[0] }));
        } else {
            setInput((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', input.name);
        formData.append('description', input.description);
        formData.append('price', input.price);
        formData.append('quantity', input.quantity);
        formData.append('category_id', input.category_id);
        formData.append('subcategory_id', input.subcategory_id);
        if (input.file) {
            formData.append('file', input.file);
        }

        // for (const pair of formData.entries()) {
        //     console.log(`${pair[0]}:`, pair[1]);
        // }

        const id = product?.id;
        await editProduct({ id, formData });
        setTimeout(() => {
            if (onSuccess) onSuccess();
            closeAlert()
        }, 1000);
    };

    return (
        <div>
            {alertType && message && (
                <Alert type={alertType} message={message} showButton={true} closeAlert={closeAlert} />
            )}

            <Form onSubmit={handleSubmit} encType='multipart/form-data'>
                <Form.Group controlId="productName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter product name" value={input.name} onChange={handleChange} required
                    />
                </Form.Group>

                <Form.Group controlId="productDescription" className="mt-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" placeholder="Enter description" value={input.description} onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="productPrice" className="mt-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" name="price" placeholder="Enter price" value={input.price} onChange={handleChange} required
                    />
                </Form.Group>

                <Form.Group controlId="productQuantity" className="mt-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" name="quantity" placeholder="Enter quantity" value={input.quantity} onChange={handleChange} required />
                </Form.Group>

                <Form.Group controlId="productImage" className="mt-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" name="file" onChange={handleChange} accept="image/*" />
                    {product?.image_url&& (
                        <div className="mt-2">
                            <img
                                src={product.image_url}
                                alt="Current product"
                                width={120}
                                style={{ borderRadius: '8px', border: '1px solid #ccc' }}
                            />
                        </div>
                    )}
                </Form.Group>

                <Form.Group controlId="productCategory" className="mt-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select name="category_id" value={input.category_id} onChange={handleChange} required>
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id.toString()}>
                                {cat.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="productSubcategory" className="mt-3">
                    <Form.Label>Subcategory</Form.Label>
                    <Form.Select
                        name="subcategory_id"
                        value={input.subcategory_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Subcategory</option>
                        {subcategories.map((sub) => (
                            <option key={sub.id} value={sub.id.toString()}>
                                {sub.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-4" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Product'}
                </Button>
            </Form>
        </div>
    );
};

export default EditProduct;
