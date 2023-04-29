import { Button, Input } from '@douyinfe/semi-ui';
import styles from './style/index.module.scss';
import { IconCustomize } from '@douyinfe/semi-icons';
import RepositoriesList from './RepositoriesList';
import { useCallback, useState } from 'react';
import debounce from 'lodash/debounce';
import { useRouter } from 'next/router';

export default function MyRepositories() {
  const [search, setSearch] = useState('');
  const { push } = useRouter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchHandle = useCallback(
    debounce((value) => {
      setSearch(value);
    }, 300),
    []
  );
  return (
    <>
      <div className={styles.myRepositories}>
        <div className={styles.header}>
          <div>我的仓库</div>
          <Button
            icon={<IconCustomize />}
            theme='solid'
            type='primary'
            onClick={() => push('/new')}
          >
            新建
          </Button>
        </div>
        <div className={styles.searchContainer}>
          <Input className={styles.inputBox} onChange={searchHandle} />
        </div>
        <RepositoriesList search={search} />
      </div>
    </>
  );
}
