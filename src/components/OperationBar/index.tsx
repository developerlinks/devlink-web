import { Material } from '@/api/types/user';
import styles from './index.module.scss';
import { IconComment, IconLikeThumb, IconStar } from '@douyinfe/semi-icons';
import { Badge } from '@douyinfe/semi-ui';
import clsx from 'clsx';
interface OperationBarProps {
  materialId: string;
}

const OperationBar = ({ materialId }: OperationBarProps) => {
  return (
    <div className={styles.operationBar}>
      <div className={styles.operationItem}>
        <Badge count={5} className={clsx({ [styles.noActive]: false })}>
          <IconLikeThumb
            className={clsx({ [styles.iconAcive]: true })}
            style={{ fontSize: '1.3rem' }}
          />
        </Badge>
      </div>
      <div className={styles.operationItem}>
        <Badge count={3} className={clsx({ [styles.noActive]: true })}>
          <IconStar style={{ fontSize: '1.3rem' }} />
        </Badge>
      </div>
      <div className={styles.operationItem}>
        <Badge count={2} className={clsx({ [styles.noActive]: true })}>
          <IconComment style={{ fontSize: '1.3rem' }} />
        </Badge>
      </div>
    </div>
  );
};

export default OperationBar;
