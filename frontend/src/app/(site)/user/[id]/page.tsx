import { requestWithReturn } from "@/helpers/functions/requestWithReturn";
import UserProfileBody from "./UserProfileBody";
import { getUserById } from "@/api/users";
import { TUser } from "@/types/user";

const UserPage = async ({ params }: { params: { id: string }}) => {
  const { id } = await params;
  const user = await requestWithReturn<string, TUser | null>(
    getUserById,
    id,
  )
  return <UserProfileBody user={user} />
};

export default UserPage;