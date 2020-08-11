const isLocation = (type) => {
  const locationList = [`Check-in`, `Sightseeng`, `Restaurant`];

  return (locationList.indexOf(type) !== -1) ? true : false;
};

const getHours = (value) => Math.floor(value / 60).toString().padStart(2, `0`);
const getMinutes = (value) => Math.floor(value % 60).toString().padStart(2, `0`);

const generateOffersTemplate = (offers) => {

  if (offers === null) {
    return false;
  }

  return offers.map((el) => {
    return `<li class="event__offer">
            <span class="event__offer-title">${el.name}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${el.price}</span>
            </li>`;
  });
};


export const createTripEventItemTempalte = (wayPoint) => {

  const {type, price, date, offers, city} = wayPoint;

  const timeStart = (date.start.getHours() * 60) + date.start.getMinutes();
  const timeFinish = (date.finish.getHours() * 60) + date.finish.getMinutes();
  let durationTime = timeFinish - timeStart;
  const durationHours = Math.floor(durationTime / 60);
  const durationMinutes = durationTime % 60;
  const offersTemplate = generateOffersTemplate(offers);

  return `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${isLocation(type) ? `in` : `to`} ${city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${getHours(timeStart)}:${getMinutes(timeStart)}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${getHours(timeFinish)}:${getMinutes(timeFinish)}</time>
          </p>
          <p class="event__duration">${(durationHours > 0) ? `${durationHours}H` : ``} ${durationMinutes}M</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers ${!offersTemplate ? `visually-hidden` : ``}">
          ${ (offersTemplate) ? offersTemplate.join(``) : ``}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`;
};
