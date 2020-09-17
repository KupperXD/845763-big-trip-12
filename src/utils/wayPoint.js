export const getHours = (value) => Math.floor(value / 60).toString().padStart(2, `0`);
export const getMinutes = (value) => Math.floor(value % 60).toString().padStart(2, `0`);
export const getValidateDate = (value) => value.toString().padStart(2, `0`);
export const isFuture = (date) => date.getTime() > Date.now();
export const isPast = (date) => date.getTime() < Date.now();

