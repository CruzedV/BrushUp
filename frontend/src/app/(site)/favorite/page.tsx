import PageTitle from "@/components/common/PageTitle";
import { BookOutlined } from "@ant-design/icons";
import PostsListWithFeedback from "@/components/Posts/PostsList";
import { EPostList } from "@/enums/post";

export default function FavoritePage() {
  return (
    <>
      <PageTitle>
        <span>
          Закладки <BookOutlined />
        </span>
      </PageTitle>
      <PostsListWithFeedback variant={EPostList.FAVS} />
    </>
  );
}
