"use client";

import { getAllPosts } from "@/api/posts";
import PageTitle from "@/components/common/PageTitle";
import PostsListWithFeedback from "@/components/Posts/PostsList";

export default function DefaultPage() {
  return (
    <>
      <PageTitle>
        Список всех постов
      </PageTitle>
      <PostsListWithFeedback request={getAllPosts} />
    </>
  );
}
