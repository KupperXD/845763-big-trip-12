import {generateOffers} from "./offersType.js";

const MAX_MESSAGE_DESC = 5;
const MIN_MESSAGE_DESC = 1;
const YEAR = 2020;

// Возвращает рандомное число
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateDate = () => {
  const month = getRandomInteger(0, 11);
  const days = getRandomInteger(0, 31);
  const hours = getRandomInteger(0, 23);
  const minutes = getRandomInteger(0, 59);
  const finishHours = getRandomInteger(hours, 23);
  const finishMinutes = getRandomInteger(minutes + 1, 59);
  const start = new Date(YEAR, month, days, hours, minutes);
  const finish = new Date(YEAR, month, days, finishHours, finishMinutes);

  return {
    start,
    finish,
  };
};

// Возвращает строку с рандомным количеством предложений
const generateDesc = () => {
  const maxMessage = getRandomInteger(MIN_MESSAGE_DESC, MAX_MESSAGE_DESC);
  const spliceMessage = 1;
  const larumText = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];
  let message = ``;

  for (let i = 1; i <= maxMessage; i++) {
    const count = getRandomInteger(0, larumText.length - 1);
    const [value] = larumText.splice(count, spliceMessage);

    message = message.concat(value);
  }

  return message;
};

// Возвращает рандомный тип точки маршрута

const generateTypePoint = () => {
  const types = [
    `Taxi`,
    `Bus`,
    `Train`,
    `Ship`,
    `Transport`,
    `Drive`,
    `Flight`,
    `Check`,
    `Sightseeing`,
    `Restaurant`
  ];
  const randomIndex = getRandomInteger(0, types.length - 1);

  return types[randomIndex];
};

// возвращает рандомный город
const generateCity = () => {
  const cities = [
    `Moscow`,
    `New-York`,
    `Kiev`,
    `Minsk`
  ];

  const randomIndex = getRandomInteger(0, cities.length - 1);

  return cities[randomIndex];
};

const generetaPrice = () => {
  const minPrice = 10;
  const maxPrice = 200;

  return getRandomInteger(minPrice, maxPrice);
};

// Создает точку маршрута в виде объекта
export const createWayPoint = () => {

  const type = generateTypePoint();
  const date = generateDate();
  const offers = generateOffers(type);
  const price = generetaPrice();
  let offersPrice = 0;

  if (offers !== null) {
    offersPrice = offers.reduce((accumulator, element) => accumulator + element.price, 0);
  }

  let amountPrice = price + offersPrice;

  return {
    type,
    city: generateCity(),
    date,
    offers,
    infoPoint: {
      description: generateDesc(),
      photo: `http://picsum.photos/248/152?r=${Math.random()}`,
    },
    price,
    amountPrice
  }
};