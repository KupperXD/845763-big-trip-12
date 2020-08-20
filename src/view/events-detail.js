import {createElement} from "../utils";

const createEventsDetailContainer = () => {
  return `<section class="event__details"></section>`;
};

export default class EventDetail {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEventsDetailContainer();
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
