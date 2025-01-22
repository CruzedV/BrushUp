'use client';

import { AutoComplete, Form } from 'antd';
import { useState } from 'react';
import type { AutoCompleteProps } from 'antd';
import TagGroup from '@/components/common/TagGroup';
import styles from './styles.module.scss';

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

const TagsInput = () => {
  const form = Form.useFormInstance();

  const [value, setValue] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);

  const getPanelValue = (searchText: string) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  const onSelect = (data: string) => {
    if (!tags.includes(data)) {
      const newTags = ([ ...tags, data ]);
      setTags(newTags);
      form.setFieldValue('tags', newTags);
    }
    setValue('');
  };

  const onDelete = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
    form.setFieldValue('tags', newTags);
  };

  const onChange = (data: string) => {
    setValue(data);
  };

  return (
    <Form.Item name="tags">
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
        <TagGroup tags={tags} onDelete={onDelete} />
      </div>
    </Form.Item>
  );
};

export default TagsInput;