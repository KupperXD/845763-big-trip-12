import {createTripInfo} from "./view/trip-info.js";
import {createTripControlsMenu} from "./view/menu-controls.js";
import {createTripFiltres} from "./view/trip-filters";
import {createSortEventsTemplate} from "./view/sort-event";
import {createOffersListDetailTemplates} from "./view/offers-list";
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
import {renderElement} from "./utils";
import EventView from "./view/event-item";
import MenuControlsView from "./view/menu-controls.js";
import SortEventView from "./view/sort-event";
import {createWayPoint} from "./mock/waypoint";
import {WAY_POINT_COUNT, POSITION} from "./constans";

const wayPoints = new Array(WAY_POINT_COUNT).fill().map(createWayPoint);

const bodyContainer = document.querySelector(`.page-body`);
const headerContainer = bodyContainer.querySelector(`.page-header`);
const tripMainContainer = headerContainer.querySelector(`.trip-main`);
const tripControlsContainer = tripMainContainer.querySelector(`.trip-controls`);
const pageMainContainer = bodyContainer.querySelector(`.page-main`);
const tripEventsContainer = pageMainContainer.querySelector(`.trip-events`);


const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

renderElement(tripMainContainer, new TripInfoView(wayPoints).getElement(), POSITION.AFTERBEGIN);
renderElement(tripControlsContainer, new MenuControlsView().getElement(), POSITION.AFTERBEGIN);
renderTemplate(tripControlsContainer, createTripFiltres(), `beforeend`);

renderElement(tripEventsContainer, new SortEventView().getElement(), POSITION.AFTERBEGIN);

const eventEdit = new EventEditView();
renderElement(tripEventsContainer, eventEdit.getElement(), POSITION.BEFOREEND);

renderElement(eventEdit.getElement(), new FieldsView().getElement(), POSITION.AFTERBEGIN);

const eventDetail = new EventDetailView();
renderElement(eventEdit.getElement(), eventDetail.getElement(), POSITION.BEFOREEND);

const eventsEditDetail = eventEdit.getElement().querySelector(`.event__details`);

renderElement(eventsEditDetail, new OffersListView().getElement(), POSITION.BEFOREEND);
renderElement(eventDetail.getElement(), new DestinationView(wayPoints[0]).getElement(), POSITION.BEFOREEND);


const days = new DaysView();

renderElement(tripEventsContainer, days.getElement(), POSITION.BEFOREEND);

renderElement(days.getElement(), new DayView().getElement(), POSITION.BEFOREEND);

const dayHolder = days.getElement().querySelector(`.trip-days__item`);
const tripEventsList = dayHolder.querySelector(`.trip-events__list`);

wayPoints.forEach((el) => {
  renderElement(tripEventsList, new EventView(el).getElement(), POSITION.BEFOREEND);
});

renderElement(tripEventsContainer, new LoaderView().getElement(), POSITION.BEFOREEND);
renderElement(tripEventsContainer, new PlugView().getElement(), POSITION.BEFOREEND);
renderElement(tripEventsContainer, new StatisticsView().getElement(), POSITION.BEFOREEND);
