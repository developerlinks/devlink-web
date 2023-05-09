interface GroupProps {
  groupId: string;
}

const Group = ({ groupId }: GroupProps) => {
  return <main>{groupId}</main>;
};

Group.getInitialProps = async ({ query }: { query: GroupProps }) => {
  const { groupId } = query;
  return { groupId };
};

export default Group;
