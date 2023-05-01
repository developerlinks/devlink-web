import { IconPriceTag, IconPuzzle, IconUserCircle } from '@douyinfe/semi-icons';
import styles from './style/index.module.scss';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { SearchData } from '@/pages/search';

const categoryList = [
  {
    name: '物料',
    value: 'material',
  },
  {
    name: '用户',
    value: 'user',
  },
  {
    name: '标签',
    value: 'tag',
  },
];

type Category = (typeof categoryList)[number];

interface CategoryItemProps {
  item: Category;
}

interface CategoryProps {
  data: SearchData;
}

export default function Category({ data }: CategoryProps) {
  const { query } = useRouter();
  const currentType = query.type as string;

  const getCategoryItem = ({ item }: CategoryItemProps) => {
    const { name, value } = item;
    const number = data.data.find((item) => value === item.reason.split('.')[0])
      ?.items.length;

    return (
      <div
        className={clsx(styles.categoryItem, {
          [styles.avtive]: currentType === value,
        })}
        key={value}
      >
        <div className={styles.categoryLeft}>
          <div className={styles.categoryIcon}>
            {name === '物料' ? (
              <IconPuzzle />
            ) : name === '用户' ? (
              <IconUserCircle />
            ) : (
              <IconPriceTag />
            )}
          </div>
          <div className={styles.categoryTitle}>{name}</div>
        </div>
        <div className={styles.categoryRight}>
          <div className={styles.categoryNumber}>{number}</div>
        </div>
      </div>
    );
  };
  const getCategoryList = () => {
    return <>{categoryList.map((item) => getCategoryItem({ item }))}</>;
  };
  return (
    <>
      <div className={styles.category}>
        <div className={styles.header}>筛选</div>
        <div className={styles.categoryList}>{getCategoryList()}</div>
      </div>
    </>
  );
}
