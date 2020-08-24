import AbstractView from "./abstract";

const createLoaderTemplate = () => `<p class="trip-events__msg">Loading...</p>`;

export default class Loader extends AbstractView {
  getTemplate() {
    return createLoaderTemplate();
  }
}
