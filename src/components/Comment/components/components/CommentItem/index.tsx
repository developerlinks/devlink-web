import CustomAvatar from '@/components/CustomAvatar';
import styles from './index.module.scss';
import HoverLink from '@/components/HoverLink';
import { Button } from '@douyinfe/semi-ui';
import { User } from '@/api/types/user';

interface CommentItemProps {
  children?: React.ReactNode;
  username: string;
  comment: string;
  avatar?: string;
}

const CommentItem = ({
  children,
  username,
  comment,
  avatar,
}: CommentItemProps) => {
  return (
    <div className={styles.commentItem}>
      <div className={styles.avatar}>
        <CustomAvatar username={'bowling'} id='/' src={avatar} />
      </div>
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.username}>
            <HoverLink href='/'>{username}</HoverLink>
          </div>
          <div className={styles.time}>2023-03-16 19:47:06</div>
        </div>
        <div className={styles.content}>{comment}</div>
        <div className={styles.info}>
          <div className={styles.infoLeft}>
            <div className={styles.ip}>223.**.**116</div>
            <div className={styles.device}>Chrome</div>
            <div className={styles.dddress}>河南省</div>
          </div>
          <div className={styles.replyBtn}>
            <Button size='small'>回复</Button>
          </div>
        </div>
        <div className={styles.reply}>{children}</div>
      </div>
    </div>
  );
};
export default CommentItem;
