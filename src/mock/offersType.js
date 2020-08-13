import {getRandomInteger} from "../utils";
import {MAX_OFFERS} from "../constans";

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
