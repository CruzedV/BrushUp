import { getPostById } from "@/api/posts";
import DetailedPost from "@/components/Posts/DetailedPost/DetailedPost";
import { TPost } from "@shared/types/post";
import { requestWithReturn } from "@/helpers/functions/requestWithReturn";

const PostPage = async ({ params }: { params: { postId: string }}) => {
  const { postId } = await params;
  const post = await requestWithReturn<string, TPost | null>(
    getPostById,
    postId,
  )
  return <DetailedPost post={post} />;
};

export default PostPage