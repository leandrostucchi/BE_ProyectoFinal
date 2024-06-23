import {ticketsService} from "../services/ticket.service.js"



const saveTicket =  async(req,res)=>{
    loggersUtil.logger.info('saveTicket');
    let {code,purchase_datetime,amount,purchaser} = req.body;
    
    if(!code || !purchase_datetime || !amount || !purchaser)
    {
        loggersUtil.logger.error('saveTicket Error:' + "Incomplete values");
         return res.status(400).send({status:"error",error:"Incomplete values"});
    }
    await ticketsService.create({
        code,purchase_datetime,amount,purchaser
    })
    res.send({status:"success",message:"Ticket added"})
}

export const TicketController  = {
    saveTicket,
}