"use client";

import { TPost, TResponsePosts } from "@shared/types/post";
import withConditionalFeedback from "helpers/hoc/withConditionalFeedback";
import Post from "./Post";
import { useEffect, useState } from "react";
import PostFilters from "./PostFilters";
import { requestWithReturn } from "helpers/functions/requestWithReturn";
import { useMessages } from "helpers/hooks/useMessages";
import { TGetPostsParams } from "@/types/post";
import { Pagination, Spin } from "antd";
import { useFiltersStore } from "@/store/filters";

type TProps = {
  request: (params: TGetPostsParams) => Promise<TResponsePosts>
}

const PostsList = ({ request }: TProps) => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TResponsePosts | null>();
  const { errorMessage } = useMessages();
  const filters = useFiltersStore((state) => state.filters);

  const changePage = (page: number) => {
    setPage(page);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const prepData: TGetPostsParams = {
        page: page,
        data: filters,
      }
      const posts = await requestWithReturn<TGetPostsParams, TResponsePosts | null | undefined>(
        request,
        prepData,
        () => errorMessage("Ошибка при получении постов"),
        setData,
        setIsLoading,
      );
      console.log(posts);
    }
    fetchPosts();
  }, [page, filters])

  return (
    <>
      <PostFilters />
      {isLoading ? (
        <div className="feedbackContainer">
          Загрузка постов...
          <Spin />
        </div>
      ) : (
        <>
        {data?.posts?.map((post: TPost, index: number) => (
          <Post data={post} key={post.article_id + index}/>
        ))}
        </>
      )}
      <Pagination
        defaultCurrent={page}
        total={data?.totalPages}
        onChange={changePage}
      />
    </>
  )
}

const PostsListWithFeedback = withConditionalFeedback<TPost[], TProps>({
  noDataFeedback: "Посты не загружены",
  dataEmptyFeedback: "Для вас не найдено постов!"
})(PostsList);

export default PostsListWithFeedback