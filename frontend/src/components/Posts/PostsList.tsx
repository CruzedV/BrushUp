"use client";

import { TPost, TResponsePosts } from "@shared/types/post";
import withConditionalFeedback from "helpers/hoc/withConditionalFeedback";
import Post from "./Post";
import { useEffect, useState } from "react";
import PostFilters from "./PostFilters";
import { requestWithReturn } from "helpers/functions/requestWithReturn";
import { useMessages } from "helpers/hooks/useMessages";
import { TGetPostsParams } from "@/types/post";
import { Pagination } from "antd";
import { useFiltersStore } from "@/store/filters";
import { EPostList } from "@/enums/post";
import { getAllPosts, getMarkedPosts, getSubscribedPosts, getUserPosts } from "@/api/posts";

type TProps = {
  data: TResponsePosts | null;
  page: number;
  changePage: (page: number) => void;
}

// Компонент, который рендерит список

const PostsList = ({ data, page, changePage }: TProps) => {
  return (
    <>
      {data?.posts?.map((post: TPost, index: number) => (
        <Post data={post} key={post.article_id + index} />
      ))}
      {data?.totalPages && data.totalPages > 1 && (
        <Pagination defaultCurrent={page} total={data?.totalPages} onChange={changePage} />
      )}
    </>
  );
};

// HoC компонент для списка

const WithFeedback = withConditionalFeedback<TResponsePosts, TProps>({
  noDataFeedback: "Посты не загружены",
  dataEmptyFeedback: "Для вас не найдено постов!"
})(PostsList);

type TPostListProps = {
  variant: EPostList;
  user_id?: string;
}

// Логика работы компонента

const PostsListWithFeedback = ({ variant, user_id }: TPostListProps) => {
  const [data, setData] = useState<TResponsePosts | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { errorMessage } = useMessages();
  const filters = useFiltersStore((state) => state.filters);

  const defineRequest = () => {
    if (variant === EPostList.FAVS) return getMarkedPosts;
    if (variant === EPostList.SUBS) return getSubscribedPosts;
    if (variant === EPostList.USER) return getUserPosts;
    return getAllPosts;
  };
  const request = defineRequest();

  const changePage = (page: number) => setPage(page);

  useEffect(() => {
    const fetchPosts = async () => {
      const prepData: TGetPostsParams = {
        page,
        data: filters,
        user_id: user_id,
      };

      await requestWithReturn<TGetPostsParams, TResponsePosts | null>(
        request,
        prepData,
        errorMessage,
        setData,
        setIsLoading
      );
    };
    fetchPosts();
  }, [page, filters]);

  return (
    <>
      <PostFilters />
      <WithFeedback
        data={data}
        isLoading={isLoading}
        page={page}
        changePage={changePage}
      />
    </>
  );
};

export default PostsListWithFeedback;