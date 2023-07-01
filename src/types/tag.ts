import { Tag } from './user';

export interface GetTag {
  tags: Tag[];
  total: number;
  totalPages: number;
}
