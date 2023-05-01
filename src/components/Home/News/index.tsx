import ProjectStatus from '@/components/ProjectStatus';
import styles from './index.module.scss';

export default function News() {
  return (
    <div className={styles.news}>
      <div className={styles.projectStatusContainer}>
        <ProjectStatus />
      </div>
    </div>
  );
}
