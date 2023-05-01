import styles from './style/index.module.scss';
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
import Avatar from '../Avatar';
import HoverLink from '../HoverLink';

interface ActionCardProps {
  material: Material;
}

export default function ActionCard({ material }: ActionCardProps) {
  return (
    <div className={styles.actionCard}>
      <div className={styles.actionHeader}>
        <div className={styles.owner}>
          <Avatar
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
      <div className={styles.actionDetail}>
        <div className={styles.actionDetailHeader}>
          <HoverLink
            href={`/material/${material.id}`}
            openNewTab
            className={styles.name}
          >
            {material.name}
          </HoverLink>
          <SplitButtonGroup
            style={{ marginRight: 10 }}
            aria-label='项目操作按钮组'
          >
            <Button theme='light' type='primary'>
              收藏
            </Button>
            <Dropdown
              trigger='custom'
              showTick
              visible={false}
              position='bottomRight'
              render={<>收藏分组</>}
            >
              <Button
                style={{ padding: '8px 4px' }}
                theme='light'
                type='primary'
                icon={<IconTreeTriangleDown />}
              ></Button>
            </Dropdown>
          </SplitButtonGroup>
        </div>
        <div className={styles.actionDetailBottom}>
          <div className={styles.description}>{material.description}</div>
          <div className={styles.tags}>
            <Space>
              {material.tags.map((tag) => (
                <Tag size='small' key={tag.id}>
                  {tag.name}
                </Tag>
              ))}
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
}
