import { useState, useEffect } from 'react';
import useSWR from 'swr';
import Search from '@/materials/Search';
import styles from './index.module.scss';
import { Divider } from '../Divider';
import { IconPriceTag, IconPuzzle, IconUserCircle } from '@douyinfe/semi-icons';
import { fetcher } from '@/utils/http';
import { Spin } from '@douyinfe/semi-ui';
import useMinimumLoadingTime from '@/hooks/useMinimumLoadingTime';
import StrSvg from '../StrSvg';
import { SearchIcon } from './material';
import { useRouter } from 'next/router';
import CustomAvatar from '../CustomAvatar';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [placeholder, setPlaceholder] = useState('');
  const { route, push, query } = useRouter();

  const handleLink = (url) => {
    setModalVisible(false);
    setPlaceholder(searchValue);
    return route === '/search' ? push(url) : open(url);
  };
  useEffect(() => {
    if (query.keyword) {
      setPlaceholder(query.keyword as string);
    }
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 500); // 设置500毫秒延时

    return () => {
      clearTimeout(timerId);
    };
  }, [searchValue]);

  const { data, isLoading, error } = useSWR(
    `/user/fuzzy_query?page=1&limit=10&keyword=${debouncedSearchValue}`,
    fetcher
  );
  const isLoadingWithMinTime = useMinimumLoadingTime(isLoading, 500);

  const FuzzyQueryResult = () => {
    if (isLoadingWithMinTime) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Spin size='large' />
        </div>
      );
    }

    const queryMaterialName = data?.data.find(
      (item) => item.reason === 'material.name'
    );
    const queryByUserName = data?.data.find(
      (item) => item.reason === 'user.username'
    );
    const queryByTagName = data?.data.find(
      (item) => item.reason === 'tag.name'
    );

    const renderFuzzyQueryItems = (
      queryResult,
      title,
      iconComponent,
      routePrefix
    ) => {
      if (!queryResult || queryResult.total === 0) {
        return null;
      }

      return (
        <>
          <Divider />
          <div className={styles.fuzzyQueryItemContainer}>
            <div className={styles.header}>{title}</div>
            {queryResult.items.map((item) => (
              <div
                className={styles.queryItem}
                key={item.id}
                onClick={() => open(`/${routePrefix}/${item.id}`)}
              >
                <div className={styles.searchValueLeft}>
                  {iconComponent === 'avatar' ? (
                    <CustomAvatar
                      username={item.username}
                      src={item.avatar}
                      size='vsmalle'
                      id={item.id}
                    />
                  ) : (
                    iconComponent
                  )}
                  <div>{item.name || item.username}</div>
                </div>
                <div className={styles.searchValueRight}>跳转</div>
              </div>
            ))}
          </div>
        </>
      );
    };

    return (
      <>
        {renderFuzzyQueryItems(
          queryMaterialName,
          '物料',
          <IconPuzzle style={{ marginTop: '2px' }} />,
          'material'
        )}
        {renderFuzzyQueryItems(queryByUserName, '用户', 'avatar', 'user')}
        {renderFuzzyQueryItems(queryByTagName, '标签', <IconPriceTag />, 'tag')}
      </>
    );
  };

  const handleInputEnter = () => {
    if (searchValue !== '') {
      handleLink(`/search?keyword=${searchValue}&type=material`);
    }
  };

  return (
    <div style={{ marginLeft: '16px' }}>
      <Search
        searchValue={searchValue}
        onSearchValueChange={setSearchValue}
        modalVisible={modalVisible}
        onModalVisibleChange={setModalVisible}
        placeholder={placeholder === '' ? undefined : placeholder}
        handleInputEnter={handleInputEnter}
      >
        {searchValue !== '' && (
          <div
            className={styles.searchValueContainer}
            onClick={() =>
              handleLink(`/search?keyword=${searchValue}&type=material`)
            }
          >
            <div className={styles.searchValueLeft}>
              <StrSvg svgString={SearchIcon} />
              <div>{searchValue}</div>
            </div>
            <div className={styles.searchValueRight}>
              搜索 DevLink 的所有内容
            </div>
          </div>
        )}

        {FuzzyQueryResult()}
      </Search>
    </div>
  );
};
export default SearchBar;
