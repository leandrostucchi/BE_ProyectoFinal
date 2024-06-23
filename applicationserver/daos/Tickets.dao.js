import TicketModel from "../models/tickets/tickets.model.js";

export default class Users {
    
    get = (params) =>{
        return TicketModel.find(params);
    }

    getBy = (params) =>{
        return TicketModel.findOne(params);
    }

    save = (doc) =>{
        return TicketModel.create(doc);
    }

    update = (id,doc) =>{
        return TicketModel.findByIdAndUpdate(id,{$set:doc})
    }

    delete = (id) =>{
        return TicketModel.findByIdAndDelete(id);
    }
}