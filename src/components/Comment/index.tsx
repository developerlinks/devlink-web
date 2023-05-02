import { MarkdownEditor } from '../Markdown';
import CommentEditor from './components/components/CommentEditor';
import CommentItem from './components/components/CommentItem';
import styles from './index.module.scss';

const Comment = () => {
  return (
    <div className={styles.comment}>
      <div className={styles.submitContainer}>
        <CommentEditor />
        <div className={styles.commentList}>
          <div className={styles.commentNums}>3条留言</div>
          <CommentItem>
            <CommentItem />
          </CommentItem>
          <CommentItem />
        </div>
      </div>
    </div>
  );
};
export default Comment;
