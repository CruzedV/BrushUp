import { Image } from "antd";
import styles from "./styles.module.scss";
import ReferencesTopPanel from "./TopPanel";

const ReferencesPage = () => {
  return (
    <div>
      <ReferencesTopPanel />
      <div className={styles.referenceContent}>
        <Image alt="Reference" src="/BG.png" preview={false} />
      </div>
    </div>
  );
};

export default ReferencesPage;
