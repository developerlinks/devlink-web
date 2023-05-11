import { Tabs, TabPane } from '@douyinfe/semi-ui';
import MaterialList from './MaterialList';
import SearchFilterBar from './components/SearchFilterBar';
import { useRouter } from 'next/router';
import { useState } from 'react';

const UserView = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const [_key, setKey] = useState('0');
  const changeHandle = (v) => {
    router.push(window.location.pathname);
    setKey(v);
  };
  return (
    <Tabs type='button' onChange={changeHandle}>
      <TabPane tab='物料' itemKey='material'>
        <SearchFilterBar type='person' _key={_key} />
        <MaterialList type='person' userId={userId} />
      </TabPane>
      <TabPane tab='收藏' itemKey='collection'>
        <SearchFilterBar type='collection' _key={_key} />
        <MaterialList type='collection' userId={userId} />
      </TabPane>
      <TabPane tab='点赞' itemKey='like'>
        <MaterialList type='like' userId={userId} />
      </TabPane>
      <TabPane tab='评论' itemKey='comment'>
        评论
      </TabPane>
    </Tabs>
  );
};

export default UserView;
