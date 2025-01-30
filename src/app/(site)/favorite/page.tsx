import PostFilters from "@/components/Posts/PostFilters";
import Post from "@/components/Posts/Post";
import PageTitle from "@/components/common/PageTitle";
import { BookOutlined } from "@ant-design/icons";

export default function FavoritePage() {
  return (
    <>
      <PageTitle>
        <span>
          Закладки <BookOutlined />
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
