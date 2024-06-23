import Cart from "../daos/Carts.dao.js"
import CartsRepository from "../repository/CartsRepository.js";

export const cartsService = new CartsRepository(new Cart());