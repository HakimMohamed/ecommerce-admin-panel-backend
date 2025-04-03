import mongoose, { DeleteResult } from 'mongoose';
import SecondaryDB from '../config/database.secondary';
import { ICategory } from '../types/category';
import { toObjectId } from '../utils/helpers';

const db = SecondaryDB.getInstance();
const Category = db.getCollection('Categories');

class CategoriesService {
  constructor() {}
  async getCategories(
    page: number,
    pageSize: number,
    searchText: string
  ): Promise<[ICategory[] | [], number]> {
    const match: any = {};

    if (searchText) {
      match['name'] = { $regex: searchText, $options: 'i' };
    }

    const [categories, count] = await Promise.all([
      Category.aggregate([
        {
          $match: match,
        },
        {
          $skip: (page - 1) * pageSize,
        },
        {
          $limit: pageSize,
        },
      ]).toArray() as Promise<ICategory[] | []>,
      Category.countDocuments(match),
    ]);

    return [categories, count];
  }
  async updateCategoryStatus(categoryId: string, status: string): Promise<void> {
    await Category.updateOne(
      { _id: toObjectId(categoryId) },
      {
        $set: {
          active: status === 'active' ? true : false,
        },
      }
    );
  }
  async updateCategories(updatedCategories: ICategory[]): Promise<mongoose.mongo.BulkWriteResult> {
    const bulkOps = updatedCategories.map(category => {
      const updateFields: Partial<ICategory> = {};

      if (category.name !== undefined) updateFields.name = category.name;
      if (category.image !== undefined) updateFields.image = category.image;
      if (category.active !== undefined) updateFields.active = category.active;
      if (category.order !== undefined) updateFields.order = category.order;

      return {
        updateOne: {
          filter: { _id: toObjectId(category._id) },
          update: { $set: updateFields },
        },
      };
    });

    return Category.bulkWrite(bulkOps);
  }
  async addCategory(category: Omit<ICategory, '_id'>): Promise<void> {
    await Category.insertOne(category);
  }
  async deleteCategory(categoryId: string): Promise<DeleteResult> {
    return Category.deleteOne({ _id: toObjectId(categoryId) });
  }
}

export default new CategoriesService();
