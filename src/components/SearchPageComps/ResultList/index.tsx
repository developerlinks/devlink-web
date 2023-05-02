import MaterialCard from '@/components/MaterialCard';
import { SearchData } from '@/pages/search';

interface ResultListProps {
  type: string;
  data: SearchData;
}

const ResultList = ({ type, data }: ResultListProps) => {
  const getQueryMaterialResult = () => {
    const query = data?.data.find((item) => item.reason === `${type}.name`);
    return (
      <div>
        {query?.items.map((item) => (
          <MaterialCard key={item.id} material={item} isShowAvatar />
        ))}
      </div>
    );
  };

  return <div>{getQueryMaterialResult()}</div>;
};

export default ResultList;
