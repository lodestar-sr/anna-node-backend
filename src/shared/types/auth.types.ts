import { UserRole } from '../constants/global.constants';

export interface Payload {
  id: number;
  email: string;
  role: UserRole;
}
