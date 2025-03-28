import SecondaryDB from '../config/database.secondary';
import { IItem } from '../types/items';
import { ITicket } from '../types/ticket';

const db = SecondaryDB.getInstance();
const Items = db.getCollection('Items');

class ItemsService {
  constructor() {}
  async getItems(
    page: number,
    pageSize: number,
    searchText: string
  ): Promise<[IItem[] | [], number]> {
    const match: any = {};

    if (searchText) {
      match['name'] = { $regex: searchText, $options: 'i' };
    }

    const [items, count] = await Promise.all([
      Items.aggregate([
        {
          $match: match,
        },
        {
          $skip: (page - 1) * pageSize,
        },
        {
          $limit: pageSize,
        },
      ]).toArray() as Promise<IItem[] | []>,
      Items.countDocuments(match),
    ]);

    return [items, count];
  }
}

export default new ItemsService();
