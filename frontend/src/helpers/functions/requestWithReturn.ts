import axios from "axios";

/**
 * Функция возвращает результат овтета, либо null, если его нет.
 * @param request запрос на отправку данных
 * @param data отправляемые данные
 * @param errorMessage обработчик ошибок в случае ошибки с сервера
 * @param setter установщик значения для данных
 * @param lodaingSetter опциональный установщик загрузки
 */

export const requestWithReturn = async <DataType, ReturnType>(
  request: (data: DataType) => Promise<ReturnType>,
  data: DataType,
  errorMessage?: (text: string) => void,
  setter?: (value: React.SetStateAction<ReturnType>) => void,
  loadingSetter?: (value: React.SetStateAction<boolean>) => void,
): Promise<Awaited<ReturnType> | null> => {
  try {
    if (loadingSetter) loadingSetter(true);
    const response = await request(data);
    if (response && setter) {
      setter(response);
    }
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && errorMessage) {
      errorMessage(error.response?.data.message);
    } else {
      console.error(error);
    }
    return null;
  } finally {
    if (loadingSetter) loadingSetter(false);
  }
};
