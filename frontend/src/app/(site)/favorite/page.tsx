import PageTitle from "@/components/common/PageTitle";
import { BookOutlined } from "@ant-design/icons";
import PostsListWithFeedback from "@/components/Posts/PostsList";
import { getMarkedPosts } from "@/api/posts";

export default function FavoritePage() {
  return (
    <>
      <PageTitle>
        <span>
          Закладки <BookOutlined />
        </span>
      </PageTitle>
      <PostsListWithFeedback request={getMarkedPosts} />
    </>
  );
}
