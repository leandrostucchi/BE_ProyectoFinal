import Ticket from "../daos/Tickets.dao.js"
import TicketsRepository from "../repository/TicketsRepository.js";

export const ticketsService = new TicketsRepository(new Ticket());