"use client";

import { Input } from 'antd';
import styles from './styles.module.scss';
import { useState } from 'react';
import { ESettings } from '@/variants/settings';
import TextArea from 'antd/es/input/TextArea';

type TProps = {
  title: string;
  defaultValue: string;
  variant?: ESettings;
  placeholder?: string;
};

const InputItem = ({
  title,
  defaultValue,
  placeholder,
  variant = ESettings.input,
}: TProps) => {
  const [value, setValue] = useState<string>(defaultValue);
  return (
    <div className={styles.settingsItem}>
      <span>{title}</span>
      {variant == ESettings.input && (
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder ?? 'Введите значение'}
        />
      )}
      {variant == ESettings.textarea && (
        <TextArea
          rows={4}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder ?? 'Введите текст'}
        />
      )}
      {variant == ESettings.password && (
        <Input.Password
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder ?? 'Введите пароль'} 
        />
      )}
    </div>
  )
};

export default InputItem;
