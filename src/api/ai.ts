import http from '@/utils/http';

interface textPolisherProps {
  text: string;
}

export const textPolisher = (data: textPolisherProps) =>
  http({
    url: '/ai/text-polisher',
    method: 'post',
    data,
  });
