import type { TimelineInterval } from "./TimelineInterval";

export interface Timeline {
  id: string;
  intervals: TimelineInterval[]; // You may also rename this if needed
  createdAt: Date;
  updatedAt: Date;
}
