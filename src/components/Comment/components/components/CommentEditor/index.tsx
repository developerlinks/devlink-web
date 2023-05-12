import { MarkdownEditor } from '@/components/Markdown';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { Button } from '@douyinfe/semi-ui';
import { addCommentToMaterial } from '@/api/material';
import { CreateCommentDto } from '@/api/types/material';
import { useRouter } from 'next/router';
import { mutate } from 'swr';
import { NoticeSuccess } from '@/utils/common';
import { Comment } from '@/api/types/user';

interface CommentEditorProps {
  parent?: Comment;
  onCancel?: () => void;
}

const CommentEditor = ({ parent, onCancel }: CommentEditorProps) => {
  const [value, setValue] = useState('');
  const { query } = useRouter();
  const { materialId } = query;

  const commentSWRKey = `/comments/${materialId}`;

  useEffect(() => {
    if (parent) {
      const parentUser = `[@${parent?.user.username}](/user/${parent?.user.id})  `;
      setValue(parentUser);
    }
  }, [parent?.id]);

  const submit = () => {
    const prams: CreateCommentDto = {
      content: value,
      materialId: onCancel ? null : (materialId as string),
      parentId: parent?.parent?.id || parent?.id,
    };
    addCommentToMaterial(prams).then(() => {
      NoticeSuccess('发送评论成功');
      mutate(commentSWRKey);
      onCancel && onCancel();
    });
  };
  return (
    <div className={styles.commentEditor}>
      <div className={styles.editorContainer}>
        <MarkdownEditor value={value} setValue={setValue} />
        <div className={styles.submitContainer}>
          <Button className={styles.submit} onClick={submit}>
            发送
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CommentEditor;
