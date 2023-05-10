import GroupNewForm from '@/components/GroupNewForm';
import styles from './index.module.scss';

export default function GroupAdd() {
  return (
    <main>
      <div className={styles.formContainer}>
        <GroupNewForm type='collectionGroup' />
      </div>
    </main>
  );
}
