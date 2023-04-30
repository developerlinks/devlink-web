import { Avatar as AvatarSemi } from '@douyinfe/semi-ui';
import { AvatarColor } from '@douyinfe/semi-ui/lib/es/avatar';
const colors = [
  'amber',
  'blue',
  'cyan',
  'green',
  'grey',
  'indigo',
  'light-blue',
  'light-green',
  'lime',
  'orange',
  'pink',
  'purple',
  'red',
  'teal',
  'violet',
  'yellow',
];

interface AvatarProps {
  username: string;
  avatar: string | undefined | null;
  size: 'small' | 'default' | 'large';
  style?: React.CSSProperties;
  [key: string]: any;
}

function Avatar({ username, avatar, size, style, ...rest }: AvatarProps) {
  const color = colors[username.length % colors.length] as AvatarColor;
  return (
    <AvatarSemi
      color={color}
      alt={username}
      src={avatar ?? ''}
      size={size}
      style={style}
      {...rest}
    >
      {username.split('')[0]}
    </AvatarSemi>
  );
}
export default Avatar;
