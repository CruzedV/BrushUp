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
import { useUserStore } from '@/store/user';
import { useReferenceStore } from '@/store/references';

type TProps = {
  referenceTags: TReferenceTags | null;
}

const GeneratorForm = ({ referenceTags }: TProps) => {

  const router = useRouter();
  const {
    contextHolder,
    errorMessage,
    successMessage,
    warningMessage,
  } = useMessages();
  const user = useUserStore((state) => state.user)
  const { setImages, setTimer }  = useReferenceStore();

  if (!referenceTags) {
    return (
      <span>Произошла ошибка, подождите...</span>
    )
  }

  const onFinish: FormProps<TGenerator>['onFinish'] = async (values ) => {
    const { timer, ...clearData } = values
    const requestedTags: string[] = TagListFromData(clearData);
    const response = await requestWithReturn<string[], TReferenceArray>(
      getImagesByTags,
      requestedTags,
      errorMessage,
    )
    if (response?.total_count) {
      successMessage(
        `Найдено ${response.total_count} изображений!`
      )
      setImages(response);
      console.log(values);
      setTimer(timer ? Number(timer) : TimerOptions[0].value)
      setTimeout(() => router.push(
        `/ref/${user ? user.user_id : 'no_auth'}`),
        1000
      );
    } else {
      warningMessage(`Не найдено подходящий изображений!`)
    }
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
            <Select
              options={TimerOptions}
              defaultValue={TimerOptions[0]}
              fieldNames={{ label: "name" }}
            />
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
