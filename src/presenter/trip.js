import {renderElement} from "../utils/render";
import EventView from "../view/event-item";
import EventEditView from "../view/event-edit";
import EventDetailView from "../view/events-detail";
import FieldsView from "../view/fields-edit";
import OffersListView from "../view/offers-list";


export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    init(wayPoints) {

      this._wayPoints = wayPoints.slice();

    }
  }
}
