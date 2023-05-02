import RepoCommitList from '@/materials/RepoCommitList';
import styles from './index.module.scss';

export default function CommitListPage() {
  return (
    <main className={styles.commitListPage}>
      <RepoCommitList
        owner='developerlinks'
        repo='devlink-server'
        style={{ height: '90%' }}
        pageNumber={8}
      />
      <RepoCommitList
        owner='developerlinks'
        repo='devlink-web'
        style={{ height: '90%' }}
        pageNumber={8}
      />
      <RepoCommitList
        owner='developerlinks'
        repo='devlink-cli'
        style={{ height: '90%' }}
        pageNumber={8}
      />
    </main>
  );
}
