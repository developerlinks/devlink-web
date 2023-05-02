import { MarkdownEditor } from '@/components/Markdown';
import styles from './index.module.scss';
import { useState } from 'react';
import { Button } from '@douyinfe/semi-ui';

const CommentEditor = () => {
  const [value, setValue] = useState('');
  return (
    <div className={styles.commentEditor}>
      <div className={styles.editorContainer}>
        <MarkdownEditor value={value} setValue={setValue} />
        <div className={styles.submitContainer}>
          <Button className={styles.submit}>发送</Button>
        </div>
      </div>
    </div>
  );
};
export default CommentEditor;
