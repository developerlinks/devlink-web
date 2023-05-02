interface StrIconProps {
  children: React.ReactNode;
}

const StrIcon = (props: StrIconProps) => {
  const { children } = props;
  return (
    <div
      style={{
        color: '#b3b3b3',
        fontSize: '.75rem',
        minWidth: '24px',
        padding: '0 8px',
        backgroundColor: '#FAFAFA',
        display: 'inline-block',
        borderRadius: '5px',
        textAlign: 'center',
        lineHeight: '2em',
        border: '1px solid #eaeaea',
      }}
    >
      {children}
    </div>
  );
};

export default StrIcon;
