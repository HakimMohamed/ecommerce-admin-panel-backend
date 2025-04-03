import { NextFunction, Request, Response } from 'express';
import CategoriesService from '../services/Categories.service';
import { ICategory } from '../types/category';

export async function getCategories(
  req: Request<
    {},
    {},
    {},
    { page?: string; pageSize?: string; searchText?: string; status?: string[] }
  >,
  res: Response,
  next: NextFunction
): Promise<void> {
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : 10;
  const searchText = req.query.searchText as string;
  try {
    const [categories, count] = await CategoriesService.getCategories(page, pageSize, searchText);

    res.status(200).send({
      message: `Categories fetched successfully.`,
      data: { categories, count },
      success: true,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function updateCategories(
  req: Request<{}, {}, ICategory[]>,
  res: Response,
  next: NextFunction
): Promise<void> {
  const updatedCategories = req.body;

  try {
    await CategoriesService.updateCategories(updatedCategories);

    res.status(200).send({
      message: `Items updated successfully.`,
      data: '',
      success: true,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function addCategory(
  req: Request<{}, {}, Omit<ICategory, '_id'>>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await CategoriesService.addCategory(req.body);

    res.status(200).send({
      message: `Category added successfully.`,
      data: '',
      success: true,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function deleteCategory(
  req: Request<{}, {}, {}, { categoryId: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await CategoriesService.deleteCategory(req.query.categoryId);

    res.status(200).send({
      message: `Items deleted successfully.`,
      data: '',
      success: true,
    });
  } catch (error: any) {
    next(error);
  }
}
