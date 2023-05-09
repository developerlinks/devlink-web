interface TagProps {
  tagId: string;
}

const Tag = ({ tagId }: TagProps) => {
  return <main>{tagId}</main>;
};

Tag.getInitialProps = async ({ query }: { query: TagProps }) => {
  const { tagId } = query;
  return { tagId };
};

export default Tag;
