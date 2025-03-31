import mongoose, { DeleteResult, InsertManyResult } from 'mongoose';
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
      ]).toArray() as Promise<IItem[] | []>,
      Item.countDocuments(match),
    ]);

    return [items, count];
  }
  async updateItems(updatedItems: IItem[]): Promise<mongoose.mongo.BulkWriteResult> {
    const bulkOps = updatedItems.map(item => {
      const updateFields: Partial<IItem> = {};

      if (item.name !== undefined) updateFields.name = item.name;
      if (item.price !== undefined) updateFields.price = Number(item.price);
      if (item.description !== undefined) updateFields.description = item.description;
      if (item.image !== undefined) updateFields.image = item.image;
      if (item.category !== undefined) updateFields.category = item.category;
      if (item.discount !== undefined) updateFields.discount = item.discount;

      return {
        updateOne: {
          filter: { _id: toObjectId(item._id) },
          update: { $set: updateFields },
        },
      };
    });

    return Item.bulkWrite(bulkOps);
  }
  async deleteItem(itemId: string): Promise<DeleteResult> {
    return Item.deleteOne({ _id: toObjectId(itemId) });
  }
  async addItem(item: Omit<IItem, '_id'>): Promise<mongoose.mongo.InsertOneResult<IItem>> {
    return Item.insertOne(item);
  }
}

export default new ItemsService();
