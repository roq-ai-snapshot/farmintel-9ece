import * as yup from 'yup';

export const taskValidationSchema = yup.object().shape({
  description: yup.string().required(),
  status: yup.string().required(),
  due_date: yup.date().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  farm_id: yup.string().nullable().required(),
  assigned_to: yup.string().nullable().required(),
});
