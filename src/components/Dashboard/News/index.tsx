import ProjectStatus from '@/components/ProjectStatus';
import styles from './index.module.scss';
import StrIcon from '@/materials/StrIcon';
import { IconApps } from '@douyinfe/semi-icons';
import HoverLink from '@/components/HoverLink';

export default function News() {
  return (
    <div className={styles.news}>
      <div className={styles.changelog}>
        <div className={styles.tips}>
          <div className={styles.title}>最新变化</div>
          <div className={styles.content}>
            <div className={styles.item}>
              <IconApps style={{ marginRight: '8px' }} />
              点击
              <StrIcon>
                <HoverLink href='https://devlink.wiki/commitlist' openNewTab>
                  devlink
                </HoverLink>
              </StrIcon>
              查看开发日志
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
