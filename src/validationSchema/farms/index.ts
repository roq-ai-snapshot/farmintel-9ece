import * as yup from 'yup';
import { cropRecommendationValidationSchema } from 'validationSchema/crop-recommendations';
import { livestockValidationSchema } from 'validationSchema/livestocks';
import { taskValidationSchema } from 'validationSchema/tasks';

export const farmValidationSchema = yup.object().shape({
  name: yup.string().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  user_id: yup.string().nullable().required(),
  crop_recommendation: yup.array().of(cropRecommendationValidationSchema),
  livestock: yup.array().of(livestockValidationSchema),
  task: yup.array().of(taskValidationSchema),
});
