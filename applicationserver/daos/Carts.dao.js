import CartModel from "../models/carts/carts.model.js";


export default class Carts {
    
    get = (params) =>{
        return CartModel.find(params);
    }

    getBy = (params) =>{
        return CartModel.findOne(params);
    }

    save = (doc) =>{
        return CartModel.create(doc);
    }

    update = (id,doc) =>{
        return CartModel.findByIdAndUpdate(id,{$set:doc})
    }

    delete = (id) =>{
        return CartModel.findByIdAndDelete(id);
    }
}