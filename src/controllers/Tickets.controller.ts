import { NextFunction, Request, Response } from 'express';
import TicketsService from '../services/Tickets.service';
import { GetTicketsResponse } from '../types/ticket';

export async function getTickets(
  req: Request<{}, {}, {}, { page?: string; pageSize?: string; searchText?: string }>,
  res: Response<GetTicketsResponse>,
  next: NextFunction
): Promise<void> {
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : 10;
  const searchText = req.query.searchText as string;

  try {
    const [tickets, count] = await TicketsService.getTickets(page, pageSize, searchText);

    res.status(200).send({
      message: `User fetched successfully.`,
      data: { tickets, count },
      success: true,
    });
  } catch (error: any) {
    next(error);
  }
}
