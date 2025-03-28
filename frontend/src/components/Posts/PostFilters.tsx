"use client";

import { Button, Card } from "antd";
import styles from "./styles.module.scss";
import TagsInput from "../Tags/TagsInput";
import InputItem from "../common/InputItem";
import { ESettings } from "@/variants/settings";
import { useFiltersStore } from "@/store/filters";
import { CloseOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { TPostFilters } from "@shared/types/post";
import useDebounce from "@/helpers/hooks/useDebounce";
import { TTag } from "@shared/types/tag";

const PostFilters = () => {
  const filters = useFiltersStore((state) => state.filters);
  const [localFitlers, setLocalFilters] = useState<TPostFilters>(filters);
  const setFilters = useFiltersStore((state) => state.setFilters);
  // const clearFilters = useFiltersStore((state) => state.clearFilters);

  const clearAllFilters = () => {
    setLocalFilters({ query: "", tags: [] });
  }

  const debouncedFilters = useDebounce<TPostFilters>(localFitlers, 1500);

  const handleChangeSearchText = (data: string) => {
    setLocalFilters({ ...filters, query: data});
  };

  const handleChangeTags = (data: TTag[]) => {
    setLocalFilters({ ...filters, tags: data});
  };

  useEffect(() => {
    setFilters(debouncedFilters);
  }, [debouncedFilters]);

  return (
    <Card className={styles.filters}>
      <InputItem
        defaultValue={localFitlers.query}
        placeholder="Поиск по названию статьи"
        onChange={handleChangeSearchText}
        variant={ESettings.input}
      />
      <TagsInput onChange={handleChangeTags} defaultValues={localFitlers.tags} />
      <Button onClick={clearAllFilters} type="primary" icon={<CloseOutlined />} />
    </Card>
  )
}

export default PostFilters;