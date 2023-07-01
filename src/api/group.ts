// /group/1/materials/1

import http from '@/utils/http';
import {
  CollectionGroupMaterialDto,
  GroupMaterialDto,
  NewGroupDto,
} from '../types/group';

export function newGroup(data: NewGroupDto) {
  return http({
    url: '/group',
    method: 'post',
    data,
  });
}

export function addMaterialToGroup(data: GroupMaterialDto) {
  const { groupId, materialId } = data;
  return http({
    url: `/group/${groupId}/material/${materialId}`,
    method: 'post',
  });
}
export function removeMaterialFromGroup(data: GroupMaterialDto) {
  const { groupId, materialId } = data;
  return http({
    url: `/group/${groupId}/material/${materialId}`,
    method: 'delete',
  });
}

export function newCollectionGroup(data: NewGroupDto) {
  return http({
    url: '/collection_group',
    method: 'post',
    data,
  });
}

export function addMaterialToCollectionGroup(data: CollectionGroupMaterialDto) {
  const { collectionGroupId, materialId } = data;
  return http({
    url: `/collection_group/${collectionGroupId}/material/${materialId}`,
    method: 'post',
  });
}
export function removeMaterialFromCollectionGroup(
  data: CollectionGroupMaterialDto
) {
  const { collectionGroupId, materialId } = data;
  return http({
    url: `/collection_group/${collectionGroupId}/material/${materialId}`,
    method: 'delete',
  });
}
