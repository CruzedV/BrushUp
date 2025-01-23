"use client";

import { Button, Card, Divider } from "antd";
import styles from './styles.module.scss';
import TagGroup from "@/components/Tags/TagGroup";

const LatestItem = () => {
  return (
    <article>
      <Card className={styles.latestItem}>
        <h4>Короткое название статьи</h4>
        <Divider />
        <TagGroup />
        <Divider />
        <div>
          Текст статьи текст статьи текст статьи текст статьи
          Текст статьи текст статьи текст статьи текст статьи
          Текст статьи текст статьи текст статьи текст статьи
        </div>
        <Button onClick={() => window.open('/1')}>Читать</Button>
      </Card>
    </article>
  );
};

export default LatestItem;
