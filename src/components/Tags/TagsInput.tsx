'use client';

import { AutoComplete, Form } from 'antd';
import { useState } from 'react';
import type { AutoCompleteProps, FormInstance } from 'antd';
import TagGroup from './TagGroup';
import styles from './styles.module.scss';

type TProps = {
  form?: FormInstance;
  title?: string;
};

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

const TagsInput = ({ form, title }: TProps) => {
  return (
    <>
      {form
        ? <TagsInputForm form={form} title={title ?? 'Теги для статьи'} />
        : <TagsInputFormless title={title} />
      }
    </>
  )
};

const TagsInputForm = ({ form, title}: Required<TProps>) => {
  const [value, setValue] = useState<string>('');
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);

  const getPanelValue = (searchText: string) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  const onSelect = (data: string) => {
    const currentTags = form?.getFieldValue('tags') || [];
    if (!currentTags.includes(data)) {
      const newTags = [...currentTags, data];
      form.setFieldValue('tags', newTags);
    }
    setValue('');
  };

  const onDelete = (removedTag: string) => {
    const currentTags = form?.getFieldValue('tags') || [];
    const newTags = currentTags.filter((tag: string) => tag !== removedTag);
    form.setFieldValue('tags', newTags);
  };

  const onChange = (data: string) => {
    setValue(data);
  };

  return (
    <Form.Item name="tags">
      <div className={styles.tagsInput}>
        {title && <span>{title}</span>}
        <AutoComplete
          value={value}
          options={options}
          onSelect={onSelect}
          onSearch={(text) => setOptions(getPanelValue(text))}
          onChange={onChange}
          placeholder="Начните вводить"
        />
        <TagGroup tags={form.getFieldValue('tags')} onDelete={onDelete} />
      </div>
    </Form.Item>
  );
};

const TagsInputFormless = ({ title }: TProps) => {
  const [value, setValue] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);

  const getPanelValue = (searchText: string) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  const onSelect = (data: string) => {
    if (!tags.includes(data)) {
      const newTags = ([ ...tags, data ]);
      setTags(newTags);
    }
    setValue('');
  };

  const onDelete = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const onChange = (data: string) => {
    setValue(data);
  };

  return (
    <div className={styles.tagsInput}>
      {title && <span>{title}</span>}
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
  );
}

export default TagsInput;