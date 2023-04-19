import styles from './style/index.module.scss';
import Seo from '@/components/Seo';
import NewForm from '@/components/NewForm';
import Layout from '@/components/Layout/Layout';

export default function New() {
  return (
    <Layout>
      <Seo />
      <main>
        <div className={styles.formContainer}>
          <NewForm />
        </div>
      </main>
    </Layout>
  );
}
