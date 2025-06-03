import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const AddCategory = ({ onSuccess }) => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const token = useSelector((state) => state.auth.token);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const res = await fetch('http://localhost:5500/categories/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ name }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage('Category added successfully!');
                setName('');
                if (onSuccess) onSuccess();
            } else {
                setMessage(data.message || 'Failed to add category');
            }
        } catch (error) {
            console.error(error);
            setMessage('Something went wrong!');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {message && <Alert variant="info">{message}</Alert>}
            <Form.Group controlId="categoryName">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                    type="text" placeholder="Enter category name" value={name} onChange={(e) => setName(e.target.value)} required
                />
            </Form.Group>
            <div className="text-end mt-3">
                <Button type="submit" variant="primary">Add Category</Button>
            </div>
        </Form>
    );
};

export default AddCategory;
