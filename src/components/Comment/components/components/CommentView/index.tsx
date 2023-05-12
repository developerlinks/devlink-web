import { Comment } from '@/api/types/user';
import CommentItem from '../CommentItem';
import styles from './index.module.scss';

interface CommentViewProps {
  commentList: Comment[];
}

const renderSubComments = (subComments: Comment[]) => {
  return subComments.map((subComment) => {
    return (
      <CommentItem key={subComment.id} comment={subComment}>
        {subComment.children && renderSubComments(subComment.children)}
      </CommentItem>
    );
  });
};

const CommentView = ({ commentList }: CommentViewProps) => {
  return (
    <div className={styles.commentView}>
      {commentList.map((comment) => (
        <CommentItem key={comment.id} comment={comment}>
          {comment.children && renderSubComments(comment.children)}
        </CommentItem>
      ))}
    </div>
  );
};

export default CommentView;
