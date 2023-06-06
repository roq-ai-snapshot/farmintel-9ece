import * as yup from 'yup';

export const livestockValidationSchema = yup.object().shape({
  species: yup.string().required(),
  health_status: yup.string().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  farm_id: yup.string().nullable().required(),
});
