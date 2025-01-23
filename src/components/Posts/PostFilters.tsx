"use client";

import { Card } from "antd";
import styles from "./styles.module.scss";
import TagsInput from "../Tags/TagsInput";
import InputItem from "../common/InputItem";
import { useState } from "react";

type TFilters = {
  tags: string[];
  text: string;
}

const PostFilters = () => {
  const [filters, setFilters] = useState<TFilters>({ tags: [], text: '' });

  const handleChangeSearchText = (data: string) => {
    setFilters({... filters, text: data});
  }

  return (
    <Card className={styles.filters}>
      <InputItem
        defaultValue={filters.text}
        placeholder="Поиск"
        onChange={handleChangeSearchText}
      />
      <TagsInput />
    </Card>
  )
}

export default PostFilters;