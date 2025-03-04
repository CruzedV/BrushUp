import PageTitle from "@/components/common/PageTitle";
import PostsListWithFeedback from "@/components/Posts/PostsList";
import { EPostList } from "@/enums/post";

export default function DefaultPage() {
  return (
    <>
      <PageTitle>
        Список всех постов
      </PageTitle>
      <PostsListWithFeedback variant={EPostList.ALL} />
    </>
  );
}
