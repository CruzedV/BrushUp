import { Button } from 'antd';
import styles from './styles.module.scss';

const ReferencesTopPanel = () => {
  return (
    <div className={styles.topPanel}>
      <Button type="primary">Предыдущая</Button>
      <Button color="danger">Стоп</Button>
      <Button type="primary">Пауза</Button>
      <Button className={styles.nextBtn}>Следующая</Button>
    </div>
  );
};

export default ReferencesTopPanel;

