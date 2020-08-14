import {createTripInfo} from "./view/trip-info.js";
import {createTripControlsMenu} from "./view/menu-controls.js";
import {createTripFiltres} from "./view/trip-filters";
import {createSortEventsTemplate} from "./view/sort-event";
import {createEventEditHolderTemplate} from "./view/event-edit";
import {createEventHeaderFieldsTemplate} from "./view/fields-edit";
import {createEventsDetailContainer} from "./view/events-detail";
import {createOffersListDetailTemplates} from "./view/offers-list";
import {createDetailDestinationTemplates} from "./view/detail-destination";
import {createEventsDaysHolder} from "./view/days-list";
import {createTripDayHolder} from "./view/day";
import {createTripEventItemTempalte} from "./view/event-item";
import {createLoaderTemplate} from "./view/loader";
import {createNoPointTemplate} from "./view/plug";
import {createStatisticsTemplate} from "./view/statistics";
import {createWayPoint} from "./mock/waypoint";
import {WAY_POINT_COUNT} from "./constans";

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

renderTemplate(tripMainContainer, createTripInfo(), `afterbegin`);
renderTemplate(tripControlsContainer, createTripControlsMenu(), `afterbegin`);
renderTemplate(tripControlsContainer, createTripFiltres(), `beforeend`);

renderTemplate(tripEventsContainer, createSortEventsTemplate(), `afterbegin`);
renderTemplate(tripEventsContainer, createEventEditHolderTemplate(), `beforeend`);

const eventsEditHolder = tripEventsContainer.querySelector(`.event`);

renderTemplate(eventsEditHolder, createEventHeaderFieldsTemplate(), `afterbegin`);
renderTemplate(eventsEditHolder, createEventsDetailContainer(), `beforeend`);

const eventsEditDetail = eventsEditHolder.querySelector(`.event__details`);

renderTemplate(eventsEditDetail, createOffersListDetailTemplates(), `beforeend`);
renderTemplate(eventsEditDetail, createDetailDestinationTemplates(), `beforeend`);

renderTemplate(tripEventsContainer, createEventsDaysHolder(), `beforeend`);

const daysHolder = tripEventsContainer.querySelector(`.trip-days`);

renderTemplate(daysHolder, createTripDayHolder(), `beforeend`);

const dayHolder = daysHolder.querySelector(`.trip-days__item`);
const tripEventsList = dayHolder.querySelector(`.trip-events__list`);

wayPoints.forEach((el) => {
  renderTemplate(tripEventsList, createTripEventItemTempalte(el), `beforeend`);
});

renderTemplate(tripEventsContainer, createLoaderTemplate(), `beforeend`);
renderTemplate(tripEventsContainer, createNoPointTemplate(), `beforeend`);
renderTemplate(tripEventsContainer, createStatisticsTemplate(), `beforeend`);
