import AbstractView from "./abstract";

const createEventsDaysHolder = () => {
  return `<ul class="trip-days">

              </ul>`;
};

export default class Days extends AbstractView {
  getTemplate() {
    return createEventsDaysHolder();
  }
}
