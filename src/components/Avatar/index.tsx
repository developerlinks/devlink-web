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
  phone: string | undefined | null;
  size: 'small' | 'default' | 'large';
}

function Avatar({ username, phone, size }: AvatarProps) {
  const color = colors[username.length % colors.length] as AvatarColor;
  return (
    <AvatarSemi color={color} alt={username} src={phone ?? ''} size={size}>
      {username.split('')[0]}
    </AvatarSemi>
  );
}
export default Avatar;
