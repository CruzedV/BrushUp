import { Input } from 'antd';
import styles from './styles.module.scss';
import { useState } from 'react';
import { ESettings } from '@/variants/settings';
import TextArea from 'antd/es/input/TextArea';

type TProps = {
  title: string;
  defaultValue: string;
  variant?: ESettings;
};

const SettingsItem = ({
  title,
  defaultValue,
  variant = ESettings.input,
}: TProps) => {
  const [value, setValue] = useState<string>(defaultValue);
  return (
    <div className={styles.settingsItem}>
      <span>{title}</span>
      {variant == ESettings.input && (
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
      )}
      {variant == ESettings.textarea && (
        <TextArea
          rows={4}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
      {variant == ESettings.password && (
        <Input.Password
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="input password"
        />
      )}
    </div>
  )
};

export default SettingsItem;
