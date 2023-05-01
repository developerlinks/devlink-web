import styles from './index.module.scss';
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
import clsx from 'clsx';

interface MaterialCardProps {
  material: Material;
  isShowAvatar?: boolean;
}
moment.locale('zh-cn');
export default function MaterialCard({
  material,
  isShowAvatar = false,
}: MaterialCardProps) {
  const [user, setUser] = useState<User | null>(null);
  const { getUser } = useUserStore();

  useEffect(() => {
    getUser().then((res) => {
      setUser(res);
    });
  }, []);

  const isSelf = user?.id === material.user.id;
  const username = material.user.username;
  return (
    <div className={styles.materialCard}>
      <div className={styles.materialDetail}>
        <div className={styles.materialDetailHeader}>
          <div>
            {isSelf && (
              <>
                {isShowAvatar && (
                  <Avatar
                    style={{ width: '20px', height: '20px', marginRight: 5 }}
                    size='small'
                    username={username}
                    src={material.user?.profile?.avatar}
                  />
                )}
                <HoverLink
                  href={`/user/${material.user.id}`}
                  className={clsx(styles.name, {
                    [styles.active]: isShowAvatar,
                  })}
                  openNewTab
                >
                  {username}
                </HoverLink>
                /
              </>
            )}
            <HoverLink
              href={`/material/${material.id}`}
              className={clsx(styles.name, {
                [styles.active]: isShowAvatar,
              })}
              openNewTab
            >
              {material.name}
            </HoverLink>
          </div>
          {isSelf && (
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
