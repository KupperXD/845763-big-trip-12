import {getRandomInteger} from "../utils/common";
import {MAX_OFFERS, OFFERS, TYPES} from "../constans";

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

const generateOfferItems = () => {
  const offersList = [];

  for (let i = 0; i < getRandomInteger(0, MAX_OFFERS); i++) {

    offersList.push({
      name: generateNameOffers(),
      price: generatePrice()
    });
  }

  return (offersList.length) ? offersList : null;
};

// возвращает null или массив объектов доп опции

export const generateOffers = () => {
  const offersList = {};

  TYPES.forEach((type) => {
    const offerItems = generateOfferItems();

    offersList[type] = offerItems;
  });

  return offersList;
};
