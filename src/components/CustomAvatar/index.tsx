import { Avatar as AvatarSemi } from '@douyinfe/semi-ui';
import { AvatarColor } from '@douyinfe/semi-ui/lib/es/avatar';
import { useRouter } from 'next/router';
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
  size?: 'small' | 'default' | 'large' | 'vsmalle';
  style?: React.CSSProperties;
  id?: string;
  [key: string]: any;
}

function CustomAvatar({
  username,
  src,
  id,
  size,
  style,
  ...rest
}: AvatarProps) {
  const color = colors[username.length % colors.length] as AvatarColor;
  return (
    <AvatarSemi
      color={color}
      alt={username}
      src={src ?? ''}
      size={size === 'vsmalle' || !size ? 'default' : size}
      style={{
        cursor: id ? 'pointer' : 'auto',
        width: size === 'vsmalle' ? '20px' : undefined,
        height: size === 'vsmalle' ? '20px' : undefined,
        ...style,
      }}
      {...rest}
      onClick={() => {
        id && open(`/user/${id}`);
      }}
    >
      {username.split('')[0]}
    </AvatarSemi>
  );
}
export default CustomAvatar;
