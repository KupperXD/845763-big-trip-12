import {getRandomInteger} from "../utils";
import {MAX_OFFERS, OFFERS} from "../constans";

// Возвращает название доп опции
const generateNameOffers = () => {
  const randomIndex = getRandomInteger(0, OFFERS.length - 1);

  return OFFERS[randomIndex];
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
