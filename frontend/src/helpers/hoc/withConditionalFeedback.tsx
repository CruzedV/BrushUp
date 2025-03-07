import { Spin } from "antd";
import React, { ComponentType } from "react";

interface FeedbackProps {
  loadingFeedback?: React.ReactNode;
  noDataFeedback?: React.ReactNode;
  dataEmptyFeedback?: React.ReactNode;
}

interface ConditionalFeedbackProps<DataType> {
  data: DataType | null;
  isLoading?: boolean;
}

const withConditionalFeedback =
  <
    DataType extends { posts?: unknown[] } | unknown[],
    PropsWithoutData extends object
  >(
    { noDataFeedback, dataEmptyFeedback }: FeedbackProps
  ) =>
  (Component: ComponentType<PropsWithoutData & { data: DataType | null }>) => {
    const WrappedComponent = (props: PropsWithoutData & ConditionalFeedbackProps<DataType>) => {
      if (props.isLoading) {
        return (
          <div className="feedbackContainer">
            <Spin />
            Идет загрузка...
          </div>
        );
      }

      if (!props.data) {
        return (
          <div className="feedbackContainer">
            {noDataFeedback || "Данные не загружены"}
          </div>
        );
      }

      const isEmpty =
        Array.isArray(props.data) ? props.data.length === 0 : props.data.posts?.length === 0;

      if (isEmpty) {
        return (
          <div className="feedbackContainer">
            {dataEmptyFeedback || "Пусто"}
          </div>
        );
      }

      return <Component {...(props as PropsWithoutData & { data: DataType })} />;
    };

    WrappedComponent.displayName = `withConditionalFeedback(${Component.displayName || Component.name || "Component"})`;

    return WrappedComponent;
  };

export default withConditionalFeedback;