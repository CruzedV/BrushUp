'use client';

import { AutoComplete, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import type { AutoCompleteProps, FormInstance } from 'antd';
import TagGroup from './TagGroup';
import styles from './styles.module.scss';
import { TTag } from '@shared/types/tag';
import { useTagsStore } from '@/store/tags';

type TProps = {
  onChange?: (data: TTag[]) => void;
  form?: FormInstance;
  title?: string;
  emptyTagsText?: string;
  defaultValues?: TTag[];
};

const TagsInput = ({ form, title, emptyTagsText, onChange, defaultValues }: TProps) => {
  return (
    <>
      {form ? (
        <TagsInputForm
          form={form}
          title={title ?? 'Теги для статьи'}
          emptyTagsText={emptyTagsText ?? ''}
        />
      ) : (
        <TagsInputFormless
          title={title}
          emptyTagsText={emptyTagsText}
          onChange={onChange}
          defaultValues={defaultValues}
        />
      )}
    </>
  );
};

const TagsInputForm = ({
  form,
  title,
  emptyTagsText,
}: Required<Pick<TProps, 'form' | 'title' | 'emptyTagsText'>>) => {
  const [value, setValue] = useState<string>('');
  const tagOptions = useTagsStore((state) => state.tags);
  const [options, setOptions] = useState<AutoCompleteProps['options']>(tagOptions);

  const onSearch = (searchText: string) => {
    setOptions(
      tagOptions
        .filter((tag) => tag.name.toLowerCase().includes(searchText.toLowerCase()))
        .map((tag) => ({ value: tag.name, label: tag.name }))
    );
  };

  const onSelect = (selectedName: string) => {
    const currentTags: TTag[] = form.getFieldValue('tags') || [];
    const selectedTag = tagOptions.find((tag) => tag.name === selectedName);
    if (selectedTag && !currentTags.some((tag) => tag.tag_id === selectedTag.tag_id)) {
      const newTags = [...currentTags, selectedTag];
      form.setFieldValue('tags', newTags);
    }
    setValue('');
  };

  const onDelete = (removedTag: TTag) => {
    const currentTags: TTag[] = form.getFieldValue('tags') || [];
    const newTags = currentTags.filter((tag) => tag.tag_id !== removedTag.tag_id);
    form.setFieldValue('tags', newTags);
  };

  return (
    <div className={styles.tagsInput}>
      {title && <span>{title}</span>}
      <AutoComplete
        value={value}
        options={options}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={setValue}
      >
        <Input.Search placeholder="Поиск по тегам" enterButton={true} />
      </AutoComplete>
      <Form.Item name="tags">
        <TagGroup tags={form.getFieldValue('tags')} onDelete={onDelete} emptyTagsText={emptyTagsText} />
      </Form.Item>
    </div>
  );
};

const TagsInputFormless = ({
  title,
  emptyTagsText,
  onChange,
  defaultValues,
}: TProps) => {
  const [value, setValue] = useState<string>('');
  const [tags, setTags] = useState<TTag[]>(defaultValues || []);
  const tagOptions = useTagsStore((state) => state.tags);
  const [options, setOptions] = useState<AutoCompleteProps['options']>(tagOptions);

  useEffect(() => {
    if (defaultValues && defaultValues?.length >= 0) {
      setTags(defaultValues);
    }
  }, [defaultValues])

  const onSearch = (searchText: string) => {
    setOptions(
      tagOptions
        .filter((tag) => tag.name.toLowerCase().includes(searchText.toLowerCase()))
        .map((tag) => ({ value: tag.name, label: tag.name }))
    );
  };

  const onSelect = (selectedName: string) => {
    const selectedTag = tagOptions.find((tag) => tag.name === selectedName);
    if (selectedTag && !tags.some((tag) => tag.tag_id === selectedTag.tag_id)) {
      const newTags = [...tags, selectedTag];
      setTags(newTags);
      if (onChange) onChange(newTags);
    }
    setValue('');
  };

  const onDelete = (removedTag: TTag) => {
    const newTags = tags.filter((tag) => tag.tag_id !== removedTag.tag_id);
    setTags(newTags);
    if (onChange) onChange(newTags);
  };

  return (
    <div className={styles.tagsInput}>
      {title && <span>{title}</span>}
      <AutoComplete
        value={value}
        options={options}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={setValue}
      >
        <Input.Search placeholder="Поиск по тегам" enterButton={true} />
      </AutoComplete>
      <TagGroup tags={tags} onDelete={onDelete} emptyTagsText={emptyTagsText} />
    </div>
  );
};

export default TagsInput;
