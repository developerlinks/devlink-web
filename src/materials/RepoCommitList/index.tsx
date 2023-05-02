import { List, Button, Spin, Popover, Tooltip } from '@douyinfe/semi-ui';
import InfiniteScroll from 'react-infinite-scroller';

import moment from 'moment';
import { Commit, useFetchCommits } from '@/hooks/useFetchCommits';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import HoverLink from '../../components/HoverLink';

interface CommitListProps {
  owner: string;
  repo: string;
  style?: React.CSSProperties;
  pageNumber?: number;
}
moment.locale('zh-cn');

export default function RepoCommitList({
  owner,
  repo,
  style = {},
  pageNumber = 5,
}: CommitListProps) {
  const [listLoading, setListLoading] = useState(false);
  const [dataSource, setDataSource] = useState<Commit[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const {
    commits,
    loading: fetchCommitsLoading,
    error: fetchCommitsError,
  } = useFetchCommits({
    owner,
    repo,
    per_page: pageNumber,
    page,
  });

  useEffect(() => {
    if (commits.length) {
      setDataSource([...dataSource, ...commits]);
      if (commits.length < pageNumber) {
        setHasMore(false);
      }
      setListLoading(false);
    }
  }, [commits[0]?.sha]);

  if (fetchCommitsLoading) return <div>{repo} 提交记录获取中</div>;
  if (fetchCommitsError) return <div>{repo} 提交记录获取失败</div>;

  const fetchData = () => {
    setListLoading(true);
    setPage(page + 1);
  };

  const showLoadMore = page % 4 === 0;

  const loadMore =
    !fetchCommitsLoading && hasMore && showLoadMore ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={fetchData}>显示更多</Button>
      </div>
    ) : null;

  return (
    <div className={styles.commitList}>
      <div
        className='light-scrollbar'
        style={{
          height: 250,
          overflow: 'auto',
          border: '1px solid var(--semi-color-border)',
          borderRadius: 4,
          paddingBottom: 10,
          ...style,
        }}
      >
        <HoverLink
          className={styles.repo}
          href={`https://github.com/${owner}/${repo}`}
          openNewTab
        >
          {repo}
        </HoverLink>

        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          threshold={20}
          loadMore={fetchData}
          hasMore={!listLoading && hasMore && !showLoadMore}
          useWindow={false}
        >
          <List
            bordered={false}
            loadMore={loadMore}
            dataSource={dataSource}
            renderItem={(item: any) => (
              <List.Item
                style={{ padding: '8px 16px', overflowY: 'hidden' }}
                main={
                  <div className={styles.commitItem}>
                    <HoverLink
                      href={item.html_url}
                      className={styles.commitContent}
                      openNewTab
                    >
                      <Tooltip
                        showArrow
                        arrowPointAtCenter
                        mouseEnterDelay={1000}
                        content={<div>{item.commit.message}</div>}
                      >
                        {item.commit.message}
                      </Tooltip>
                    </HoverLink>
                    <div className={styles.commitDetail}>
                      <HoverLink
                        href={`https://github.com/${item.commit.author.name}`}
                        openNewTab
                        className={styles.commitName}
                      >
                        {item.commit.author.name}
                      </HoverLink>

                      <div className={styles.commitTime}>
                        {moment(item.commit.author.date)
                          .startOf('hour')
                          .fromNow()}
                      </div>
                    </div>
                  </div>
                }
              />
            )}
          />
          {listLoading && hasMore && (
            <div style={{ textAlign: 'center' }}>
              <Spin />
            </div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
}
