
import GenericRepository from "./GenericRepository.js";
import CartModel from "../models/carts/carts.model.js";

export default class CartsRepository extends GenericRepository {
    constructor(dao){
        super(dao);
    }

    cleanCartById = (cartId) => {
        const cart = this.findById(cartId);
        if (!cart) {
          throw new NotFound(`No se encontró el carrito`);
        }
        this.updateOne({ _id: cartId }, { $set: { products: [] } });
      };
   

    getCartsPaginate(funcion,seteo) {
        return CartModel.paginate(funcion,seteo)
    }

}