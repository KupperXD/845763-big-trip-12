import Abstract from "./abstract";

export default class Smart extends Abstract {
  constructor() {
    super();
    this._wayPoint = null;
  }

  init() {
    throw new Error(`Abstract method not implemented: init`);
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._wayPoint = Object.assign(
      {},
             this._wayPoint,
              update
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    console.log({
      element: prevElement,
      parent
    });

    this.removeElement();

    this.init();
    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    prevElement = null;

    // this.restoreHandlers();
  }

  // restoreHandlers() {
  //   throw new Error(`Abstract method not implemented: resetHandlers`);
  // }

}
