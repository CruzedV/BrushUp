import { message } from "antd";

function useMessages() {
  const [messageApi, contextHolder] = message.useMessage();
}