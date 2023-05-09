import useSWR from 'swr';
import { Material } from '@/api/types/user';
import MaterialCard from '../MaterialCard';
import { fetcher } from '@/utils/http';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { QueryIF } from './components/SearchFilterBar';
import qs from 'querystring';

interface MaterialListProps {
  userId: string;
}

const MaterialList = ({ userId }: MaterialListProps) => {
  const router = useRouter();
  const { query } = router;

  const [url, setUrl] = useState(`/material?authorId=${userId}`);

  useEffect(() => {
    const queryData: QueryIF = query;
    console.log('queryData', queryData);
    const queryString = qs.stringify(queryData);
    setUrl(`/material?authorId=${userId}&${queryString}`);
  }, [query, userId]);

  const { data, isLoading, error } = useSWR(url, fetcher);

  if (isLoading) return <>loading...</>;
  if (error) return <>error...</>;
  return (
    <div>
      {data?.materials.map((material: Material) => (
        <MaterialCard
          displaySelfName={false}
          material={material}
          key={material.id}
        />
      ))}
    </div>
  );
};

export default MaterialList;
