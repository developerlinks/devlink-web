import { createElement } from 'react';

interface StrSvgProps {
  svgString: string;
}

const StrSvg = ({ svgString }: StrSvgProps) => {
  return (
    <>
      {createElement('div', {
        dangerouslySetInnerHTML: { __html: svgString },
        style: { display: 'flex', alignItems: 'center' },
      })}
    </>
  );
};

export default StrSvg;
