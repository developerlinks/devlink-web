import internal from 'stream';

export interface LoginByPasswordParams {
  email: string;
  password: string;
}

export type RegisterByEmail = {
  email: 'string';
  password: 'string';
  code: 'string';
  username: 'string';
};

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  roles: Roles[];
  profile: Profile;
  group: Group[];
  materials: Material[];
  likes: Like[];
  stars: Material[];
  followers: Follow[];
  following: Follow[];
  tags: Tag[];
}

interface Profile {
  id: string;
  gender: Gender;
  photo: string;
  address: string;
  description: string;
  accountType: AccountType;
  refreshToken: string;
  refreshTokenExpiresAt: number;
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export declare enum AccountType {
  EMAIL = 'email',
  GITHUB = 'github',
}

export declare class Group {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  user: User;
  material: Material[];
}

export declare class Material {
  id: string;
  name: string;
  npmName: string;
  version: string;
  installCommand: string;
  startCommand: string;
  ignore: string;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  tags: Tag[];
  groups: Group[];
  comments: Comment[];
  likes: Like[];
  stars: User[];
}

export interface Tag {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  material: Material[];
  user: User;
}

export interface Like {
  id: string;
  user: User;
  materials: Material;
  likeDate: Date;
}

export interface Follow {
  id: string;
  follower: User;
  following: User;
  followDate: Date;
}
export interface Roles {
  id: number;
  name: string;
}
