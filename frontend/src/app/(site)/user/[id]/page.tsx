import UserProfileBody from "./UserProfileBody";

const UserPage = async ({ params }: { params: { id: string }}) => {
  const { id } = await params;
  return <UserProfileBody id={id} />
};

export default UserPage;