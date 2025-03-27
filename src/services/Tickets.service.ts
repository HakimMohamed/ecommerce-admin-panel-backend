import SecondaryDB from '../config/database.secondary';
import { ITicket } from '../types/ticket';

const db = SecondaryDB.getInstance();
const Tickets = db.getCollection('Tickets');

class TicketsService {
  constructor() {}
  async getTickets(
    page: number,
    pageSize: number,
    searchText: string
  ): Promise<[ITicket[] | [], number]> {
    const [tickets, count] = await Promise.all([
      Tickets.aggregate([
        {
          $match: {
            'user.email': { $regex: new RegExp(searchText, 'i') },
          },
        },
        {
          $skip: (page - 1) * pageSize,
        },
        {
          $limit: pageSize,
        },
      ])
        .limit(pageSize)
        .skip((page - 1) * pageSize)
        .toArray() as Promise<ITicket[] | []>,
      Tickets.countDocuments(),
    ]);

    return [tickets, count];
  }
}

export default new TicketsService();
