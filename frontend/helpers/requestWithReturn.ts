/**
 * @param request запрос на отправку данных
 * @param data отправляемые данные
 * @param setter установщик значения для данных
 * @param lodaingSetter опциональный установщик загрузки
 */

export const requestWithReturn = async <Type>(
  request: (data?: Type) => Promise<Type | null>,
  setter?: (value: React.SetStateAction<Type>) => void,
  loadingSetter?: (value: React.SetStateAction<boolean>) => void,
  data?: Type,
): Promise<void> => {
  try {
    if (loadingSetter) loadingSetter(true);
    const response = await request(data ? data : undefined);
    if (response && setter) {
      setter(response);
    }
  } catch (error) {
    console.error(error);
  } finally {
    if (loadingSetter) loadingSetter(false);
  }
};
