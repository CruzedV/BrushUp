'use client';

import { Button, Card } from 'antd';
import styles from './styles.module.scss';
import Link from 'next/link';
import '@/globals.scss';
import {
  BackwardOutlined,
  ForwardOutlined,
  PauseOutlined,
  StopOutlined,
} from '@ant-design/icons';

const ReferencesTopPanel = () => {
  return (
    <Card className={`header ${styles.topPanel}`}>
      <h2>
        <Link href="/">BrushUp</Link>
      </h2>
      <Button>
        <BackwardOutlined />
        Предыдущая  
      </Button>
      <Button className={styles.stopBtn}>
        <StopOutlined />
        Стоп
      </Button>
      <Button>
        Пауза
        <PauseOutlined />
      </Button>
      <Button className={styles.nextBtn}>
        Следующая
        <ForwardOutlined />
      </Button>
    </Card>
  );
};

export default ReferencesTopPanel;

