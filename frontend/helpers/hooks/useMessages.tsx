import { message } from "antd";

export function useMessages() {
  const [messageApi, contextHolder] = message.useMessage();

  const errorMessage = (text: string) => {
    messageApi.open({
      type: "error",
      content: text,
    })
  }

  const successMessage = (text: string) => {
    messageApi.open({
      type: "success",
      content: text,
    });
  };

  const warningMessage = (text: string) => {
    messageApi.open({
      type: "warning",
      content: text,
    })
  }

  return { errorMessage, successMessage, warningMessage, contextHolder};
}
