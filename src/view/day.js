import AbstractView from "./abstract";

const createTripDayHolder = (date = `MAR 18`, count = 1) => {
  return `<li class="trip-days__item day">
      <div class="day__info">
        <span class="day__counter">${count}</span>
        <time class="day__date" datetime="2019-03-18">${date}</time>
      </div>
      <ul class="trip-events__list"></ul>
      </li>`;
};

export default class Day extends AbstractView {
  constructor(date, count) {
    super();
    this._date = date;
    this._count = count;
  }
  getTemplate() {
    return createTripDayHolder(this._date, this._count);
  }
}
