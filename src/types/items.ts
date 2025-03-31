import { BaseResponse } from './response';
import { ObjectId } from 'mongoose';

export interface IItem extends Document {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  discount?: {
    active: boolean;
    value: number;
  };
  active: string;
}

export interface GetItemsReposne extends BaseResponse {
  data: {
    items: IItem[] | [];
    count: number;
  };
}
