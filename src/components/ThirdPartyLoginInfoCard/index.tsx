import moment from 'moment';
import 'moment/locale/zh-cn';
import { User } from '@/api/types/user';
import Avatar from '../Avatar';
import { Button } from '@douyinfe/semi-ui';
import {
  IconCalendarClock,
  IconGithubLogo,
  IconLink,
  IconMore,
} from '@douyinfe/semi-icons';

import styles from './style/index.module.scss';
import HoverLink from '../HoverLink';

moment.locale('zh-cn');

const ThirdPartyLoginInfoCard = () => {
  return (
    <div className={styles.ThirdPartyLoginInfoCard}>
      <div className={styles.cardTitle}>第三方登录</div>
      <div className={styles.card}>
        <div className={styles.cardLeft}>
          <IconGithubLogo size='extra-large' />
          <div className={styles.userInfo}>
            <div className={styles.platformName}>Github</div>
            <div className={styles.userName}>
              <div>Zhang bao lin </div>
              <HoverLink href='' openNewTab>(@bowlingQ)</HoverLink>
            </div>
          </div>
        </div>
        <div className={styles.cardRight}>
          <div className={styles.time}>
            授权于 {moment().startOf('hour').fromNow()}
          </div>
          <div className={styles.operation}>
            <Button theme='borderless' icon={<IconMore />} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdPartyLoginInfoCard;
