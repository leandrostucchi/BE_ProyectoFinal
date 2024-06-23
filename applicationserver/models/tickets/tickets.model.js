import uuid4 from "uuid4";
import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
const ticketCollection = 'Tickets';


const TicketSchema = new mongoose.Schema({
  code: {
    type: String,
    default: function () {
      return uuid4();
    },
  },
  purchase_datetime: {
    type: String,
    required: true,
  },
  amount: Number,
  purchaser: {
    type: String,
    required: true,
  },
});


TicketSchema.plugin(mongoosePaginate);
const TicketModel = mongoose.model(ticketCollection, TicketSchema);
export default  TicketModel;






