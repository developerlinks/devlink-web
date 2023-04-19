import { Group, Material, Tag } from './user';

export interface GetMyMaterial {
  materials: Material[];
  total: number;
}

export interface AddMaterialParmas {
  name: string;
  npmName: string;
  version: string;
  isPrivate: boolean;
  tags: string[];
  groups: string[];
  installCommand?: string;
  startCommand?: string;
  ignore?: string;
}
