interface GroupProps {
  collectionGroupId: string;
}

const Group = ({ collectionGroupId }: GroupProps) => {
  return <main>{collectionGroupId}</main>;
};

Group.getInitialProps = async ({ query }: { query: GroupProps }) => {
  const { collectionGroupId } = query;
  return { collectionGroupId };
};

export default Group;
