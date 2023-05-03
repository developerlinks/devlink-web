import { Tag } from '@douyinfe/semi-ui';
import styles from './index.module.scss';
import HoverLink from '../HoverLink';

interface TagProps {
  children: React.ReactNode;
  size?: 'small' | 'large';
  href?: string;
  openNewTab?: boolean;
  [key: string]: any;
}

export function CustomTag({
  size = 'small',
  children,
  href,
  openNewTab = true,
  ...rest
}: TagProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.stopPropagation();
    if (href) {
      window.open(href, openNewTab ? '_blank' : '_self');
    }
  };
  return (
    <div className={styles.customTag}>
      <Tag size={size} {...rest}>
        <a onClick={handleClick} className={styles.taga}>
          {children}
        </a>
      </Tag>
    </div>
  );
}
