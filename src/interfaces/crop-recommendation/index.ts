import { FarmInterface } from 'interfaces/farm';

export interface CropRecommendationInterface {
  id?: string;
  farm_id: string;
  crop_name: string;
  planting_date: Date;
  created_at?: Date;
  updated_at?: Date;

  farm?: FarmInterface;
  _count?: {};
}
