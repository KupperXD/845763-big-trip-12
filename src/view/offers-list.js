import AbstractView from "./abstract";

const generateOffersTemplate = (offers, pointOffers) => {

  return offers.map((offer, count) => {
    const isChecked = pointOffers.includes(offer);
    return `<div class="event__offer-selector">
             <input
                    class="event__offer-checkbox  visually-hidden"
                    id="event-offer-comfort-${count}"
                    type="checkbox"
                    name="event-offer-comfort"
                    ${isChecked ? `checked` : ``}>
             <label class="event__offer-label" for="event-offer-comfort-${count}">
               <span class="event__offer-title">${offer.name}</span>
               &plus;
               &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
             </label>
           </div>`;

  }).join(``);
};

const createOffersListDetailTemplates = (offers, pointOffers) => {
  return offers !== null ? `<section class="event__section event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${generateOffersTemplate(offers, pointOffers)}
      </div>
    </section>` : ` `;
};

export default class OffersList extends AbstractView {
  constructor(pointOffers = null, offers = null) {
    super();
    this._pointOffers = pointOffers;
    this._offerItems = offers;
  }

  getTemplate() {
    return createOffersListDetailTemplates(this._offerItems, this._pointOffers);
  }
}
