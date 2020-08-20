import {createElement} from "../utils";

const createLoaderTemplate = () => `<p class="trip-events__msg">Loading...</p>`;

export default class Loader {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createLoaderTemplate();
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
