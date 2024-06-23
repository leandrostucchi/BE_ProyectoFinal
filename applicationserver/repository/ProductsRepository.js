import GenericRepository from "./GenericRepository.js";
import ProductModel from "../models/products/products.model.js";

export default class ProductsRepository extends GenericRepository {
    constructor(dao){
        super(dao);
    }

    getProductsPaginate(funcion,seteo) {
        return ProductModel.paginate(funcion,seteo)
        
    }

}