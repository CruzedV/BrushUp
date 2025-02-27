import { Spin } from "antd";
import React, { ComponentType } from "react";
import styles from './styles.module.scss';

interface FeedbackProps {
  loadingFeedback?: React.ReactNode;
  noDataFeedback?: React.ReactNode;
  dataEmptyFeedback?: React.ReactNode;
}

interface ConditionalFeedbackProps<DataType> {
  isLoading: boolean;
  data?: DataType[] | null;
}

const withConditionalFeedback =
  <DataType, PropsWithoutData extends object>(
    { loadingFeedback, noDataFeedback, dataEmptyFeedback }: FeedbackProps
  ) =>
  (Component: ComponentType<PropsWithoutData & { data: DataType | DataType[] }>) => {
    const WrappedComponent = (props: PropsWithoutData & ConditionalFeedbackProps<DataType>) => {
      if (props.isLoading) {
        return (
          <div className={styles.feedbackContainer}>
            {loadingFeedback || "Загрузка данных..."}
            <Spin />
          </div>
        );
      }

      if (!props.data) {
        return (
          <div className={styles.feedbackContainer}>
            {noDataFeedback || "Данные не загружены"}
          </div>
        );
      }
      if (!props.data.length) { 
        return (
          <div className={styles.feedbackContainer}>
            {dataEmptyFeedback || "Пусто"}
          </div>
        );
      }

      return (
        <Component
          {...(props as PropsWithoutData & { data: DataType | DataType[] })}
        />
      );
    };

    WrappedComponent.displayName = `withConditionalFeedback(${Component.displayName || Component.name || "Component"})`;

    return WrappedComponent;
  };

export default withConditionalFeedback;