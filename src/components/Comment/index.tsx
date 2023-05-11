import useSWR from 'swr';
import CommentEditor from './components/components/CommentEditor';
import CommentItem from './components/components/CommentItem';
import styles from './index.module.scss';
import { fetcher } from '@/utils/http';
import { Material, Comment } from '@/api/types/user';
import { Spin } from '@douyinfe/semi-ui';
import CommentView from './components/components/CommentView';

interface CommentProps {
  material: Material;
}

const CommentComp = ({ material }: CommentProps) => {
  const { id } = material;
  const commentSWRKey = `/comments/${id}`;
  const { data, isLoading, error } = useSWR(commentSWRKey, fetcher);

  if (isLoading) return <Spin />;
  if (error) return <>获取评论失败，请刷新重试</>;

  const commentList = data.data as Comment[];

  return (
    <div className={styles.comment}>
      <div className={styles.submitContainer}>
        <div className={styles.commentText}>评论</div>
        <CommentEditor />
        <div className={styles.commentList}>
          <div className={styles.commentNums}>
            {commentList.length === 0
              ? '无人区，请尽情交流吧'
              : `${commentList.length}条评论`}
          </div>
          <CommentView commentList={commentList} />
        </div>
      </div>
    </div>
  );
};
export default CommentComp;
