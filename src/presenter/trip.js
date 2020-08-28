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
    const wayPointComponent = new EventView(wayPoint);
    const eventEditComponent = new EventEditView();
    const eventEditFieldsComponent = new FieldsView(wayPoint);
    const eventDetailComponent = new EventDetailView();
    const offersComponent = new OffersListView();
    const destinationTemplate = new DestinationView(wayPoint);

    render(eventEditComponent, eventEditFieldsComponent, POSITION.BEFOREEND);
    render(eventEditComponent, eventEditFieldsComponent, POSITION.BEFOREEND);
    render(eventEditComponent, eventDetailComponent, POSITION.BEFOREEND);

    const detailsHolder = eventEditComponent.getElement().querySelector(`.event__details`);

    render(detailsHolder, offersComponent, POSITION.BEFOREEND);
    render(detailsHolder, destinationTemplate, POSITION.BEFOREEND);

    const replacePointToForm = () => {
      replace(eventEditComponent, wayPointComponent);
    };

    const replaceFormToPoint = () => {
      replace(wayPointComponent, eventEditComponent);
    };

    wayPointComponent.setEditClickHandler(replacePointToForm);

    eventEditFieldsComponent.setClickToSaveHandler(replaceFormToPoint);

    render(wayPointConteiner, wayPointComponent, POSITION.BEFOREEND);
  }

  _renderWayPoints() {
    const eventHolder = this._dayComponent.getElement().querySelector(`.trip-events__list`);

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
