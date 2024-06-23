import { Router } from 'express';

import {cartController} from '../applicationserver/controllers/carts.controller.js';

const cartRouter = Router();

cartRouter.get("/", cartController.getCarts);
cartRouter.get("/:cid", cartController.getCartById);
cartRouter.get("/:cid/purchase", cartController.confirmPurchase);
cartRouter.post('/:cid/products/:pid',cartController.addCart)

cartRouter.delete("/:cid", cartController.cleanCartById);
cartRouter.delete("/:cid/products/:pid", cartController.deleteProductFromCart);

 //cartRouter.put("/:cid", cartController.updateCart);
cartRouter.put("/:cid/products/:pid", cartController.updateCart);

export default cartRouter;
