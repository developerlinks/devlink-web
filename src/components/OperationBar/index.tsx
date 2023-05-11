import { Like, Material } from '@/api/types/user';
import styles from './index.module.scss';
import { IconComment, IconLikeThumb, IconStar } from '@douyinfe/semi-icons';
import { Badge, Spin } from '@douyinfe/semi-ui';
import clsx from 'clsx';
import GroupActionBtn from '../MaterialCard/components/GroupActionBtn';
import useUserStore from '@/store/user';
import { cancelLikeMaterial, likeMaterial } from '@/api/material';
import useSWR, { mutate } from 'swr';
import { fetcher } from '@/utils/http';
import { NoticeSuccess } from '@/utils/common';

interface OperationBarProps {
  material: Material;
}

const OperationBar = ({ material }: OperationBarProps) => {
  const swrKey = `/like/material/${material.id}`;
  const { data, isLoading, error } = useSWR(swrKey, fetcher);

  const { user } = useUserStore();
  const isCollected =
    material.collectedInGroups.filter((item) => item.user?.id === user?.id)
      .length !== 0;

  const likeHandle = (materialId) => {
    const handle = isLiked ? cancelLikeMaterial : likeMaterial;
    handle(materialId)
      .then(() => {
        NoticeSuccess(`${isLiked ? '取消点赞' : '点赞成功'}`);
      })
      .catch(() => {})
      .finally(() => {
        mutate(swrKey);
      });
  };

  if (isLoading) return <Spin />;
  if (error) return <>error</>;

  const likesNum = data.data.length;
  const isLiked =
    data.data.filter((item: Like) => item.user.id === user?.id).length !== 0;

  return (
    <div className={styles.operationBar}>
      <div
        className={styles.operationItem}
        onClick={() => likeHandle(material.id)}
      >
        <Badge
          count={likesNum || null}
          className={clsx({ [styles.noActive]: !isLiked })}
        >
          <IconLikeThumb
            className={clsx({ [styles.iconAcive]: isLiked })}
            style={{ fontSize: '1.3rem' }}
          />
        </Badge>
      </div>
      <div className={styles.operationItem}>
        <GroupActionBtn material={material} isSelf={false} type='collection'>
          <Badge
            count={3}
            className={clsx({ [styles.noActive]: !isCollected })}
          >
            <IconStar
              className={clsx({ [styles.iconAcive]: isCollected })}
              style={{ fontSize: '1.3rem' }}
            />
          </Badge>
        </GroupActionBtn>
      </div>
      <div className={styles.operationItem}>
        <Badge count={2} className={clsx({ [styles.noActive]: true })}>
          <IconComment style={{ fontSize: '1.3rem' }} />
        </Badge>
      </div>
    </div>
  );
};

export default OperationBar;
