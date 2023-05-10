import EditorCard from '@/materials/EditorCard';
import { settingConfig } from '../../config';
import { useEffect, useState } from 'react';
import useUserStore from '@/store/user';
import { updateUserInfo } from '@/api/user';
import styles from './index.module.scss';
import { Avatar, Upload } from '@douyinfe/semi-ui';
import { IconCamera } from '@douyinfe/semi-icons';
import { ToastError, ToastSuccess } from '@/utils/common';
import {
  BeforeUploadObjectResult,
  BeforeUploadProps,
} from '@douyinfe/semi-ui/lib/es/upload';
import UploadImg from '@/components/Upload';

const AvatarettingCard = () => {
  const [defaultAvatar, setDefaultAvatar] = useState('');

  const config = settingConfig.avatar;

  const { getUser, setUser } = useUserStore();

  useEffect(() => {
    getUser().then((res) => {
      setDefaultAvatar(res.profile.avatar);
    });
  }, []);

  const successHandle = (url) => {
    return new Promise((resolve, reject) => {
      updateUserInfo({ avatar: url })
        .then((data) => {
          setUser(data.data);
          resolve(data.data);
        })
        .catch(reject);
    });
  };

  return (
    <EditorCard
      title={config.title}
      type='customDefinition'
      description={config.description}
      tips={config.tips}
    >
      <div className={styles.avatarContainer}>
        {config.description}
        <UploadImg imageUrl={defaultAvatar} successHandle={successHandle} />
      </div>
    </EditorCard>
  );
};
export default AvatarettingCard;
