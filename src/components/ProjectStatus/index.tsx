import styles from './index.module.scss';
import CommitList from '../../materials/RepoCommitList';

export default function ProjectStatus() {
  return (
    <div className={styles.projectStatus}>
      <div className={styles.commitListContainer}>
        <header className={styles.commitListHeader}>
          devlink 相关项目提交记录
        </header>
        <CommitList owner='developerlinks' repo='devlink-server' />
        <CommitList owner='developerlinks' repo='devlink-web' />
        <CommitList owner='developerlinks' repo='devlink-cli' />
      </div>
    </div>
  );
}
