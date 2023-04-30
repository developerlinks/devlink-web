import { User } from '@/api/types/user';
import { Tabs, TabPane } from '@douyinfe/semi-ui';
import MaterialList from './MaterialList';

const UserView = ({ userId }: { userId: string }) => {
  return (
    <Tabs type='button'>
      <TabPane tab='物料' itemKey='material'>
        <MaterialList userId={userId} />
      </TabPane>
      <TabPane tab='收藏' itemKey='collection'>
        收藏
      </TabPane>
      <TabPane tab='点赞' itemKey='like'>
        点赞
      </TabPane>
      <TabPane tab='评论' itemKey='comment'>
        评论
      </TabPane>
    </Tabs>
  );
};

export default UserView;
