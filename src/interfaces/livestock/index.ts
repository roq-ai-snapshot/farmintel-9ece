import { FarmInterface } from 'interfaces/farm';

export interface LivestockInterface {
  id?: string;
  farm_id: string;
  species: string;
  health_status: string;
  created_at?: Date;
  updated_at?: Date;

  farm?: FarmInterface;
  _count?: {};
}
