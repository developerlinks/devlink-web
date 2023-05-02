import http from '../utils/http';
import { AddMaterialParmas } from './types/material';

// TODO response type

export const addMaterial = (data: AddMaterialParmas) =>
  http({
    url: '/material',
    method: 'post',
    data,
  });
