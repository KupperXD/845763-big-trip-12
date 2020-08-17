import {createElement} from "../utils";

const generateOffersTemplate = (offers) => {

  return offers.map((offer) => {
    return `<div class="event__offer-selector">
             <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>
             <label class="event__offer-label" for="event-offer-comfort-1">
               <span class="event__offer-title">${offer.name}</span>
               &plus;
               &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
             </label>
           </div>`;

  }).join(``);
};

const createOffersListDetailTemplates = (offers) => {
  return offers !== null ? `<section class="event__section event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${generateOffersTemplate(offers)}
      </div>
    </section>` : ` `;
};

export default class OffersList {
  constructor(wayPoint = null, offers = null) {
    this._element = null;
    this._point = wayPoint;
    this._offerItems = offers;
  }

  getTemplate() {
    if (!this._point) {
      return createOffersListDetailTemplates(this._offerItems);
    } else {
      return createOffersListDetailTemplates(this._point.offers);
    }
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
