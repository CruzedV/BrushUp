import { Divider } from "antd";
import styles from "./styles.module.scss";

type TProps = {
  children: React.ReactNode;
};

const PageTitle = ({ children }: TProps) => {
  return (
    <div className={styles.pageTitle}>
        {children}
        <Divider />
    </div>
  )
};

export default PageTitle;