export interface Timeline {
  id: string;
  intervals: TimelineInterval[];
  createdAt: Date;
}

interface TimelineInterval {
  id: string;
  date: Date;
}
