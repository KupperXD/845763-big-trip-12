
import DaysView from "../view/days-list";
import DayView from "../view/day";
import PlugView from "../view/plug";
import {POSITION} from "../constans";
import {render} from "../utils/render";
import EventPresenter from "../presenter/event";
import {updateItem} from "../utils/common";


export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._daysComponent = new DaysView();
    this._dayComponent = new DayView();
    this._plugComponent = new PlugView();

    this._eventPresenter = {};

    this._handlePointChange = this._handlePointChange.bind(this);
  }

  init(points) {

    this._wayPoints = points;

    render(this._tripContainer, this._daysComponent, POSITION.BEFOREEND);
    render(this._daysComponent, this._dayComponent, POSITION.BEFOREEND);

    this._renderTrip();
  }

  _renderWayPoint(wayPointConteiner, wayPoint) {
    const eventPresenter = new EventPresenter(wayPointConteiner, this._handlePointChange);

    eventPresenter.init(wayPoint);
    this._eventPresenter[wayPoint.id] = eventPresenter;
  }

  _renderWayPoints() {

    this._wayPoints.forEach((el) => {
      this._renderWayPoint(this._dayComponent, el);
    });
  }

  _renderPlug() {
    render(this._tripContainer, this._plugComponent, POSITION.BEFOREEND);
  }

  _renderTrip() {
    if (typeof this._wayPoints === `undefined` || this._wayPoints === null) {
      this._renderPlug();
      return;
    }
    this._renderWayPoints();
  }

  _handlePointChange(updatePoint) {
    this._wayPoints = updateItem(this._wayPoints, updatePoint);
    this._eventPresenter[updatePoint.id].init(updatePoint);
  }
}
