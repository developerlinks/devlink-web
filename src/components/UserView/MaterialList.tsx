import useSWR from 'swr';
import { Material } from '@/api/types/user';
import MaterialCard from '../MaterialCard';
import { fetcher } from '@/utils/http';
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { QueryIF } from './components/SearchFilterBar';
import qs from 'querystring';

interface MaterialListProps {
  userId: string;
  type: 'person' | 'collection';
}

const MaterialList = ({ userId, type }: MaterialListProps) => {
  const router = useRouter();
  const { query } = router;

  const url = useMemo(() => {
    const queryData: QueryIF = query;
    const queryString = qs.stringify(queryData);
    return `/material?authorId=${userId}&${queryString}`;
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
          type={type}
        />
      ))}
    </div>
  );
};

export default MaterialList;
