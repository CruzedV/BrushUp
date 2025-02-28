import DetailedPost from "@/components/Posts/DetailedPost";

const PostPage = async ({ params }: { params: { postId: string }}) => {
  const { postId } = await params;
  return <DetailedPost article_id={postId}/>;
};

export default PostPage