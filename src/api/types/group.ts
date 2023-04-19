import { Group } from './user';

export interface GetGroup {
  groups: Group[];
  total: number;
  totalPages: number;
}
