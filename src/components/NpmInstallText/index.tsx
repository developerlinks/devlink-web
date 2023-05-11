import { IconCopy } from '@douyinfe/semi-icons';
import styles from './index.module.scss';
import { Notification, Button } from '@douyinfe/semi-ui';
import { handleCopy } from '@/utils/common';

interface NpmInstallTextProps {
  text: string;
}

export default function NpmInstallText({ text }: NpmInstallTextProps) {
  return (
    <div className={styles.npmInstallText}>
      <div className={styles.npmInstallTextContent}>{text}</div>
      <div className={styles.icon} onClick={() => handleCopy(text)}>
        <IconCopy style={{ fontSize: '16px', color: 'white' }} />
      </div>
    </div>
  );
}
