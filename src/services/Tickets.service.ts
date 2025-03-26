import SecondaryDB from '../config/database.secondary';
import { ITicket } from '../types/ticket';

const db = SecondaryDB.getInstance();
const Tickets = db.getCollection('Tickets');

class TicketsService {
  constructor() {}
  async getTickets(page: number, pageSize: number): Promise<[ITicket[] | [], number]> {
    const tickets = (await Tickets.find({})
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .toArray()) as ITicket[] | [];

    const count = await Tickets.countDocuments();
    return [tickets, count];
  }
}

export default new TicketsService();
