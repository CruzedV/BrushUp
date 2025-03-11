'use client';

import type { FormProps } from 'antd';
import { Button, Card, Form, Select } from 'antd';
import styles from "./styles.module.scss";
import { TGenerator } from '@/types/references';
import { useRouter } from 'next/navigation';
import { useMessages } from '@/helpers/hooks/useMessages';
import { TReferenceTags } from '@shared/types/reference';
import { TimerOptions } from './TimerOptions';

type TProps = {
  referenceTags: TReferenceTags | null;
}

const GeneratorForm = ({ referenceTags }: TProps) => {
  const router = useRouter();
  const { errorMessage } = useMessages();

  const onFinish: FormProps<TGenerator>['onFinish'] = (values) => {
    const requestedTags = [];
    requestedTags.push();
    console.log(values);
    
    router.push('/ref/1');
  };
  
  const onFinishFailed: FormProps<TGenerator>['onFinishFailed'] = (errorInfo) => {
    errorMessage(`Ошибка при отправке формы ${errorInfo}`);
  };

  if (!referenceTags) {
    return (
      <span>Произошла ошибка, подождите...</span>
    )
  }

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
          <Select options={referenceTags.sex}/>
        </Form.Item>

        <Form.Item<TGenerator>
          label="Одежда"
          name="clothing"
        >
          <Select options={referenceTags.clothing} />
        </Form.Item>

        <Form.Item<TGenerator>
          label="Поза"
          name="pose"
        >
          <Select options={referenceTags.pose} />
        </Form.Item>

        <Form.Item<TGenerator>
          label="Вид"
          name="view"
        >
          <Select options={referenceTags.view} />
        </Form.Item>

        <Form.Item<TGenerator>
          label="Таймер"
          name="timer"
        >
          <Select options={TimerOptions} />
        </Form.Item>
        <Form.Item<TGenerator> className={styles.generatorSubmit}>
          <Button type="primary" htmlType="submit">Начать</Button>
        </Form.Item>
      </Card>
    </Form>
  )
}

export default GeneratorForm;
