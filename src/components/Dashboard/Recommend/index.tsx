import useSWR from 'swr';
import styles from './index.module.scss';
import { fetcher } from '@/utils/http';
import ActionCard from '@/components/ActionCard';
import { Material } from '@/types/user';

export default function Recommend() {
  const { data, isLoading, error } = useSWR('/material', fetcher);
  if (isLoading) return <>loading...</>;
  if (error) return <>error...</>;
  return (
    <div className={styles.recommend}>
      {data?.materials.map((material: Material) => (
        <ActionCard material={material} key={material.id} />
      ))}
    </div>
  );
}
