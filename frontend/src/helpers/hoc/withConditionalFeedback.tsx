import { TResponsePosts } from "@shared/types/post";
import { Spin } from "antd";
import React, { ComponentType } from "react";

interface FeedbackProps {
  loadingFeedback?: React.ReactNode;
  noDataFeedback?: React.ReactNode;
  dataEmptyFeedback?: React.ReactNode;
}

interface ConditionalFeedbackProps<DataType extends TResponsePosts> {
  data: DataType | null;
  isLoading: boolean;
}

const withConditionalFeedback =
  <DataType extends TResponsePosts, PropsWithoutData extends object>(
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

        )
      }

      if (!props.data) {
        return (
          <div className="feedbackContainer">
            {noDataFeedback || "Данные не загружены"}
          </div>
        );
      }
      if (!props.data.posts.length) {
        return (
          <div className="feedbackContainer">
            {dataEmptyFeedback || "Пусто"}
          </div>
        );
      }

      return (
        <Component
          {...(props as PropsWithoutData & { data: DataType })}
        />
      );
    };

    WrappedComponent.displayName = `withConditionalFeedback(${Component.displayName || Component.name || "Component"})`;

    return WrappedComponent;
  };

export default withConditionalFeedback;