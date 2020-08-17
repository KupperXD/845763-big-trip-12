import {createElement} from "../utils";

const createTripDayHolder = (date = `MAR 18`, count = 1) => {
  return `<li class="trip-days__item day">
      <div class="day__info">
        <span class="day__counter">${count}</span>
        <time class="day__date" datetime="2019-03-18">${date}</time>
      </div>
      <ul class="trip-events__list"></ul>
      </li>`;
};

export default class Day {
  constructor(date, count) {
    this._element = null;
    this._date = date;
    this._count = count;
  }
  getTemplate() {
    return createTripDayHolder(this._date, this._count);
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
