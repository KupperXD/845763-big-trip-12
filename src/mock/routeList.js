// Функция возвращает мапу по событиям в дате
export const getRouteMap = (wayPoints) => {
  const routes = new Map();
  // Сортируем исходный массив событий по дате
  const dates = wayPoints.sort((a, b) => {
    return a.date.start.getTime() - b.date.start.getTime();
  });

  // заполняем мапу
  dates.forEach((date) => {
    const dateStart = date.date.start;
    const month = dateStart.getMonth() + 1;
    const days = dateStart.getDate();
    const currentKeys = `${days}-${month}`;
    const currentValue = [date];
    let isUnique = true;

    if (routes.size > 0) {
      // проходим по по мапе
      for (const [key, value] of routes) {
        // смотрим уникальная ли дата
        if (currentKeys === key) {
          // если дата в мапе есть добавляем текущий элемент к этой дате
          value.push(date);
          routes.set(key, value);
          isUnique = false;
          break;
        }
      }
    }
    // Если значение уникальное добавляем новую дату в мапу
    if (isUnique) {
      routes.set(currentKeys, currentValue);
    }
  });

  return routes;
};
