'use client';

import type { FormProps } from 'antd';
import { Button, Card, Form, Select } from 'antd';
import styles from "./styles.module.scss";
import { TGenerator } from '@/types/references';
import { useRouter } from 'next/navigation';
import { useMessages } from '@/helpers/hooks/useMessages';
import { TReferenceArray, TReferenceTags } from '@shared/types/reference';
import { TimerOptions } from './TimerOptions';
import { requestWithReturn } from '@/helpers/functions/requestWithReturn';
import { getImagesByTags } from '@/api/references';
import { TagListFromData } from '@/helpers/functions/references/TagListFromData';

type TProps = {
  referenceTags: TReferenceTags | null;
}

const GeneratorForm = ({ referenceTags }: TProps) => {

  const router = useRouter();
  const { contextHolder, errorMessage } = useMessages();

  if (!referenceTags) {
    return (
      <span>Произошла ошибка, подождите...</span>
    )
  }

  const onFinish: FormProps<TGenerator>['onFinish'] = async (values ) => {
    const requestedTags: string[] = TagListFromData(values);
    const response = await requestWithReturn<string[], TReferenceArray>(
      getImagesByTags,
      requestedTags,
      errorMessage,
    )
    console.log(response);
  };
  
  const onFinishFailed: FormProps<TGenerator>['onFinishFailed'] = (errorInfo) => {
    errorMessage(`Ошибка при отправке формы ${errorInfo}`);
  };

  return (
    <>
      {contextHolder}
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
            <Select
              options={referenceTags.sex}
              fieldNames={{
                label: "name",
                value: "name",
              }}
            />
          </Form.Item>

          <Form.Item<TGenerator>
            label="Одежда"
            name="clothing"
          >
            <Select
              options={referenceTags.clothing}
              fieldNames={{
                label: "name",
                value: "name",
              }}
            />
          </Form.Item>

          <Form.Item<TGenerator>
            label="Поза"
            name="pose"
          >
            <Select
              options={referenceTags.pose}
              fieldNames={{
                label: "name",
                value: "name",
              }}
            />
          </Form.Item>

          <Form.Item<TGenerator>
            label="Вид"
            name="view"
          >
            <Select
              options={referenceTags.view}
              fieldNames={{
                label: "name",
                value: "name",
              }}
            />
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
    </>
  )
}

export default GeneratorForm;
