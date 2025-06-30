import * as yup from 'yup';

export const productSchema = yup.object().shape({
  name: yup.string().required('Product name is required'),
  description: yup.string(),
  price: yup
    .number()
    .typeError('Price must be a number')
    .required('Price is required')
    .positive('Price must be positive'),
  quantity: yup
    .number()
    .typeError('Quantity must be a number')
    .required('Quantity is required')
    .integer('Quantity must be an integer')
    .min(1, 'Quantity must be at least 1'),
  file: yup.mixed().required('Product image is required'),
  category_id: yup.string().required('Category is required'),
  subcategory_id: yup.string().required('Subcategory is required'),
});
