import SecondaryDB from '../config/database.secondary';
import { IOrder } from '../types/order';

const db = SecondaryDB.getInstance();
const Order = db.getCollection('Orders');

class OrderService {
  constructor() {}
  async getOrders(
    page: number,
    pageSize: number,
    searchText: string
  ): Promise<[IOrder[] | [], number]> {
    const match: any = {};

    if (searchText) {
      match['orderId'] = { $regex: searchText, $options: 'i' };
    }

    const [orders, count] = await Promise.all([
      Order.aggregate([
        {
          $match: match,
        },
        {
          $sort: {
            _id: -1,
          },
        },
        {
          $skip: (page - 1) * pageSize,
        },
        {
          $limit: pageSize,
        },
      ]).toArray() as Promise<IOrder[] | []>,
      Order.countDocuments(match),
    ]);

    return [orders, count];
  }
}

export default new OrderService();
