  // import React, { useState, useEffect } from 'react';
  // import { Form, Button } from 'react-bootstrap';
  // import useCategory from '../../hooks/useCategory';
  // import useSubcategory from '../../hooks/useSubcategory';
  // import useProduct from '../../hooks/useProduct';
  // import Alert from '../../components/common/alert';

  // const AddProductView = ({ onSuccess }) => {
  //   const { addProduct, loading, alertType, message, closeAlert } = useProduct();
  //   const { viewCategory } = useCategory();
  //   const { viewSubcategory } = useSubcategory();

  //   const [categories, setCategories] = useState([]);
  //   const [subcategories, setSubcategories] = useState([]);

  // const [input, setInput] = useState({
  //   name: '',
  //   description: '',
  //   price: '',
  //   quantity: '',
  //   file: null, 
  //   category_id: '',
  //   subcategory_id: '',
  // });

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const catRes = await viewCategory();
  //       const subRes = await viewSubcategory();
  //       if (catRes?.payload) setCategories(catRes.payload);
  //       if (subRes?.payload) setSubcategories(subRes.payload);
  //     };
  //     fetchData();
  //   }, []);

    
  //   const handleChange = (e) => {
  //   const { name, type, value, files } = e.target;
  //   if (type === 'file') {
  //     setInput(prev => ({ ...prev, file: files[0] }));
  //   } else {
  //     setInput(prev => ({ ...prev, [name]: value }));
  //   }
  // };

  //   const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append('name', input.name);
  //   formData.append('description', input.description);
  //   formData.append('price', input.price);
  //   formData.append('quantity', input.quantity);
  //   formData.append('category_id', input.category_id);
  //   formData.append('subcategory_id', input.subcategory_id);
  //   if (input.file) {
  //     formData.append('file', input.file); 
  //   }

  //   console.log(formData)
  //   const res = await addProduct(formData);
  //       setTimeout(() => {
  //           if (onSuccess) onSuccess();
  //           closeAlert()
  //       }, 1000);    
  // };

  //   return (
  //     <div>
  //       {alertType && message && (
  //         <Alert type={alertType} message={message} showButton={true} closeAlert={closeAlert} />
  //       )}

  //       <Form onSubmit={handleSubmit}>
  //         <Form.Group controlId="productName">
  //           <Form.Label>Product Name</Form.Label>
  //           <Form.Control
  //             type="text"
  //             name="name"
  //             placeholder="Enter product name"
  //             value={input.name}
  //             onChange={handleChange}
  //             required
  //           />
  //         </Form.Group>

  //         <Form.Group controlId="productDescription" className="mt-3">
  //           <Form.Label>Description</Form.Label>
  //           <Form.Control
  //             as="textarea"
  //             rows={3}
  //             name="description"
  //             placeholder="Enter description"
  //             value={input.description}
  //             onChange={handleChange}
  //           />
  //         </Form.Group>

  //         <Form.Group controlId="productPrice" className="mt-3">
  //           <Form.Label>Price</Form.Label>
  //           <Form.Control
  //             type="number"
  //             name="price"
  //             placeholder="Enter price"
  //             value={input.price}
  //             onChange={handleChange}
  //             required
  //           />
  //         </Form.Group>

  //         <Form.Group controlId="productQuantity" className="mt-3">
  //           <Form.Label>Quantity</Form.Label>
  //           <Form.Control
  //             type="number"
  //             name="quantity"
  //             placeholder="Enter quantity"
  //             value={input.quantity}
  //             onChange={handleChange}
  //             required
  //           />
  //         </Form.Group>

  //         <Form.Group controlId="productImage" className="mt-3">
  //           <Form.Label>Image</Form.Label>
  //           <Form.Control
  //             type="file"
  //             name="file" 
  //             onChange={handleChange}
  //             accept="image/*"
  //             required
  //           />
  //         </Form.Group>

  //         <Form.Group controlId="productCategory" className="mt-3">
  //           <Form.Label>Category</Form.Label>
  //           <Form.Select
  //             name="category_id"
  //             value={input.category_id}
  //             onChange={handleChange}
  //             required
  //           >
  //             <option value="">Select Category</option>
  //             {categories.map(cat => (
  //               <option key={cat.id} value={cat.id}>{cat.name}</option>
  //             ))}
  //           </Form.Select>
  //         </Form.Group>

  //         <Form.Group controlId="productSubcategory" className="mt-3">
  //           <Form.Label>Subcategory</Form.Label>
  //           <Form.Select
  //             name="subcategory_id"
  //             value={input.subcategory_id}
  //             onChange={handleChange}
  //             required
  //           >
  //             <option value="">Select Subcategory</option>
  //             {subcategories.map(sub => (
  //               <option key={sub.id} value={sub.id}>{sub.name}</option>
  //             ))}
  //           </Form.Select>
  //         </Form.Group>

  //         <Button variant="primary" type="submit" className="mt-4" disabled={loading}>
  //           {loading ? 'Adding...' : 'Add Product'}
  //         </Button>
  //       </Form>
  //     </div>
  //   );
  // };

  // export default AddProductView;


  import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { productSchema } from '../../schema/product.schema';
import useCategory from '../../hooks/useCategory';
import useSubcategory from '../../hooks/useSubcategory';
import useProduct from '../../hooks/useProduct';
import Alert from '../../components/common/alert';

const AddProductView = ({ onSuccess }) => {
  const { addProduct, loading, alertType, message, closeAlert } = useProduct();
  const { viewCategory } = useCategory();
  const { viewSubcategory } = useSubcategory();

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

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
      price: '',
      quantity: '',
      file: null,
      category_id: '',
      subcategory_id: '',
    },
  });

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchData = async () => {
      const catRes = await viewCategory();
      const subRes = await viewSubcategory();
      if (catRes?.payload) setCategories(catRes.payload);
      if (subRes?.payload) setSubcategories(subRes.payload);
    };
    fetchData();
  }, [viewCategory, viewSubcategory]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    const res = await addProduct(formData);

    setTimeout(() => {
      if (onSuccess) onSuccess();
      closeAlert();
      reset();
    }, 1000);
  };

  const handleFileChange = (e) => {
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
