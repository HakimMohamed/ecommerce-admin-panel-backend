import { NextFunction, Request, Response } from 'express';
import ItemsService from '../services/Items.service';
import { GetItemsReposne, IItem } from '../types/items';

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

export async function updateItems(
  req: Request<{}, {}, IItem[]>,
  res: Response,
  next: NextFunction
): Promise<void> {
  const updatedItems = req.body;

  try {
    await ItemsService.updateItems(updatedItems);

    res.status(200).send({
      message: `Items updated successfully.`,
      data: '',
      success: true,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function deleteItem(
  req: Request<{}, {}, {}, { itemId: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await ItemsService.deleteItem(req.query.itemId);

    res.status(200).send({
      message: `Items deleted successfully.`,
      data: '',
      success: true,
    });
  } catch (error: any) {
    next(error);
  }
}
