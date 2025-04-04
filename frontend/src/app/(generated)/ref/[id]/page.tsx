import { Image } from "antd";
import styles from "./styles.module.scss";
import ReferencesTopPanel from "./TopPanel";
import { IMAGE_PREFIX } from "@shared/config";

const ReferencesPage = () => {
  return (
    <div>
      <ReferencesTopPanel />
      <div className={styles.referenceContent}>
        <Image alt="Reference" src={IMAGE_PREFIX+"/BG.png"} preview={false} />
      </div>
    </div>
  );
};

export default ReferencesPage;
