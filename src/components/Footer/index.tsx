import Link from 'next/link';
import styles from './style/index.module.scss';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <Link href='https://beian.miit.gov.cn/'>
        <a>豫ICP备2020029001号-7</a>
      </Link>
    </div>
  );
}
