import Observer from "../utils/observer";
import {FilterType} from "../constans";

export default class Filter extends Observer {
  constructor() {
    super();
    this._activityFilter = FilterType.EVERYTHING;
  }

  setFilter(updateType, filter) {
    this._activityFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activityFilter;
  }
}
