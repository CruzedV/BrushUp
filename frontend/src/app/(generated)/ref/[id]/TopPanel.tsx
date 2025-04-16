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
import { useReferenceStore } from '@/store/references';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const ReferencesTopPanel = () => {
  const { images, currentIndex, next, prev, timer } = useReferenceStore();
  const router = useRouter();

  const [isPaused, setIsPaused] = useState(false);
  const [remainingTime, setRemainingTime] = useState(timer);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const onClose = () => {
    router.push("/references/generator");
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  useEffect(() => {
    setRemainingTime(timer);
  }, [currentIndex, timer]);

  useEffect(() => {
    if (!isPaused && currentIndex < images.length - 1) {
      intervalRef.current = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            next();
            return timer;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, [isPaused, currentIndex, timer]);

  return (
    <Card className={`header ${styles.topPanel}`}>
      <h2>
        <Link href="/">BrushUp</Link>
      </h2>

      <Button disabled={currentIndex === 0} onClick={prev}>
        <BackwardOutlined />
        Предыдущая
      </Button>

      <Button onClick={onClose} className={styles.stopBtn}>
        <StopOutlined />
        Стоп
      </Button>

      <Button onClick={togglePause}>
        {isPaused ? 'Продолжить' : 'Пауза'}
        <PauseOutlined />
      </Button>

      <Button
        onClick={next}
        className={styles.nextBtn}
        disabled={currentIndex === images.length - 1}
      >
        Следующая
        <ForwardOutlined />
      </Button>

      <div className={styles.timerBlock}>
        Осталось: {remainingTime} сек.
      </div>
    </Card>
  );
};

export default ReferencesTopPanel;