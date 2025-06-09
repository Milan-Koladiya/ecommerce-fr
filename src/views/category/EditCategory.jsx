import React, { useEffect } from 'react';
import useCategory from '../../hooks/useCategory';
import { Button, Form } from 'react-bootstrap';
import Alert from '../../components/common/alert';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { categorySchema } from '../../schema/category.schama';

const EditCategory = ({ onSuccess, category }) => {
  const { loading, alertType, message, closeAlert, EditCategory } = useCategory();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(categorySchema),
    defaultValues: {
      name: '',
    },
  });

  useEffect(() => {
    if (category) {
      setValue('name', category.name);
    }
  }, [category, setValue]);

const onSubmit = async (data) => {
  const res = await EditCategory(category.id, { name: data.name });

  if (res?.payload?.success) {
    setTimeout(() => {
        closeAlert();
      if (onSuccess) onSuccess();
    }, 1000); 
  }
};

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      {alertType && message && (
        <Alert type={alertType} message={message} showButton={true} closeAlert={closeAlert} />
      )}

      <Form.Group controlId="categoryName">
        <Form.Label>Category Name</Form.Label>
        <Form.Control type="text" placeholder="Enter category name" {...register('name')} isInvalid={!!errors.name} />
        <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
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
