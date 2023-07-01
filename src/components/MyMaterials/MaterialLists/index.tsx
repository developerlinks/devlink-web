import useSWR from 'swr';
import { GetMyMaterial } from '@/types/material';
import { fetcher } from '@/utils/http';
import styles from './index.module.scss';
import { Material } from '@/types/user';
import CustomAvatar from '@/components/CustomAvatar';
import HoverLink from '@/components/HoverLink';

type MaterialListsProps = {
  search: string;
};

export default function MaterialLists({ search }: MaterialListsProps) {
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

  const MaterialLi = (item: Material) => {
    return (
      <li className={styles.materialItem} key={item.id}>
        <div className={styles.ownerInfo}>
          <CustomAvatar
            id={item.user?.id}
            src={item.user?.profile?.avatar ?? ''}
            username={item.user?.username as string}
            size='small'
            userLink
          />
        </div>
        <HoverLink href={`/material/${item.id}`} openNewTab>
          {item.name}
        </HoverLink>
      </li>
    );
  };

  return (
    <ul className={styles.materialUl}>
      {filteredMaterials.length !== 0 ? (
        filteredMaterials.map((item) => <>{MaterialLi(item)}</>)
      ) : (
        <>未检索到指定内容</>
      )}
    </ul>
  );
}
