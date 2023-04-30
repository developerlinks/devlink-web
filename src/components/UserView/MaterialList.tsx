import useSWR from 'swr';
import { Material } from '@/api/types/user';
import MaterialCard from '../MaterialCard';
import { fetcher } from '@/utils/http';

interface MaterialListProps {
  userId: string;
}

const MaterialList = ({ userId }: MaterialListProps) => {
  const { data, isLoading, error } = useSWR(
    `/material?authorId=${userId}`,
    fetcher
  );
  if (isLoading) return <>loading...</>;
  if (error) return <>error...</>;
  console.log('MaterialList', data);
  return (
    <div>
      {data?.materials.map((material: Material) => (
        <MaterialCard material={material} key={material.id} />
      ))}
    </div>
  );
};

export default MaterialList;
