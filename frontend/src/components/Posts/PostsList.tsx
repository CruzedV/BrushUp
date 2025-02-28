"use client";

import { TPost, TRequestPosts, TResponsePosts } from "@shared/types/post";
import withConditionalFeedback from "helpers/hoc/withConditionalFeedback";
import Post from "./Post";
import { useEffect, useState } from "react";
import PostFilters from "./PostFilters";
import { requestWithReturn } from "helpers/functions/requestWithReturn";
import { useMessages } from "helpers/hooks/useMessages";

type TProps = {
  request: (page: number, data: TRequestPosts) => Promise<TResponsePosts>,
}

type TPrepData = {
  page: number;
  data: TRequestPosts;
}

const PostsList = ({ request }: TProps) => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TResponsePosts | null>();
  const { errorMessage } = useMessages();

  useEffect(() => {
    const fetchPosts = async () => {
      const prepData = {
        page: page,
        data: data,
      }
      const posts = await requestWithReturn<TPrepData, TResponsePosts>(
        request,
        prepData,
        () => errorMessage("Ошибка при получении постов"),
        setData,
        setIsLoading,
      );
      console.log(posts);
    }
    fetchPosts();
  }, [page])

  return (
    <>
      <PostFilters />
      {data?.map((post: TPost, index: number) => (
        <Post data={post} key={post.article_id + index}/>
      ))}
    </>
  )
}

const PostsListWithFeedback = withConditionalFeedback<TPost[], TProps>(
  {
    loadingFeedback: "Получение постов...",
    noDataFeedback: "Посты не загружены",
    dataEmptyFeedback: "Для вас не найдено постов!"
  }
)(PostsList);

export default PostsListWithFeedback