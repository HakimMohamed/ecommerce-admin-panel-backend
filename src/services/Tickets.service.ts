import SecondaryDB from '../config/database.secondary';
import { ITicket } from '../types/ticket';
import { toObjectId } from '../utils/helpers';

const db = SecondaryDB.getInstance();
const Tickets = db.getCollection('Tickets');

class TicketsService {
  constructor() {}
  async getTickets(
    page: number,
    pageSize: number,
    searchText: string,
    status: string[]
  ): Promise<[ITicket[] | [], number]> {
    const match: any = {};

    if (searchText) {
      match['user.email'] = { $regex: searchText, $options: 'i' };
    }

    if (status && status.length) {
      match['status'] = { $in: status };
    }

    const [tickets, count] = await Promise.all([
      Tickets.aggregate([
        {
          $match: match,
        },
        {
          $skip: (page - 1) * pageSize,
        },
        {
          $limit: pageSize,
        },
      ]).toArray() as Promise<ITicket[] | []>,
      Tickets.countDocuments(match),
    ]);

    return [tickets, count];
  }
  async updateTicketStatus(ticketId: string, status: string): Promise<void> {
    await Tickets.updateOne({ _id: toObjectId(ticketId) }, { $set: { status } });
  }
}

export default new TicketsService();
