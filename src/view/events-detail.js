import AbstractView from "./abstract";

const createEventsDetailContainer = () => {
  return `<section class="event__details"></section>`;
};

export default class EventDetail extends AbstractView {
  getTemplate() {
    return createEventsDetailContainer();
  }
}
