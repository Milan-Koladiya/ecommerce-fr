import * as yup from 'yup';

export const subcategorySchema = yup.object().shape({
  name: yup
    .string()
    .required('Subcategory name is required')
    .min(2, 'Subcategory name must be at least 2 characters'),
  category_id: yup.string().required('Please select a category'),
});
