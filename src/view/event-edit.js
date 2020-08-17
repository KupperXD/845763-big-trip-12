import {createElement} from "../utils";

const createEventEditHolderTemplate = () => `<form class="trip-events__item event  event--edit" action="#" method="post"></form>`;

export default class EventEdit {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEventEditHolderTemplate();
  }

  getElement () {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
