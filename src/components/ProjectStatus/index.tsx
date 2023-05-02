import styles from './index.module.scss';
import RepoCommitList from '../../materials/RepoCommitList';

export default function ProjectStatus() {
  return (
    <div className={styles.projectStatus}>
      <div className={styles.commitListContainer}>
        <header className={styles.commitListHeader}>
          devlink 相关项目提交记录
        </header>
        <RepoCommitList owner='developerlinks' repo='devlink-server' />
        <RepoCommitList owner='developerlinks' repo='devlink-web' />
        <RepoCommitList owner='developerlinks' repo='devlink-cli' />
      </div>
    </div>
  );
}
