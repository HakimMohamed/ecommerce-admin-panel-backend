import { NextFunction, Request, Response } from 'express';
import ItemsService from '../services/Items.service';
import { GetItemsReposne } from '../types/items';

export async function getItems(
  req: Request<{}, {}, {}, { page?: string; pageSize?: string; searchText?: string }>,
  res: Response<GetItemsReposne>,
  next: NextFunction
): Promise<void> {
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : 10;
  const searchText = req.query.searchText as string;
  // const status = (req.query.status as unknown as string)?.split(',') || [];

  try {
    const [items, count] = await ItemsService.getItems(page, pageSize, searchText);

    res.status(200).send({
      message: `Items fetched successfully.`,
      data: { items, count },
      success: true,
    });
  } catch (error: any) {
    next(error);
  }
}
