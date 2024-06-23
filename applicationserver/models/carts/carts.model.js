import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
const cartCollection = 'Carts';




const CartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
      },
      quantity: Number,
    },
  ],
});


CartSchema.plugin(mongoosePaginate);
const CartModel = mongoose.model(cartCollection, CartSchema);
export default  CartModel;
