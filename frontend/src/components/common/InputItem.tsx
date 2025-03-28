"use client";

import { Input } from 'antd';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { ESettings } from '@/variants/settings';
import TextArea from 'antd/es/input/TextArea';

type TProps = {
  defaultValue: string;
  title?: string;
  onChange?: (data: string) => void;
  variant?: ESettings;
  placeholder?: string;
  rows?: number;
};

const InputItem = ({
  defaultValue,
  title,
  onChange,
  placeholder,
  variant = ESettings.input,
  rows = 4,
}: TProps) => {
  const [value, setValue] = useState<string>(defaultValue);

  const handleChange = (data: string) => {
    setValue(data);
    if (onChange) onChange(data);
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue])

  return (
    <div className={styles.settingsItem}>
      {title && <span>{title}</span>}
      {variant == ESettings.input && (
        <Input
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder ?? 'Введите значение'}
        />
      )}
      {variant == ESettings.textarea && (
        <TextArea
          rows={rows}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder ?? 'Введите текст'}
        />
      )}
      {variant == ESettings.password && (
        <Input.Password
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder ?? 'Введите пароль'} 
        />
      )}
      {variant == ESettings.search && (
        <Input.Search
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          enterButton={true}
          placeholder={placeholder ?? 'Поиск'}
        />
      )}
    </div>
  )
};

export default InputItem;
