import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@douyinfe/semi-ui';
import { IconCloud } from '@douyinfe/semi-icons';
import styles from './style/index.module.scss';
import { group } from 'console';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerMarketing}>
        <div className={styles.group}>
          <div className={styles.statusContinaer}>
            <Image
              src={'/images/devlink_black.svg'}
              alt='logo'
              width={100}
              height={100}
            />
            <Button
              icon={<IconCloud />}
              theme='borderless'
              style={{ marginRight: 10 }}
            >
              状态
            </Button>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.groupHeader}>产品</div>
        </div>
        <div className={styles.group}>
          <div className={styles.groupHeader}>关于我们</div>
        </div>
      </div>
      <div className={styles.filingsInfo}>
        <Link href='https://beian.miit.gov.cn/'>豫ICP备2020029001号-7</Link>
      </div>
    </div>
  );
}
