import { Editor, Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import 'bytemd/dist/index.css';
import type { FC } from 'react';
import styles from './index.module.scss';
import 'github-markdown-css/github-markdown-light.css';
import clsx from 'clsx';

const plugins = [gfm(), highlight()];

interface RichEditorProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  [key: string]: any;
}

export const MarkdownEditor: FC<RichEditorProps> = ({
  value,
  setValue,
  ...rest
}) => {
  return (
    <div className={styles.editorContainer}>
      <Editor
        value={value}
        plugins={plugins}
        maxLength={10000}
        onChange={(v) => {
          setValue(v);
        }}
        {...rest}
      />
    </div>
  );
};

interface MarkdownViewProps {
  value: string;
  insetBackGround?: boolean;
}

export const MarkdownView: FC<MarkdownViewProps> = ({
  value,
  insetBackGround = false,
}) => {
  return (
    <div
      className={clsx(styles.markdownView, {
        [styles.insetBackGround]: insetBackGround,
      })}
    >
      <Viewer value={value} plugins={plugins} />
    </div>
  );
};
