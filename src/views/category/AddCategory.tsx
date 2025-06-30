import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { categorySchema } from '../../schema/category.schama';
import useCategory from '../../hooks/useCategory';
import Alert from '../../components/common/alert';

type IAddCategoryProps= {
    onSuccess: () => void;
}

const AddCategory: React.FC<IAddCategoryProps> = ({ onSuccess }) => {
    const { loading,apiName, alertType, message, closeAlert, addCategory } = useCategory();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(categorySchema),
    });

    const onSubmit = async (data: any) => {
        const res: any = await addCategory({id:data.id,name:data.name});
        if (res?.payload?.success) {
            setTimeout(() => {
                if (onSuccess) onSuccess();
                closeAlert();
                reset();
            }, 1000);
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            {apiName?.startsWith('categories/addCategory/fullfill') && alertType && message && (
                <Alert type={alertType} message={message} showButton={true} closeAlert={closeAlert} />
            )}

            <Form.Group controlId="categoryName">
                <Form.Label>Category Name</Form.Label>
                <Form.Control type="text" placeholder="Enter category name" {...register('name')} isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
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
