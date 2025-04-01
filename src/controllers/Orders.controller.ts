import { NextFunction, Request, Response } from 'express';
import OrderService from '../services/Order.service';
import { IOrder } from '../types/order';

export async function getOrders(
  req: Request<{}, {}, {}, { page?: string; pageSize?: string; searchText?: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : 10;
  const searchText = req.query.searchText as string;

  try {
    const [orders, count] = await OrderService.getOrders(page, pageSize, searchText);

    res.status(200).send({
      message: `Orders fetched successfully.`,
      data: { orders, count },
      success: true,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function updateOrderStatus(
  req: Request<{}, {}, { orderId: IOrder['status']; status: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { orderId, status } = req.body;
  if (
    status !== 'pending' &&
    status !== 'active' &&
    status !== 'delivered' &&
    status !== 'cancelled'
  ) {
    res.status(400).send({ message: 'Invalid status', success: false });
    return;
  }

  try {
    await OrderService.updateOrderStatus(orderId, status);

    res.status(200).send({
      message: `Order updated successfully.`,
      success: true,
    });
  } catch (error: any) {
    next(error);
  }
}
