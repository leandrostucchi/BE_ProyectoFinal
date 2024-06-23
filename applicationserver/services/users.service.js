import Users from "../daos/Users.dao.js";
import UserRepository from "../repository/UserRepository.js";


export const usersService = new UserRepository(new Users());
