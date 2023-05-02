import Avatar from '@/components/Avatar';
import styles from './index.module.scss';
import HoverLink from '@/components/HoverLink';
import { Button } from '@douyinfe/semi-ui';

interface CommentItemProps {
  children?: React.ReactNode;
}

const CommentItem = ({ children }: CommentItemProps) => {
  return (
    <div className={styles.commentItem}>
      <div className={styles.avatar}>
        <Avatar
          username={'bowling'}
          id='/'
          src={'https://qiniuyun.devlink.wiki/%E5%A4%B4%E5%83%8F.jpeg'}
        />
      </div>
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.username}>
            <HoverLink href='/'>bowling</HoverLink>
          </div>
          <div className={styles.time}>2023-03-16 19:47:06</div>
        </div>
        <div className={styles.content}>测试测试</div>
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
