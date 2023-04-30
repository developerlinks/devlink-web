import moment from 'moment';
import 'moment/locale/zh-cn';
import { User } from '@/api/types/user';
import Avatar from '../Avatar';
import { Button } from '@douyinfe/semi-ui';
import { IconCalendarClock, IconLink } from '@douyinfe/semi-icons';

import styles from './style/index.module.scss';

moment.locale('zh-cn');

const UserInfoCard = (user: User) => {
  const {
    username,
    profile: { avatar, description, createdAt },
    followers,
    following,
  } = user;
  return (
    <div className={styles.userInfoCard}>
      <div className={styles.userAvatarContainer}>
        <Avatar username={username} avatar={avatar ?? ''} size='large' />
      </div>
      <div className={styles.userName}>{username}</div>
      <div className={styles.operationBar}>
        <div className={styles.operationItem}>
          <Button type='primary' theme='solid'>
            关注
          </Button>
        </div>
        <div className={styles.operationItem}>
          <Button icon={<IconLink />}>分享</Button>
        </div>
      </div>
      {description && (
        <div className={styles.description}>
          <div className={styles.descriptionContent}>{description}</div>
        </div>
      )}
      <div className={styles.situation}>
        <div className={styles.situationItem}>
          <div className={styles.situationItemTitle}>粉丝</div>
          <div className={styles.situationItemValue}>{followers.length}</div>
        </div>
        <div className={styles.situationItem}>
          <div className={styles.situationItemTitle}>关注</div>
          <div className={styles.situationItemValue}>{following.length}</div>
        </div>
        <div className={styles.situationItem}>
          <div className={styles.situationItemTitle}>获赞</div>
          <div className={styles.situationItemValue}>{following.length}</div>
        </div>
        <div className={styles.situationItem}>
          <div className={styles.situationItemTitle}>物料使用量</div>
          <div className={styles.situationItemValue}>{following.length}</div>
        </div>
      </div>
      <div className={styles.creatAt}>
        <IconCalendarClock />
        {moment(createdAt).format('ll')}
      </div>
    </div>
  );
};

export default UserInfoCard;
