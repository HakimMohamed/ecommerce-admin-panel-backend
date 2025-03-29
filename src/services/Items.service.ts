import mongoose, { DeleteResult } from 'mongoose';
import SecondaryDB from '../config/database.secondary';
import { IItem } from '../types/items';
import { toObjectId } from '../utils/helpers';

const db = SecondaryDB.getInstance();
const Item = db.getCollection('Items');

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
      Item.aggregate([
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
      Item.countDocuments(match),
    ]);

    return [items, count];
  }
  async updateItems(updatedItems: IItem[]): Promise<mongoose.mongo.BulkWriteResult> {
    const bulkOps = updatedItems.map(item => ({
      updateOne: {
        filter: { _id: toObjectId(item._id) },
        update: {
          $set: {
            ...item,
            _id: toObjectId(item._id),
            ...(item.price !== undefined && { price: Number(item.price) }),
          },
        },
      },
    }));

    return Item.bulkWrite(bulkOps);
  }
  async deleteItem(itemId: string): Promise<DeleteResult> {
    return Item.deleteOne({ _id: toObjectId(itemId) });
  }
}

export default new ItemsService();
