import DetailedPost from "@/components/Posts/DetailedPost";

const PostPage = async ({ params }: { params: { postId: number }}) => {
  const { postId } = await params;
  return <DetailedPost article_id={postId}/>;
};

export default PostPage