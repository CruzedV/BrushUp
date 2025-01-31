import PostFilters from "@/components/Posts/PostFilters";
import Post from "@/components/Posts/Post";
import PageTitle from "@/components/common/PageTitle";

export default function DefaultPage() {
  return (
    <>
      <PageTitle>
        Список всех постов
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
