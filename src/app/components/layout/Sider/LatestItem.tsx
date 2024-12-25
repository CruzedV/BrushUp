'use client'

import { Button, Card, Divider } from "antd";
import styles from './styles.module.scss';
import TagGroup from "../../helpers/TagGroup";

const LatestItem = () => {
  const handleOpenLatest = () => {
    window.open('/1');
  };

  return (
    <article>
      <Card className={styles.latestItem} onClick={handleOpenLatest}>
        <h4>Короткое название статьи</h4>
        <Divider />
        <TagGroup />
        <Divider />
        <div>
          Текст статьи текст статьи текст статьи текст статьи
          Текст статьи текст статьи текст статьи текст статьи
          Текст статьи текст статьи текст статьи текст статьи
        </div>
        <Button>Читать</Button>
      </Card>
    </article>
  );
};

export default LatestItem;
