import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import useSubcategory from '../../hooks/useSubcategory';
import useCategory from '../../hooks/useCategory';
import Alert from '../../components/common/alert';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { subcategorySchema } from '../../schema/subcategory.schema';
import type { ICategory } from '../../types/category.type';

const AddSubcategory = ({ onSuccess }:any) => {
  const { loading, alertType, message, closeAlert, addSubcategory } = useSubcategory();
  const { viewCategory } = useCategory();
  const [categories, setCategories] = useState<ICategory[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(subcategorySchema),
    defaultValues: {
      name: '',
      category_id: '',
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const res:any = await viewCategory();
      if (res?.payload) {
        setCategories(res.payload.data);
      }
    };
    fetchCategories();
  }, []);

  const onSubmit = async (data:any) => {
     await addSubcategory(data);
    setTimeout(() => {
                if (onSuccess) onSuccess();
                closeAlert()
                reset();

            },1000);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      {alertType && message && (
        <Alert type={alertType} message={message} showButton={true} closeAlert={closeAlert} />
      )}

      <Form.Group controlId="subcategoryName">
        <Form.Label>Subcategory Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Subcategory Name"
          {...register('name')}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="categorySelect" className="mt-3">
        <Form.Label>Category</Form.Label>
        <Form.Select {...register('category_id')} isInvalid={!!errors.category_id}>
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errors.category_id?.message}</Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
        {loading ? 'Adding...' : 'Add Subcategory'}
      </Button>
    </Form>
  );
};

export default AddSubcategory;
