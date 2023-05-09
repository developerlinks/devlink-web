// /group/1/materials/1

import http from '@/utils/http';
import { GroupMaterialDto, NewGroupDto } from './types/group';

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
