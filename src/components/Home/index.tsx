import MyRepositories from '../MyRepositories';
import News from './News';
import Recommend from './Recommend';
import styles from './index.module.scss';

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.userAside}>
        <MyRepositories />
      </div>
      <div className={styles.informationAside}>
        <div className={styles.recommendContainer}>
          <Recommend />
        </div>
        <div className={styles.newsContainer}>
          <News />
        </div>
      </div>
    </div>
  );
}
