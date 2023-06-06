import { CropRecommendationInterface } from 'interfaces/crop-recommendation';
import { LivestockInterface } from 'interfaces/livestock';
import { TaskInterface } from 'interfaces/task';
import { UserInterface } from 'interfaces/user';

export interface FarmInterface {
  id?: string;
  name: string;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
  crop_recommendation?: CropRecommendationInterface[];
  livestock?: LivestockInterface[];
  task?: TaskInterface[];
  user?: UserInterface;
  _count?: {
    crop_recommendation?: number;
    livestock?: number;
    task?: number;
  };
}
