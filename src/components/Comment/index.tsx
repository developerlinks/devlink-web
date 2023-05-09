import { MarkdownEditor } from '../Markdown';
import CommentEditor from './components/components/CommentEditor';
import CommentItem from './components/components/CommentItem';
import styles from './index.module.scss';

const Comment = () => {
  return (
    <div className={styles.comment}>
      <div className={styles.submitContainer}>
        <div className={styles.commentText}>评论</div>
        <CommentEditor />
        <div className={styles.commentList}>
          <div className={styles.commentNums}>3条评论</div>
          <CommentItem
            username={'devlink 官方'}
            comment='看起来很不错哦'
            avatar='https://qiniuyun.devlink.wiki/%E5%A4%B4%E5%83%8F.jpeg'
          >
            <CommentItem username={'小张'} comment='+1' />
          </CommentItem>
          <CommentItem username='小张' comment='加油～' />
        </div>
      </div>
    </div>
  );
};
export default Comment;
