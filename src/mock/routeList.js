
// Функция возвращает мапу по событиям в дате
export const getRouteMap = (wayPoints) => {
    
  let routeList = new Map();
  // Сортируем исходный массив событий по дате
  let dateList = wayPoints.sort((a,b) => {
    return a.date.start.getTime() - b.date.start.getTime();
  });

  // заполняем мапу
  dateList.forEach((el) => {
    const date = el.date.start;
    const month = date.getMonth() + 1;
    const days = date.getDate();
    const currentKeys = `${days}-${month}`;
    const currentValue = [el];
    let isUnique = true;

    if (routeList.size > 0) {
      // проходим по по мапе
      for (const [keys, value] of routeList) {
        // смотрим уникальная ли дата
        if (currentKeys === keys) {
          // если дата в мапе есть добавляем текущий элемент к этой дате
          value.push(el);
          routeList.set(keys, value);
          isUnique = false;
          break;
        }
      }
    }  
    // Если значение уникальное добавляем новую дату в мапу
    if (isUnique) {
      routeList.set(currentKeys, currentValue);
    }
  });

  return routeList;
};