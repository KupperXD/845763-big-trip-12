import EventView from "../view/event-item";
import EventEditView from "../view/event-edit";
import EventDetailView from "../view/events-detail";
import FieldsView from "../view/fields-edit";
import OffersListView from "../view/offers-list";
import DestinationView from "../view/detail-destination";
import {render, replace, remove} from "../utils/render";
import {POSITION} from "../constans";

export default class Event {
    constructor(eventListContainer) {
        this._eventListContainer = eventListContainer;

        this._wayPointComponent = null;
        this._editComponent = null;
        this._editFieldsComponent = null;
        this._detailComponent = null;
        this._offersComponent = null;
        this._destinationComponent = null;

        this._handleEditClick = this._handleEditClick.bind(this);
        this._handleFormSubmit = this._handleFormSubmit.bind(this);
        this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    }

    init(wayPoint) {
        this._wayPoint = wayPoint;

        const prevWayPointComponent = this._wayPointComponent;
        const prevEditComponent = this._editComponent;

        this._wayPointComponent = new EventView(wayPoint);
        this._editComponent = new EventEditView();
        this._editFieldsComponent = new FieldsView(wayPoint);
        this._detailComponent = new EventDetailView();
        this._offersComponent = new OffersListView();
        this._destinationComponent = new DestinationView(wayPoint);

        render(this._editComponent, this._editFieldsComponent, POSITION.BEFOREEND);
        render(this._editComponent, this._editFieldsComponent, POSITION.BEFOREEND);
        render(this._editComponent, this._detailComponent, POSITION.BEFOREEND);


        render(this._detailComponent, this._offersComponent, POSITION.BEFOREEND);
        render(this._detailComponent, this._destinationComponent, POSITION.BEFOREEND);

        this._wayPointComponent.setEditClickHandler(this._handleEditClick);

        this._editFieldsComponent.setClickToSaveHandler(this._handleFormSubmit);
        this._editFieldsComponent.setFavoriteClickHandler(this._handleFavoriteClick);

        if (prevWayPointComponent === null || prevEditComponent === null) {
          render(this._eventListContainer, this._wayPointComponent, POSITION.BEFOREEND);
          return;
        }

        if (this._eventListContainer.getElement().contains(prevWayPointComponent.getElement())) {
          replace(this._wayPointComponent, prevWayPointComponent);
        }

        if (this._eventListContainer.getElement().contains(prevEditComponent.getElement())) {
          replace(this._editComponent, prevEditComponent);
        }

        remove(prevEditComponent);
        remove(prevWayPointComponent);
    }

    _replacePointToForm() {
        replace(this._editComponent, this._wayPointComponent);
    }

    _replaceFormToPoint() {
        replace(this._wayPointComponent, this._editComponent);
    }

    _handleEditClick() {
        this._replacePointToForm();
    }

    _handleFormSubmit() {
        this._replaceFormToPoint();
    }

    _handleFavoriteClick() {
    }
}
