import SmartView from "./smart";
import {render} from "../utils/render";
import {POSITION} from "../constans";
import FieldsView from "../view/fields-edit";
import OffersListView from "../view/offers-list";
import DestinationView from "../view/detail-destination";
import EventDetailView from "./events-detail";
import {generateDesc} from "../mock/waypoint";

const createEventEditHolderTemplate = () => `<form class="trip-events__item event  event--edit" action="#" method="post"></form>`;

export default class EventEdit extends SmartView {

  constructor(wayPoint, offersList) {
    super();
    this._wayPoint = wayPoint;
    this._offersList = offersList;

    this._editFieldsComponent = null;
    this._detailComponent = null;
    this._offersComponent = null;
    this._destinationComponent = null;

    this._typeToggleHandler = this._typeToggleHandler.bind(this);
    this._destinationToggleHandler = this._destinationToggleHandler.bind(this);
    this._clickToSaveHandler = this._clickToSaveHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  init() {
    this.getElement();

    this._editFieldsComponent = new FieldsView(this._wayPoint);
    this._detailComponent = new EventDetailView();
    this._offersComponent = new OffersListView(this._wayPoint.offers, this._offersList[this._wayPoint.type]);
    this._destinationComponent = new DestinationView(this._wayPoint);

    render(this, this._editFieldsComponent, POSITION.BEFOREEND);
    render(this, this._editFieldsComponent, POSITION.BEFOREEND);
    render(this, this._detailComponent, POSITION.BEFOREEND);

    render(this._detailComponent, this._offersComponent, POSITION.BEFOREEND);
    render(this._detailComponent, this._destinationComponent, POSITION.BEFOREEND);

    this._setInnerHandlers();
  }


  getTemplate() {
    return createEventEditHolderTemplate();
  }

  _typeToggleHandler(evt) {
    evt.preventDefault();

    const newType = evt.target.value;

    this.updateData({
      type: `${newType}`,
      offers: [],
    });
  }

  _destinationToggleHandler(evt) {
    evt.preventDefault();

    const newDestination = evt.target.value;

    this.updateData({
      city: newDestination,
      infoPoint: {
        description: generateDesc(),
        photo: `http://picsum.photos/248/152?r=${Math.random()}`,
      },
    });
  }

  _clickToSaveHandler(evt) {
    evt.preventDefault();
    this._callback.saveClick(this._wayPoint);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;

    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setClickToSaveHandler(callback) {
    this._callback.saveClick = callback;

    this.getElement().querySelector(`.event__save-btn`).addEventListener(`click`, this._clickToSaveHandler);
  }

  _setInnerHandlers() {
    this._editFieldsComponent.getElement()
      .querySelector(`.event__type-list`)
      .addEventListener(`change`, this._typeToggleHandler);

    this._editFieldsComponent.getElement()
      .querySelector(`#event-destination-1`)
      .addEventListener(`change`, this._destinationToggleHandler);

    this.setClickToSaveHandler(this._callback.saveClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
  }
}
