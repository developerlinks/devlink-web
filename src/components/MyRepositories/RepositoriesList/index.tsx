import useSWR from 'swr';
import { GetMyMaterial } from '@/api/types/material';
import { fetcher } from '@/utils/http';
import styles from './index.module.scss';
import { Material } from '@/api/types/user';
import Avatar from '@/components/Avatar';

type RepositoriesListProps = {
  search: string;
};

export default function RepositoriesList({ search }: RepositoriesListProps) {
  const { data, isLoading } = useSWR<GetMyMaterial>(
    '/material/myself',
    fetcher
  );
  if (isLoading) return <>loading...</>;

  const filterMaterials = (
    materials: Material[],
    search: string
  ): Material[] => {
    if (!search) return materials;
    return materials.filter((material) =>
      material.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredMaterials = filterMaterials(data?.materials || [], search);

  const RepositoryLi = (item: Material) => {
    return (
      <li className={styles.repositoryItem} key={item.id}>
        <div className={styles.ownerInfo}>
          <Avatar
            id={item.user?.id}
            src={item.user?.profile?.avatar ?? ''}
            username={item.user?.username as string}
            size='small'
          />
        </div>
        <div>{item.name}</div>
      </li>
    );
  };

  return (
    <ul className={styles.repositoryUl}>
      {filteredMaterials.length !== 0 ? (
        filteredMaterials.map((item) => <>{RepositoryLi(item)}</>)
      ) : (
        <>未检索到指定内容</>
      )}
    </ul>
  );
}
