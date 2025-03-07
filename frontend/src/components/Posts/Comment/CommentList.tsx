import { TComment } from "@/types/comment"
import Comment from "./Comment";
import withConditionalFeedback from "@/helpers/hoc/withConditionalFeedback";

type TProps = {
  article_id: string;
  data: TComment[];
}

const CommentList = ({ data }: TProps) => {
  return (
    <>
      {data?.map((comment: TComment, index: number) => (
        <Comment comment={comment} key={comment.comment_id + index} />
      ))}
    </>
  )
}

const WithFeedback = withConditionalFeedback<TComment[], TProps>({
  noDataFeedback: "Комментарии не загружены",
  dataEmptyFeedback: "Нет комментариев!"
})(CommentList);

type TCommentListProps = {
  article_id: string;
  data: TComment[];
}

const CommentListWithFeedback = ({ article_id, data }: TCommentListProps) => {
  return (
    <WithFeedback
      data={data}
      article_id={article_id}
    />
  )
}

export default CommentListWithFeedback;