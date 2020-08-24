import TripInfoView from "./view/trip-info.js";
import EventEditView from "./view/event-edit";
import DaysView from "./view/days-list";
import DayView from "./view/day";
import DestinationView from "./view/detail-destination";
import LoaderView from "./view/loader";
import PlugView from "./view/plug";
import StatisticsView from "./view/statistics";
import EventDetailView from "./view/events-detail";
import FieldsView from "./view/fields-edit";
import OffersListView from "./view/offers-list";
import {renderElement} from "./utils/render";
import EventView from "./view/event-item";
import MenuControlsView from "./view/menu-controls.js";
import SortEventView from "./view/sort-event";
import FiltersView from "./view/trip-filters";
import {createWayPoint} from "./mock/waypoint";
import {WAY_POINT_COUNT, POSITION} from "./constans";

const renderWayPoint = (wayPointConteiner, wayPoint) => {
  const wayPointComponent = new EventView(wayPoint);
  const eventEditComponent = new EventEditView();
  const eventEditFieldsComponent = new FieldsView(wayPoint);
  const eventDetailComponent = new EventDetailView();
  const offersComponent = new OffersListView();
  const destinationTemplate = new DestinationView(wayPoint);

  renderElement(eventEditComponent.getElement(), eventEditFieldsComponent.getElement(), POSITION.BEFOREEND);
  renderElement(eventEditComponent.getElement(), eventEditFieldsComponent.getElement(), POSITION.BEFOREEND);
  renderElement(eventEditComponent.getElement(), eventDetailComponent.getElement(), POSITION.BEFOREEND);
  renderElement(eventEditComponent.getElement().querySelector(`.event__details`), offersComponent.getElement(), POSITION.BEFOREEND);
  renderElement(eventEditComponent.getElement().querySelector(`.event__details`), destinationTemplate.getElement(), POSITION.BEFOREEND);

  const replacePointToForm = () => {
    wayPointConteiner.replaceChild(eventEditComponent.getElement(), wayPointComponent.getElement());
  };

  const replaceFormToPoint = () => {
    wayPointConteiner.replaceChild(wayPointComponent.getElement(), eventEditComponent.getElement());
  };

  wayPointComponent.setEditClickHandler(replacePointToForm);

  eventEditFieldsComponent.setClickToSaveHandler(replaceFormToPoint);

  renderElement(wayPointConteiner, wayPointComponent.getElement(), POSITION.BEFOREEND);
};

const wayPoints = new Array(WAY_POINT_COUNT).fill().map(createWayPoint);

const bodyContainer = document.querySelector(`.page-body`);
const headerContainer = bodyContainer.querySelector(`.page-header`);
const tripMainContainer = headerContainer.querySelector(`.trip-main`);
const tripControlsContainer = tripMainContainer.querySelector(`.trip-controls`);
const pageMainContainer = bodyContainer.querySelector(`.page-main`);
const tripEventsContainer = pageMainContainer.querySelector(`.trip-events`);

renderElement(tripMainContainer, new TripInfoView(wayPoints).getElement(), POSITION.AFTERBEGIN);
renderElement(tripControlsContainer, new MenuControlsView().getElement(), POSITION.AFTERBEGIN);
renderElement(tripControlsContainer, new FiltersView().getElement(), POSITION.BEFOREEND);

renderElement(tripEventsContainer, new SortEventView().getElement(), POSITION.AFTERBEGIN);

const days = new DaysView();

renderElement(tripEventsContainer, days.getElement(), POSITION.BEFOREEND);

renderElement(days.getElement(), new DayView().getElement(), POSITION.BEFOREEND);

const dayHolder = days.getElement().querySelector(`.trip-days__item`);
const tripEventsList = dayHolder.querySelector(`.trip-events__list`);

wayPoints.forEach((el) => {
  renderWayPoint(tripEventsList, el);
});

renderElement(tripEventsContainer, new LoaderView().getElement(), POSITION.BEFOREEND);
renderElement(tripEventsContainer, new PlugView().getElement(), POSITION.BEFOREEND);
renderElement(tripEventsContainer, new StatisticsView().getElement(), POSITION.BEFOREEND);
