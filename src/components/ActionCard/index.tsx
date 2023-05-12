import styles from './index.module.scss';
import {
  Button,
  Dropdown,
  Space,
  SplitButtonGroup,
  Tag,
} from '@douyinfe/semi-ui';
import moment from 'moment';
import { Material } from '@/api/types/user';
import { IconTreeTriangleDown } from '@douyinfe/semi-icons';
import CustomAvatar from '../CustomAvatar';
import HoverLink from '../HoverLink';
import MaterialCard from '../MaterialCard';

interface ActionCardProps {
  material: Material;
}

export default function ActionCard({ material }: ActionCardProps) {
  return (
    <div className={styles.actionCard}>
      <div className={styles.actionHeader}>
        <div className={styles.owner}>
          <CustomAvatar
            id={material.user.id}
            src={material.user.profile?.avatar ?? ''}
            username={material.user.username}
            size='small'
          />
          <HoverLink href={`/user/${material.user.id}`} openNewTab>
            {material.user.username}
          </HoverLink>
        </div>
        <div className={styles.action}>创建了物料</div>
        <div className={styles.actionTime}>
          {moment(material.createdAt).startOf('hour').fromNow()}
        </div>
      </div>
      <MaterialCard displaySelfName={false} material={material} />
    </div>
  );
}
