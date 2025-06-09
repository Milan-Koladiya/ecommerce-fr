import * as yup from 'yup';

export const categorySchema = yup.object().shape({
  name: yup
    .string()
    .required('Category name is required')
    .min(3, 'Category name must be at least 3 characters'),
});

