import { UserAddOutlined } from "@ant-design/icons";
import PageTitle from "@/components/common/PageTitle";
import PostsListWithFeedback from "@/components/Posts/PostsList";
import { getSubscribedPosts } from "@/api/posts";

export default function SubsPage() {
  return (
    <>
      <PageTitle>
        <span>
          Подписки <UserAddOutlined />
        </span>
      </PageTitle>
      <PostsListWithFeedback request={getSubscribedPosts} />
    </>
  );
}
