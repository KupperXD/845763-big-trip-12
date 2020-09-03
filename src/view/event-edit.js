import SmartView from "./smart";
import {render} from "../utils/render";
import {POSITION} from "../constans";
import FieldsView from "../view/fields-edit";
import OffersListView from "../view/offers-list";
import DestinationView from "../view/detail-destination";
import EventDetailView from "./events-detail";

const createEventEditHolderTemplate = () => `<form class="trip-events__item event  event--edit" action="#" method="post"></form>`;

export default class EventEdit extends SmartView {

  constructor(wayPoint) {
    super();
    this._wayPoint = wayPoint;
    this._editFieldsComponent = null;
    this._detailComponent = null;
    this._offersComponent = null;
    this._destinationComponent = null;
  }

  init() {
    this.getElement();

    this._editFieldsComponent = new FieldsView(this._wayPoint);
    this._detailComponent = new EventDetailView();
    this._offersComponent = new OffersListView(this._wayPoint);
    this._destinationComponent = new DestinationView(this._wayPoint);

    render(this, this._editFieldsComponent, POSITION.BEFOREEND);
    render(this, this._editFieldsComponent, POSITION.BEFOREEND);
    render(this, this._detailComponent, POSITION.BEFOREEND);

    render(this._detailComponent, this._offersComponent, POSITION.BEFOREEND);
    render(this._detailComponent, this._destinationComponent, POSITION.BEFOREEND);
  }

  getFields() {
    return this._editFieldsComponent;
  }

  getTemplate() {
    return createEventEditHolderTemplate();
  }

  _setInnerHandlers() {

  }
}
