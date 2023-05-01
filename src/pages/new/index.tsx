import styles from './index.module.scss';
import Seo from '@/components/Seo';
import NewForm from '@/components/NewForm';
import Layout from '@/components/FrontLayout/Layout';

export default function New() {
  return (
    <main>
      <div className={styles.formContainer}>
        <NewForm />
      </div>
    </main>
  );
}
