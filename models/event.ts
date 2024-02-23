export type IEvent = {
  id: string;
  dateString: string;
  date: Date;
  title: string;
  description: string;
}

export type IEventForm = {
  dateString: string;
  title: string;
  description: string;
}

export type TDate = {
  date: Date;
  disabled: boolean;
  events: IEvent[];
}
