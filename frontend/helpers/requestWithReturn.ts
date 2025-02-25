/**
 * Функция возвращает результат овтета, либо null, если его нет.
 * @param request запрос на отправку данных
 * @param data отправляемые данные
 * @param setter установщик значения для данных
 * @param lodaingSetter опциональный установщик загрузки
 */

export const requestWithReturn = async <DataType, ReturnType>(
  request: (data: DataType) => Promise<ReturnType>,
  data: DataType,
  errorMessage: (text: string) => void,
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
    console.error(error);
    errorMessage();
    return null;
  } finally {
    if (loadingSetter) loadingSetter(false);
  }
};
