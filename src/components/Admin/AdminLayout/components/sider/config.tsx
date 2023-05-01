import { IconHome, IconGridRectangle } from '@douyinfe/semi-icons';

export interface MenuItem {
  itemKey: string;
  text: string;
  icon?: React.ReactNode;
  path?: string;
  items?: MenuItem[];
  component?: React.ComponentType<any>;
}

const MENU_CONFIG: MenuItem[] = [
  {
    itemKey: '1',
    text: 'app.menu.dashboard',
    icon: <IconHome />,
    items: [
      {
        itemKey: '1-1',
        text: 'app.menu.dashboard.anlyanis',
        path: '/admin/anlyanis',
      },
      {
        itemKey: '1-2',
        text: 'app.menu.dashboard.workbeach',
        path: '/admin/workbeach',
      },
    ],
  },
  {
    itemKey: '2',
    text: 'app.menu.management',
    icon: <IconGridRectangle />,
    items: [
      {
        itemKey: '2-1',
        text: 'app.menu.management.user',
        path: '/admin/user',
      },
      {
        itemKey: '2-2',
        text: 'app.menu.management.material',
        path: '/admin/material',
      },
      {
        itemKey: '2-3',
        text: 'app.menu.management.comment',
        path: '/admin/comment',
      },
    ],
  },
];

export default MENU_CONFIG;
