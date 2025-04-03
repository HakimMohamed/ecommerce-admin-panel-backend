import { BaseResponse } from './response';
import { ObjectId } from 'mongoose';

export interface ICategory extends Document {
  _id: string;
  name: string;
  image: string;
  active: boolean;
  order: number;
}

export interface GetTicketsResponse extends BaseResponse {
  data: {
    tickets: ICategory[] | [];
    count: number;
  };
}
