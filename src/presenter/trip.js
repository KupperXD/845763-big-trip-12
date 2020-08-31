import EventView from "../view/event-item";
import EventEditView from "../view/event-edit";
import EventDetailView from "../view/events-detail";
import FieldsView from "../view/fields-edit";
import OffersListView from "../view/offers-list";
import DaysView from "../view/days-list";
import DayView from "../view/day";
import PlugView from "../view/plug";
import {POSITION} from "../constans";
import {render, replace} from "../utils/render";
import DestinationView from "../view/detail-destination";
import EventPresenter from "../presenter/event";


export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._daysComponent = new DaysView();
    this._dayComponent = new DayView();
    this._plugComponent = new PlugView();

  }

  init(points) {

    this._wayPoints = points;

    render(this._tripContainer, this._daysComponent, POSITION.BEFOREEND);
    render(this._daysComponent, this._dayComponent, POSITION.BEFOREEND);

    this._renderTrip();
  }

  _renderWayPoint(wayPointConteiner, wayPoint) {
    const eventPresenter = new EventPresenter(wayPointConteiner);
    
    eventPresenter.init(wayPoint);
  }

  _renderWayPoints() {
    const eventHolder = this._dayComponent.getEventContainer();

    this._wayPoints.forEach((el) => {
      this._renderWayPoint(eventHolder, el);
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
}
