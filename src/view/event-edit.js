import AbstractView from "./abstract";

const createEventEditHolderTemplate = () => `<form class="trip-events__item event  event--edit" action="#" method="post"></form>`;

export default class EventEdit extends AbstractView {
  getTemplate() {
    return createEventEditHolderTemplate();
  }

  getDetailHolder() {
    return this.getElement().querySelector(`.event__details`);
  }
}
