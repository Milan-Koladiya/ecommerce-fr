 import { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { productSchema } from '../../schema/product.schema';
import useCategory from '../../hooks/useCategory';
import useSubcategory from '../../hooks/useSubcategory';
import useProduct from '../../hooks/useProduct';
import Alert from '../../components/common/alert';
import type { ICategory } from '../../types/category.type';
import type { ISubcategory } from '../../types/subcategory.type';

const AddProductView = ({ onSuccess }:any) => {
  const { addProduct, loading, alertType, message, closeAlert } = useProduct();
  const { viewCategory } = useCategory();
  const { viewSubcategory } = useSubcategory();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);

  const hasFetched = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      quantity:0,
      file: undefined,
      category_id: '',
      subcategory_id: '',
    },
  });

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchData = async () => {
      const catRes:any = await viewCategory();
      const subRes:any = await viewSubcategory();
      if (catRes?.payload) setCategories(catRes.payload.data);
      if (subRes?.payload) setSubcategories(subRes.payload);
    };
    fetchData();
  }, [viewCategory, viewSubcategory]);

  const onSubmit = async (data:any) => {
    const formData:any = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

     await addProduct(formData);

    setTimeout(() => {
      if (onSuccess) onSuccess();
      closeAlert();
      reset();
    }, 1000);
  };

  const handleFileChange = (e:any) => {
    const file = e.target.files[0];
    setValue('file', file);
  };

  return (
    <div>
      {alertType && message && (
        <Alert type={alertType} message={message} showButton={true} closeAlert={closeAlert} />
      )}

      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Form.Group controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            {...register('name')}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="productDescription" className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            {...register('description')}
          />
        </Form.Group>

        <Form.Group controlId="productPrice" className="mt-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            {...register('price')}
            isInvalid={!!errors.price}
          />
          <Form.Control.Feedback type="invalid">
            {errors.price?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="productQuantity" className="mt-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter quantity"
            {...register('quantity')}
            isInvalid={!!errors.quantity}
          />
          <Form.Control.Feedback type="invalid">
            {errors.quantity?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="productImage" className="mt-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            isInvalid={!!errors.file}
          />
          <Form.Control.Feedback type="invalid">
            {errors.file?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="productCategory" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Select {...register('category_id')}  isInvalid={!!errors.category_id} >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.category_id?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="productSubcategory" className="mt-3">
          <Form.Label>Subcategory</Form.Label>
          <Form.Select {...register('subcategory_id')} isInvalid={!!errors.subcategory_id}>
            <option value="">Select Subcategory</option>
            {subcategories.map((sub) => (
              <option key={sub.id} value={sub.id}>{sub.name}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.subcategory_id?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4" disabled={loading}>
          {loading ? 'Adding...' : 'Add Product'}
        </Button>
      </Form>
    </div>
  );
};

export default AddProductView;
