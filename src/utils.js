// Возвращает рандомное число
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getHours = (value) => Math.floor(value / 60).toString().padStart(2, `0`);
export const getMinutes = (value) => Math.floor(value % 60).toString().padStart(2, `0`);

