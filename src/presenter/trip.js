import DaysView from "../view/days-list";
import DayView from "../view/day";
import PlugView from "../view/plug";
import EventPresenter from "../presenter/event";
import {render, remove} from "../utils/render";
import {filter} from "../utils/filter";
import {POSITION, UserAction, UpdateType} from "../constans";


export default class Trip {
  constructor(tripContainer, pointsModel, filtersModel) {
    this._pointsModel = pointsModel;
    this._filtersModel = filtersModel;
    this._tripContainer = tripContainer;

    this._daysComponent = new DaysView();
    this._dayComponent = new DayView();
    this._plugComponent = new PlugView();
    this._offersList = null;
    this._eventPresenter = {};


    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._filtersModel.addObserver(this._handleModelEvent);
    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init(offersList) {

    if (this._offersList !== null) {
      this._renderTrip();
      return;
    }

    this._offersList = offersList;
    this._renderTrip();
  }

  _getPoints() {
    const filterType = this._filtersModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filtredPoints = filter[filterType](points);

    return filtredPoints;
  }

  _renderDays() {
    render(this._tripContainer, this._daysComponent, POSITION.BEFOREEND);
    render(this._daysComponent, this._dayComponent, POSITION.BEFOREEND);
  }

  _renderWayPoint(wayPointConteiner, wayPoint) {
    const eventPresenter = new EventPresenter(wayPointConteiner, this._handleViewAction, this._offersList, this._handleModeChange);

    eventPresenter.init(wayPoint);
    this._eventPresenter[wayPoint.id] = eventPresenter;
  }

  _renderWayPoints(points) {

    points.forEach((el) => {
      this._renderWayPoint(this._dayComponent, el);
    });
  }

  _renderPlug() {
    render(this._tripContainer, this._plugComponent, POSITION.BEFOREEND);
  }

  _renderTrip() {
    const points = this._getPoints();

    if (typeof points === `undefined` || points === null) {
      this._renderPlug();
      return;
    }
    this._renderDays();
    this._renderWayPoints(points);
  }

  _clearTrip() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};

    remove(this._daysComponent);
    remove(this._dayComponent);
    remove(this._plugComponent);
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.REMOVE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip();
        this._renderTrip();
        break;
    }
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }
}
