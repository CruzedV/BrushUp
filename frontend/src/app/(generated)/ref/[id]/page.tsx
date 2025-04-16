"use client";

import { Image } from "antd";
import styles from "./styles.module.scss";
import ReferencesTopPanel from "./TopPanel";
import { useReferenceStore } from "@/store/references";

const ReferencesPage = () => {
  const { images, currentIndex } = useReferenceStore();
  const currentImage = images[currentIndex];
  return (
    
    <div>
      <ReferencesTopPanel />
      <div className={styles.referenceContent}>
        {!currentImage ? (
          <p>Нет изображений</p>
        ) : (
          <Image
            alt="Reference"
            src={currentImage}
            preview={false}
          />
        )}
      </div>
    </div>
  );
};

export default ReferencesPage;
