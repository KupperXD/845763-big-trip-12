import {FilterType} from "../constans";
import {isFuture, isPast} from "./wayPoint";

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuture(point.date.start)),
  [FilterType.PAST]: (points) => points.filter((point) => isPast(point.date.finish)),
};

