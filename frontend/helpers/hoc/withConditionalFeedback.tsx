import React, { ComponentType } from "react";

interface FeedbackProps {
  loadingFeedback?: React.ReactNode;
  noDataFeedback?: React.ReactNode;
  dataEmptyFeedback?: React.ReactNode;
}

interface ConditionalFeedbackProps<DataType> {
  data?: DataType[] | null;
}

const withConditionalFeedback =
  <DataType, PropsWithoutData extends object>(
    { noDataFeedback, dataEmptyFeedback }: FeedbackProps
  ) =>
  (Component: ComponentType<PropsWithoutData & { data: DataType | DataType[] }>) => {
    const WrappedComponent = (props: PropsWithoutData & ConditionalFeedbackProps<DataType>) => {
      if (!props.data) {
        return (
          <div className="feedbackContainer">
            {noDataFeedback || "Данные не загружены"}
          </div>
        );
      }
      if (!props.data.length) { 
        return (
          <div className="feedbackContainer">
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