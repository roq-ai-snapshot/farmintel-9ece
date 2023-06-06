import * as yup from 'yup';

export const cropRecommendationValidationSchema = yup.object().shape({
  crop_name: yup.string().required(),
  planting_date: yup.date().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  farm_id: yup.string().nullable().required(),
});
