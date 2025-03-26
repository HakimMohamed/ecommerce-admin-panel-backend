import { BaseResponse } from './response';
import { ObjectId } from 'mongoose';

export interface ITicket {
  _id: ObjectId;
  _user: ObjectId;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  closedAt?: Date;
}

export interface GetTicketsResponse extends BaseResponse {
  data: {
    tickets: ITicket[] | [];
    count: number;
  };
}
