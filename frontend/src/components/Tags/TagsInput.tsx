'use client';

import { AutoComplete, Form, Input } from 'antd';
import { useState } from 'react';
import type { AutoCompleteProps, FormInstance } from 'antd';
import TagGroup from './TagGroup';
import styles from './styles.module.scss';

type TProps = {
  onChange?: (data: string[]) => void;
  form?: FormInstance;
  title?: string;
  emptyTagsText?: string;
};

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

const TagsInput = ({ form, title, emptyTagsText, onChange }: TProps) => {
  return (
    <>
      {form
        ? <TagsInputForm
            form={form}
            title={title ?? 'Теги для статьи'}
            emptyTagsText={emptyTagsText ?? ''}
          />
        : <TagsInputFormless
            title={title}
            emptyTagsText={emptyTagsText}
            onChange={onChange}
          />
      }
    </>
  )
};

const TagsInputForm = ({
  form,
  title,
  emptyTagsText,
}: Required<Pick<TProps, "form" | "title" | "emptyTagsText">>) => {
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

  const onChangeInput = (data: string) => {
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
        onChange={onChangeInput}
      >
        <Input.Search placeholder="Поиск по тегам" enterButton={true} />
      </AutoComplete>
      <Form.Item name="tags">
        <TagGroup
          tags={form.getFieldValue('tags')}
          onDelete={onDelete}
          emptyTagsText={emptyTagsText}
        />
      </Form.Item>
    </div>
  );
};

const TagsInputFormless = ({ title, emptyTagsText, onChange }: TProps) => {
  const [value, setValue] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);

  const getPanelValue = (searchText: string) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  const onSelect = (data: string) => {
    if (!tags.includes(data)) {
      const newTags = ([ ...tags, data ]);
      setTags(newTags);
      if (onChange) onChange(newTags);
    }
    setValue('');
  };

  const onDelete = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
    if (onChange) onChange(newTags);
  };

  const onChangeInput = (data: string) => {
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
        onChange={onChangeInput}
      >
        <Input.Search placeholder="Поиск по тегам" enterButton={true} />
      </AutoComplete>
      <TagGroup
        tags={tags}
        onDelete={onDelete}
        emptyTagsText={emptyTagsText}
      />
    </div>
  );
}

export default TagsInput;