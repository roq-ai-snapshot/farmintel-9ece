import { FarmInterface } from 'interfaces/farm';
import { UserInterface } from 'interfaces/user';

export interface TaskInterface {
  id?: string;
  farm_id: string;
  assigned_to: string;
  description: string;
  status: string;
  due_date: Date;
  created_at?: Date;
  updated_at?: Date;

  farm?: FarmInterface;
  user?: UserInterface;
  _count?: {};
}
