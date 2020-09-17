import FiltersView from "../view/trip-filters";
import {render, remove, replace} from "../utils/render";
import {POSITION, UpdateType} from "../constans";

export default class Filters {
  constructor(eventControlsContainer, filterModel, pointsModel) {
    this._eventControlsContainer = eventControlsContainer;
    this._filterModel = filterModel;
    this._pointsModel = pointsModel;
    this._filters = null;
    this._currentFilter = null;

    this._filtersComponent = null;

    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const filters = this._getFilters();
    const prevFilterComponent = this._filtersComponent;

    this._filtersComponent = new FiltersView(filters, this._currentFilter);
    this._filtersComponent.setFilterTypeChange(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._eventControlsContainer, this._filtersComponent, POSITION.BEFOREEND);
      return;
    }

    replace(this._filtersComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  static filtredPoints() {

  }

  _getFilters() {
    return [
      {
        type: `everything`,
        name: `EVERYTHING`,
      },
      {
        type: `future`,
        name: `FUTURE`,
      },
      {
        type: `past`,
        name: `PAST`,
      },
    ];
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }
}
