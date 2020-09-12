import EventView from "../view/event-item";
import EventEditView from "../view/event-edit";
import {render, replace, remove} from "../utils/render";
import {POSITION, MODE} from "../constans";

export default class Event {
  constructor(eventListContainer, changeData, offersList, changeMode) {
    this._eventListContainer = eventListContainer;
    this._offersList = offersList;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._wayPointComponent = null;
    this._editComponent = null;
    this._mode = MODE.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(wayPoint) {
    this._wayPoint = wayPoint;

    const prevWayPointComponent = this._wayPointComponent;
    const prevEditComponent = this._editComponent;

    this._wayPointComponent = new EventView(wayPoint);
    this._editComponent = new EventEditView(wayPoint, this._offersList);
    this._editComponent.init();

    this._wayPointComponent.setEditClickHandler(this._handleEditClick);
    this._editComponent.setClickToSaveHandler(this._handleFormSubmit);
    this._editComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevWayPointComponent === null || prevEditComponent === null) {
      render(this._eventListContainer.getEventContainer(), this._wayPointComponent, POSITION.BEFOREEND);
      return;
    }

    if (this._mode === MODE.DEFAULT) {
      replace(this._wayPointComponent, prevWayPointComponent);
    }

    if (this._mode === MODE.EDITING) {
      replace(this._editComponent, prevEditComponent);
    }

    remove(prevEditComponent);
    remove(prevWayPointComponent);
  }

  _replacePointToForm() {
    replace(this._editComponent, this._wayPointComponent);
    this._changeMode();
    this._mode = MODE.EDITING;
  }

  _replaceFormToPoint() {
    replace(this._wayPointComponent, this._editComponent);
    this._mode = MODE.DEFAULT;
  }

  _handleEditClick() {
    this._replacePointToForm();
  }

  _handleFormSubmit(wayPoint) {
    this._changeData(wayPoint);
    this._replaceFormToPoint();
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._wayPoint,
            {
              isFavorite: !this._wayPoint.isFavorite
            }
        )
    );
  }

  resetView() {
    if (this._mode === MODE.EDITING) {
      this._replaceFormToPoint();
    }
  }
}
