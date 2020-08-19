import {createElement} from "../utils";

const MonthMap = {
  1: `jan`,
  2: `feb`,
  3: `mar`,
  4: `apr`,
  5: `may`,
  6: `june`,
  7: `july`,
  8: `aug`,
  9: `sep`,
  10: `oct`,
  11: `nov`,
  12: `dec`
};

const createTripInfo = (points) => {
  const date = points.sort((a, b) => {
    return a.date.start.getTime() - b.date.start.getTime();
  });

  const routesValue = date.reduce((acc, route, index) => {
    if (index === 0) {
      acc.route = `${acc.route} ${route.city}`;
    } else {
      acc.route += `&mdash; ${route.city}`;
    }

    acc.totalPrice += route.amountPrice;

    return acc;
  }, {
    totalPrice: 0,
    route: ``,
  });

  let dates = ``;
  const lastIndex = date.length - 1;
  const firstDates = date[0].date.start;
  const finishDates = date[lastIndex].date.finish;
  const firstMonth = firstDates.getMonth() + 1;
  const firstDay = firstDates.getDate();
  const finishMonth = finishDates.getMonth() + 1;
  const finishDay = finishDates.getDate();

  if (firstMonth === finishMonth) {
    dates = `${MonthMap[`${firstMonth}`]} ${firstDay} &mdash; ${finishDay}`;
  } else {
    dates = `${MonthMap[`${firstMonth}`]} ${firstDay} &mdash; ${MonthMap[`${finishMonth}`]} ${finishDay}`;
  }


  return `<section class="trip-main__trip-info  trip-info">
                  <div class="trip-info__main">
                      <h1 class="trip-info__title">${routesValue.route}</h1>
                      <p class="trip-info__dates">${dates}</p>
                  </div>
                  <p class="trip-info__cost">
                      Total: &euro;&nbsp;<span class="trip-info__cost-value">${routesValue.totalPrice}</span>
                  </p>
              </section>`;
};

export default class TripInfo {
  constructor(wayPoints) {
    this._element = null;
    this._points = wayPoints;
  }

  getTemplate() {
    return createTripInfo(this._points);
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
