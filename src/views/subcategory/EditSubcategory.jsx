import React, { useState, useEffect } from 'react'
import { Button, Table, Form } from 'react-bootstrap'
import useSubcategory from '../../hooks/useSubcategory'
import useCategory from '../../hooks/useCategory'
import Alert from '../../components/common/alert'

const EditSubcategory = ({ onSuccess, subcategory }) => {
    const { loading, alertType, message, closeAlert, editSubcategory } = useSubcategory();
    const { viewCategory } = useCategory();

    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (subcategory) {
            setName(subcategory.name);
            setCategoryId(subcategory.category_id);
        }
    }, [subcategory]);

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await viewCategory();
            if (res?.payload) {
                setCategories(res.payload);
            }
        };
        fetchCategories();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await editSubcategory(subcategory.id, {
            name,
            category_id: categoryId,
        });
        setTimeout(() => {
            if (onSuccess) onSuccess();
            closeAlert()
        }, 1000);
    };

    return (
        <Form onSubmit={onSubmit}>
            {alertType && message && (
                <Alert type={alertType} message={message} showButton={true} closeAlert={closeAlert} />
            )}

            <Form.Group controlId="subcategoryName">
                <Form.Label>Subcategory Name</Form.Label>
                <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Subcategory Name"
                    required
                />
            </Form.Group>

            <Form.Group controlId="categorySelect" className="mt-3">
                <Form.Label>Category</Form.Label>
                <Form.Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required
                >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
                {loading ? 'Editing...' : 'Edit Subcategory'}
            </Button>
        </Form>
    );
};

export default EditSubcategory
