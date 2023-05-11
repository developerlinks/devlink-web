import CustomAvatar from '@/components/CustomAvatar';
import styles from './index.module.scss';
import HoverLink from '@/components/HoverLink';
import { Button, Dropdown, Spin } from '@douyinfe/semi-ui';
import { Comment, User } from '@/api/types/user';
import moment from 'moment';
import { MarkdownView } from '@/components/Markdown';
import { IconMore } from '@douyinfe/semi-icons';
import { useState } from 'react';
import useUserStore from '@/store/user';
import { deleteCommentInMaterial } from '@/api/material';
import { NoticeSuccess } from '@/utils/common';
import { mutate } from 'swr';
import { useRouter } from 'next/router';
import CommentEditor from '../CommentEditor';

interface CommentItemProps {
  children?: React.ReactNode;
  comment: Comment;
}

const CommentItem = ({ children, comment }: CommentItemProps) => {
  const {
    id: commentId,
    content,
    user: {
      id,
      username,
      profile: { avatar },
    },
    updateAt,
  } = comment;

  const { query } = useRouter();
  const { materialId } = query;

  const commentSWRKey = `/comments/${materialId}`;

  const { user } = useUserStore();
  const isSelf = id === user?.id;

  const [operationVisible, setOperationVisible] = useState(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  const [showEditor, setShowEditor] = useState(false);

  const deleteCommentHandle = () => {
    if (deleteIsLoading) return;
    setDeleteIsLoading(true);
    deleteCommentInMaterial(commentId)
      .then(() => {
        mutate(commentSWRKey);
        NoticeSuccess('评论删除成功');
      })
      .catch(() => {})
      .finally(() => {
        setDeleteIsLoading(false);
      });
  };
  return (
    <div className={styles.commentItem}>
      <div className={styles.avatar}>
        <CustomAvatar username={username} id='/' src={avatar} />
      </div>
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.headerUserinfo}>
            <div className={styles.username}>
              <HoverLink href='/'>{username}</HoverLink>
            </div>
            <div className={styles.time}>
              {moment(updateAt).startOf('hour').fromNow()}
            </div>
          </div>
          <div className={styles.headerOperation}>
            <Dropdown
              position={'bottomLeft'}
              trigger='custom'
              visible={operationVisible}
              onClickOutSide={() => setOperationVisible(false)}
              render={
                <Dropdown.Menu>
                  <Dropdown.Item disabled>举报</Dropdown.Item>
                  {isSelf && (
                    <Dropdown.Item onClick={deleteCommentHandle}>
                      {deleteIsLoading && <Spin />}删除
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              }
            >
              <Button
                size='small'
                theme='borderless'
                type='tertiary'
                icon={<IconMore />}
                onClick={() => setOperationVisible(true)}
              />
            </Dropdown>
          </div>
        </div>
        <div className={styles.content}>
          <MarkdownView value={content} />
        </div>
        <div className={styles.info}>
          <div className={styles.infoLeft}>{/* 预留表情包位置 */}</div>
          <div className={styles.replyBtn}>
            <Button size='small' onClick={() => setShowEditor(true)}>
              回复
            </Button>
          </div>
        </div>
        <div className={styles.reply}>
          {showEditor && (
            <CommentEditor
              onCancel={() => setShowEditor(false)}
              parent={comment}
            />
          )}
          {children}
        </div>
      </div>
    </div>
  );
};
export default CommentItem;
