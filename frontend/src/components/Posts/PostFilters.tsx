"use client";

import { Card } from "antd";
import styles from "./styles.module.scss";
import TagsInput from "../Tags/TagsInput";
import InputItem from "../common/InputItem";
import { useState } from "react";
import { ESettings } from "@/variants/settings";

type TFilters = {
  tags: string[];
  text: string;
}

const PostFilters = () => {
  const [filters, setFilters] = useState<TFilters>({ tags: [], text: '' });

  const handleChangeSearchText = (data: string) => {
    setFilters({... filters, text: data});
  };

  const handleChangeTags = (data: string[]) => {
    setFilters({ ...filters, tags: data });
  };

  return (
    <Card className={styles.filters}>
      <InputItem
        defaultValue={filters.text}
        placeholder="Поиск по названию статьи"
        onChange={handleChangeSearchText}
        variant={ESettings.search}
      />
      <TagsInput onChange={handleChangeTags} />
    </Card>
  )
}

export default PostFilters;