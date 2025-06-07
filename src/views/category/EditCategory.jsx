import React, { useState, useEffect } from 'react';
import useCategory from '../../hooks/useCategory';
import { Button, Form } from 'react-bootstrap';
import Alert from '../../components/common/alert';

const EditCategory = ({ onSuccess, category }) => {
    const { loading, alertType, message, closeAlert, EditCategory } = useCategory();

    const [name, setName] = useState('');
    const [id, setId] = useState(null);

    useEffect(() => {
        if (category) {
            setName(category.name);
            setId(category.id);
        }
    }, [category]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await EditCategory(id, { name });
        if (onSuccess) onSuccess();

    };

    return (
        <Form onSubmit={onSubmit}>

            <Form.Group controlId="categoryName">
                {/* {alertType && message && (
                                            <Alert type={alertType} message={message} showButton={true} closeAlert={closeAlert} />   
                )} */}
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter category name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </Form.Group>
            <div className="text-end mt-3">
                <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? 'Editing...' : 'Edit Category'}
                </Button>
            </div>
        </Form>
    );
};

export default EditCategory;
