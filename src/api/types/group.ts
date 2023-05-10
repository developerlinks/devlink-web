import { Group } from './user';

export interface GetGroup {
  groups: Group[];
  total: number;
  totalPages: number;
}

export interface NewGroupDto {
  name: string;
  description: string;
}

export interface GroupMaterialDto {
  groupId: string;
  materialId: string;
}

export interface CollectionGroupMaterialDto {
  collectionGroupId: string;
  materialId: string;
}
