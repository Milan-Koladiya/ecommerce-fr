import React, { useState } from 'react';
import { Form,Button} from 'react-bootstrap';
import useCategory from '../../hooks/useCategory';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/common/alert'

const AddCategory = ({ onSuccess }) => {
    const { loading, apiName, alertType, message, closeAlert, addCategory} = useCategory();
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await addCategory(name);
        
        if (res?.payload?.success) {
            console.log("Category added successfully, closing modal...");
            if (onSuccess) onSuccess();
        } else {
            console.log("Add category failed:", res);
        }


    };

    return (
        <Form onSubmit={onSubmit}>
            {alertType && message && (
                <Alert type={alertType} message={message} showButton={true} closeAlert={closeAlert}
                />
            )}
            <Form.Group controlId="categoryName">
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
                    {loading ? 'Adding...' : 'Add Category'}
                </Button>
            </div>
        </Form>
    );
};

export default AddCategory;
