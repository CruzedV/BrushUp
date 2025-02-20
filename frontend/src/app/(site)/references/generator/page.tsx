'use client';

import type { FormProps } from 'antd';
import { Button, Card, Form, Select } from 'antd';
import styles from "./styles.module.scss";
import { TGenerator } from '@/types/references';
import { useRouter } from 'next/navigation';

const GeneratorPage = () => {
  const router = useRouter();

  const onFinish: FormProps<TGenerator>['onFinish'] = (values) => {
    console.log('Успех:', values);
    router.push('/ref/1');
  };
  
  const onFinishFailed: FormProps<TGenerator>['onFinishFailed'] = (errorInfo) => {
    console.log('Ошибка:', errorInfo);
  };

  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className={styles.generatorPage}
      layout="vertical"
    >
      <Card className={styles.generatorPageCard}>
        <Form.Item<TGenerator>
          label="Пол"
          name="sex"
        >
          <Select />
        </Form.Item>

        <Form.Item<TGenerator>
          label="Одежда"
          name="clothing"
        >
          <Select />
        </Form.Item>

        <Form.Item<TGenerator>
          label="Поза"
          name="pose"
        >
          <Select />
        </Form.Item>

        <Form.Item<TGenerator>
          label="Вид"
          name="view"
        >
          <Select />
        </Form.Item>

        <Form.Item<TGenerator>
          label="Таймер"
          name="timer"
        >
          <Select />
        </Form.Item>
        <Form.Item<TGenerator> className={styles.generatorSubmit}>
          <Button type="primary" htmlType="submit">Начать</Button>
        </Form.Item>
      </Card>
    </Form>
  )
};

export default GeneratorPage;
