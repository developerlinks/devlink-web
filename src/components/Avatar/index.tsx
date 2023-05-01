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
  src: string | undefined | null;
  size?: 'small' | 'default' | 'large';
  style?: React.CSSProperties;
  [key: string]: any;
}

function Avatar({ username, src, size, style, ...rest }: AvatarProps) {
  const color = colors[username.length % colors.length] as AvatarColor;
  return (
    <AvatarSemi
      color={color}
      alt={username}
      src={src ?? ''}
      size={size ?? 'default'}
      style={style}
      {...rest}
    >
      {username.split('')[0]}
    </AvatarSemi>
  );
}
export default Avatar;
