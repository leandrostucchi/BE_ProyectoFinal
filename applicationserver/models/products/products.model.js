import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
const productCollection = 'Products';


const ProductsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    code: {
        type: String,
        required: true
        //unique:true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    thumbnail:{
        type:String
    },
    id:{
        type: String
        //type: Number,
        //required: true
    },
    status:{
        type:Boolean
    }
});
ProductsSchema.plugin(mongoosePaginate);
const ProductModel =  mongoose.model(productCollection, ProductsSchema);
export default  ProductModel;

