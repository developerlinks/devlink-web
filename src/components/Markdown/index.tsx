import { Editor, Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import 'bytemd/dist/index.css';
import type { FC } from 'react';
import styles from './index.module.scss';
import 'github-markdown-css/github-markdown-light.css';

const plugins = [gfm(), highlight()];

interface RichEditorProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const MarkdownEditor: FC<RichEditorProps> = ({ value, setValue }) => {
  return (
    <div className={styles.editorContainer}>
      <Editor
        value={value}
        plugins={plugins}
        maxLength={10000}
        onChange={(v) => {
          setValue(v);
        }}
      />
    </div>
  );
};

interface MarkdownViewProps {
  value: string;
}

export const MarkdownView: FC<MarkdownViewProps> = ({ value }) => {
  return (
    <div className={styles.markdownView}>
      <Viewer value={value} plugins={plugins} />
    </div>
  );
};
