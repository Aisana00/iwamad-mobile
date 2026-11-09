export type CampusEvent = {
  id: number;
  title: string;
  date: string;
  place: string;
  seats: number;
};

export type Event = CampusEvent;

export const events: CampusEvent[] = [
  { id: 1, title: 'Excel Power Query workshop', date: '2026-10-28', place: 'Room 404', seats: 25 },
  { id: 2, title: 'Data dashboards meetup', date: '2026-11-04', place: 'KBTU Library', seats: 15 },
  { id: 3, title: 'IT Management career talk', date: '2026-11-11', place: 'Main Hall', seats: 40 },
  { id: 4, title: 'SQL for analysts', date: '2026-11-18', place: 'Room 212', seats: 3 },
];
