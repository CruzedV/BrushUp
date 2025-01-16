"use client";

import { AutoComplete } from "antd";
import { useState } from "react";
import type { AutoCompleteProps } from 'antd';
import TagGroup from "@/components/common/TagGroup";
import styles from './styles.module.scss';

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

const TagsInput = () => {
  const [value, setValue] = useState<string>('');
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);

  const getPanelValue = (searchText: string) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  const onSelect = (data: string) => {
    console.log('onSelect', data);
  };

  const onChange = (data: string) => {
    setValue(data);
  };

  return (
    <div className={styles.tagsInput}>
      <span>Теги для статьи</span>
      <AutoComplete
        value={value}
        options={options}
        onSelect={onSelect}
        onSearch={(text) => setOptions(getPanelValue(text))}
        onChange={onChange}
        placeholder="Начните вводить"
      />
      <TagGroup />
    </div>
  );
};

export default TagsInput;