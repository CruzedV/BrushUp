"use client";

import { useMessages } from "@/helpers/hooks/useMessages";
import { Button } from "antd";

type TProps = {
  title: string;
}

const DetailedPostHeader = ({ title }:TProps) => {
  const { successMessage, errorMessage, contextHolder } = useMessages();
  const handleCopyArticle = async () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      successMessage("Ссылка на статью скопирована!");
    }).catch(() => {
      errorMessage("Ошибка копирования");
    });
  };
  return (
    <>
      {contextHolder}
      <Button
        itemProp="headline"
        type="link"
        onClick={handleCopyArticle}
      >
        {title}
      </Button>
    </>
  )
}

export default DetailedPostHeader;