import AbstractView from "./abstract";

const createPhoto = (photoSrc) => `<img class="event__photo" src="${photoSrc}" alt="Event photo">`;

const createDetailDestinationTemplates = (photo, desc) => {
  return `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${desc}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
            ${createPhoto(photo)}
        </div>
      </div>
    </section>
  `;
};

export default class Destination extends AbstractView {
  constructor(event) {
    super();
    this._photos = event.infoPoint.photo;
    this._description = event.infoPoint.description;
  }

  getTemplate() {
    return createDetailDestinationTemplates(this._photos, this._description);
  }
}
