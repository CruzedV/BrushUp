import { Button, Card } from 'antd';
import styles from './styles.module.scss';

const ReferencesTopPanel = () => {
  return (
    <Card className={styles.topPanel}>
      <Button type="primary">Предыдущая</Button>
      <Button className={styles.stopBtn}>Стоп</Button>
      <Button type="primary">Пауза</Button>
      <Button className={styles.nextBtn}>Следующая</Button>
    </Card>
  );
};

export default ReferencesTopPanel;

