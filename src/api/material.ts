import http from '../utils/http';
import { AddMaterialParmas, CreateCommentDto } from '../types/material';

// TODO response type

export const addMaterial = (data: AddMaterialParmas) =>
  http({
    url: '/material',
    method: 'post',
    data,
  });

export const likeMaterial = (materialId: string) =>
  http({
    url: `/like/${materialId}`,
    method: 'post',
  });

export const cancelLikeMaterial = (materialId: string) =>
  http({
    url: `/like/${materialId}`,
    method: 'delete',
  });

export const addCommentToMaterial = (data: CreateCommentDto) =>
  http({
    url: `/comments`,
    method: 'post',
    data,
  });

export const deleteCommentInMaterial = (commentId: string) =>
  http({
    url: `/comments/${commentId}`,
    method: 'delete',
  });
