// import {render, remove} from "../utils/render";
// import {POSITION, UserAction, UpdateType} from "../constans";
// import {generateId} from "../mock/waypoint";
// import EventEditView from "../view/event-edit";
//
// export default class PointNew {
//   constructor(pointContainer, changeData, offersList) {
//     this._pointContainer = pointContainer;
//     this._changeData = changeData;
//     this._offersList = offersList;
//
//     this._editComponent = null;
//
//     this._handleFormSubmit = this._handleFormSubmit.bind(this);
//     this._handleDeleteClick = this._handleDeleteClick.bind(this);
//
//     render(this._pointContainer, this._editComponent, POSITION.AFTERBEGIN);
//   }
//
//   init() {
//     if (this._editComponent !== null) {
//       return;
//     }
//
//     this._editComponent = new EventEditView(null, this._offersList);
//     this._editComponent.init();
//
//     this._editComponent.setClickToSaveHandler(this._handleFormSubmit);
//     this._editComponent.setClickDeleteHandler(this._handleDeleteClick);
//   }
//
//   destroy() {
//     if (this._editComponent === null) {
//       return;
//     }
//
//     remove(this._editComponent);
//     this._editComponent = null;
//   }
//
//
//   _handleFormSubmit(wayPoint) {
//     this._changeData(
//       UserAction.UPDATE_POINT,
//       UpdateType.PATCH,
//       Object.assign({id:generateId()}, wayPoint);
//     );
//
//     this.destroy();
//   }
//
//   _handleDeleteClick() {
//     this.destroy();
//   }
// }
