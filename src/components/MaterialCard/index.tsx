import styles from './style/index.module.scss';
import {
  Button,
  Dropdown,
  Space,
  SplitButtonGroup,
  Tag,
} from '@douyinfe/semi-ui';
import moment from 'moment';
import { Material, User } from '@/api/types/user';
import { IconTreeTriangleDown } from '@douyinfe/semi-icons';
import Avatar from '../Avatar';
import HoverLink from '../HoverLink';
import useUserStore from '@/store/user';
import { useEffect, useState } from 'react';

interface MaterialCardProps {
  material: Material;
}
moment.locale('zh-cn');
export default function MaterialCard({ material }: MaterialCardProps) {
  const [user, setUser] = useState<User | null>(null);
  const { getUser } = useUserStore();

  useEffect(() => {
    getUser().then((res) => {
      setUser(res);
    });
  }, []);

  return (
    <div className={styles.materialCard}>
      <div className={styles.materialDetail}>
        <div className={styles.materialDetailHeader}>
          <div className={styles.name}>{material.name}</div>
          {user?.id !== material.user.id && (
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
          )}
        </div>
        <div className={styles.materialDetailBottom}>
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
