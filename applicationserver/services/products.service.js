import Product from "../daos/Products.dao.js";
import ProductsRepository from "../repository/ProductsRepository.js";


export const productsService = new ProductsRepository(new Product());
