import TripInfoView from "./view/trip-info.js";
import {render} from "./utils/render";
import MenuControlsView from "./view/menu-controls.js";
import SortEventView from "./view/sort-event";
import TripPresenter from "./presenter/trip";
import Points from "./model/points";
import FilterModel from "./model/filter";
import FiltersPresenter from "./presenter/filters";
import {generateOffers} from "./mock/offersType";
import {createWayPoint} from "./mock/waypoint";
import {WAY_POINT_COUNT, POSITION} from "./constans";

const offersList = generateOffers();
const wayPoints = new Array(WAY_POINT_COUNT).fill().map(() => {
  return createWayPoint(offersList);
});

const pointsModel = new Points();
const filterModel = new FilterModel();

pointsModel.setPoint(wayPoints);

const bodyContainer = document.querySelector(`.page-body`);
const headerContainer = bodyContainer.querySelector(`.page-header`);
const tripMainContainer = headerContainer.querySelector(`.trip-main`);
const tripControlsContainer = tripMainContainer.querySelector(`.trip-controls`);
const pageMainContainer = bodyContainer.querySelector(`.page-main`);
const tripEventsContainer = pageMainContainer.querySelector(`.trip-events`);

render(tripMainContainer, new TripInfoView(wayPoints).getElement(), POSITION.AFTERBEGIN);
render(tripControlsContainer, new MenuControlsView().getElement(), POSITION.AFTERBEGIN);

render(tripEventsContainer, new SortEventView().getElement(), POSITION.AFTERBEGIN);

const filterPresenter = new FiltersPresenter(tripControlsContainer, filterModel, pointsModel);
const tripPresenter = new TripPresenter(tripEventsContainer, pointsModel, filterModel);

filterPresenter.init();
tripPresenter.init(offersList);


