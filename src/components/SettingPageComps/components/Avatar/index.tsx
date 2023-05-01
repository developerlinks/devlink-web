import EditorCard from '@/materials/EditorCard';
import { settingConfig } from '../../config';
import { useEffect, useState } from 'react';
import useUserStore from '@/store/user';
import { updateUserInfo } from '@/api/user';
import styles from './style/index.module.scss';
import { Avatar, Upload } from '@douyinfe/semi-ui';
import { IconCamera } from '@douyinfe/semi-icons';
import { ToastError, ToastSuccess } from '@/utils/common';

const AvatarettingCard = () => {
  const [defaultAvatar, setDefaultAvatar] = useState('');
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(
    'https://qiniuyun.devlink.wiki/%E5%A4%B4%E5%83%8F.jpeg'
  );

  const config = settingConfig.avatar;

  const { getUser, setUser } = useUserStore();

  useEffect(() => {
    getUser().then((res) => {
      setDefaultAvatar(res.profile.avatar);
    });
  }, []);

  const hoverMask = (
    <div className={styles.hoverMark}>
      <IconCamera />
    </div>
  );

  const api = 'https://api.semi.design/upload';
  let imageOnly = 'image/*';

  const onSuccess = (response, file) => {
    ToastSuccess('头像更新成功');
    setUrl(
      'https://sf6-cdn-tos.douyinstatic.com/obj/ttfe/ies/semi/ttmoment.jpeg'
    );
  };

  const handleSave = () => {
    setLoading(true);
    // updateUserInfo({ description: inputValue })
    //   .then((res) => {
    //     setUser(res.data);
    //     setInitialValue(res.data.profile.description);
    //     setIsExternallyDisabled(true)
    //   })
    //   .catch((err) => err)
    //   .finally(() => {
    //     setLoading(false);
    //   });
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
        <Upload
          className='avatar-upload'
          action={api}
          onSuccess={onSuccess}
          accept={imageOnly}
          showUploadList={false}
          onError={() => ToastError('上传失败')}
        >
          <Avatar src={url} style={{ margin: 4 }} hoverMask={hoverMask} />
        </Upload>
      </div>
    </EditorCard>
  );
};
export default AvatarettingCard;
