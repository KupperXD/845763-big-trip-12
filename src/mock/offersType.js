const MAX_OFFERS = 5;

// TODO: вынести функцию в утилитарный модуль

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// Возвращает название доп опции
const generateNameOffers = () => {
  const offersName = [
    `food`,
    `massage`,
    `escort`,
    `baggage`,
    `dance`
  ];

  const randomIndex = getRandomInteger(0, offersName.length - 1);

  return offersName[randomIndex];
};

// возвращает цену
const generatePrice = () => {
  const prices = [
    500,
    1000,
    1500,
    2500
  ];

  const randomIndex = getRandomInteger(0, prices.length - 1);

  return prices[randomIndex];
};

// возвращает null или массив объектов доп опции
export const generateOffers = (type) => {
  const offersList = [];

  for (let i = 0; i < getRandomInteger(0, MAX_OFFERS); i++) {

    offersList.push({
      type,
      name: generateNameOffers(),
      price: generatePrice()
    });
  }

  return (offersList.length) ? offersList : null;
};