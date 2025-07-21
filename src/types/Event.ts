export type TCategory = 'Work' | 'Personal' | 'Other';

export interface IEvent {
  _id?: string;
  title: string;
  date: string;
  time: string;
  notes?: string;
  category: TCategory;
  archived: boolean;
  isDeleted?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
