import { IconCopy } from '@douyinfe/semi-icons';
import styles from './index.module.scss';
import { Notification, Button } from '@douyinfe/semi-ui';

interface NpmInstallTextProps {
  text: string;
}

export default function NpmInstallText({ text }: NpmInstallTextProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(
      () => {
        Notification.success({
          title: '复制成功',
          content: text,
          duration: 3,
          theme: 'light',
        });
      },
      (err) => {
        Notification.error({
          title: '复制失败',
          content: err,
          duration: 3,
          theme: 'light',
        });
      }
    );
  };
  return (
    <div className={styles.npmInstallText}>
      <div className={styles.npmInstallTextContent}>{text}</div>
      <div className={styles.icon}>
        <IconCopy
          style={{ fontSize: '16px', color: 'white' }}
          onClick={handleCopy}
        />
      </div>
    </div>
  );
}
