import { Comment, Like, Material } from '@/api/types/user';
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
  const {
    data: likeData,
    isLoading: likeFetchIsloading,
    error: likeDataError,
  } = useSWR(swrKey, fetcher);

  const commentSWRKey = `/comments/${material.id}`;
  const {
    data: commentData,
    isLoading: commentFetchIsLoading,
    error: commentFetchError,
  } = useSWR(commentSWRKey, fetcher);

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

  if (likeFetchIsloading || commentFetchIsLoading) return <Spin />;
  if (likeDataError || commentFetchError) return <>error</>;

  const likesNum = likeData.data.length;
  const isLiked =
    likeData.data.filter((item: Like) => item.user.id === user?.id).length !==
    0;

  let commentNum = 0;
  commentData.data.forEach((item: Comment) => {
    commentNum++;
    item.children.map((item) => {
      commentNum++;
    });
  });
  const isCommented =
    commentData.data.filter((item: Comment) => item.user.id === user?.id)
      .length !== 0;

  function getUniqueUserCollectionCount(material: Material): number {
    if (!material.collectedInGroups) return 0;

    const countedUsers = new Set<string>();
    material.collectedInGroups.forEach((group) => {
      if (group !== null && group.user !== null) {
        countedUsers.add(group.user.id);
      }
    });

    return countedUsers.size;
  }

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
            count={getUniqueUserCollectionCount(material) || null}
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
        <Badge
          count={commentNum || null}
          className={clsx({ [styles.noActive]: !isCommented })}
        >
          <IconComment
            className={clsx({ [styles.iconAcive]: isCommented })}
            style={{ fontSize: '1.3rem' }}
          />
        </Badge>
      </div>
    </div>
  );
};

export default OperationBar;
