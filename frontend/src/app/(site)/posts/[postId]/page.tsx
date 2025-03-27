import { getPostById } from "@/api/posts";
import DetailedPost from "@/components/Posts/DetailedPost/DetailedPost";
import { requestWithReturn } from "@/helpers/functions/requestWithReturn";
import { TDetailedPost } from "@/types/post";

const PostPage = async ({ params }: { params: { postId: string }}) => {
  const { postId } = await params;
  const post = await requestWithReturn<string, TDetailedPost | null>(
    getPostById,
    postId,
  )

  return <DetailedPost post={post} />;
};

export default PostPage