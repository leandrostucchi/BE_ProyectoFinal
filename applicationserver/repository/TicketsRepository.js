
import GenericRepository from "./GenericRepository.js";
import TicketModel from "../models/tickets/tickets.model.js";

export default class TicketsRepository extends GenericRepository {
    constructor(dao){
        super(dao);
    }

    getProductsPaginate(funcion,seteo) {
        return TicketModel.paginate(funcion,seteo)
        
    }

}