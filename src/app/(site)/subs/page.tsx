import PostFilters from "@/components/Posts/PostFilters";
import Post from "@/components/Posts/Post";
import { UserAddOutlined } from "@ant-design/icons";
import PageTitle from "@/components/common/PageTitle";

export default function SubsPage() {
  return (
    <>
      <PageTitle>
        <span>
          Подписки <UserAddOutlined />
        </span>
      </PageTitle>
      <PostFilters />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </>
  );
}
