import AbstractView from "./abstract";

const createTripFilter = (filter, currentFilterType) => {
  const {type, name} = filter;

  return `<div class="trip-filters__filter">
            <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${type === currentFilterType ? `checked` : ``}>
            <label class="trip-filters__filter-label" for="filter-${type}">${name}</label>
          </div>`;
};

const createTripFiltres = (filters, currentFilterType) => {
  const filtersTemplate = filters
    .map((filter) => createTripFilter(filter, currentFilterType))
    .join(``);
  return `<form class="trip-filters" action="#" method="get">
                   ${filtersTemplate}
                  <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`;
};

export default class Filters extends AbstractView {
  constructor(filters, currentFilter) {
    super();

    this._filters = filters;
    this._currentFilter = currentFilter;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createTripFiltres(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChange(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }
}
