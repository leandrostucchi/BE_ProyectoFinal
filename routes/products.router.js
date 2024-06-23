
import { Router } from 'express';
import { ProductController } from "../applicationserver/controllers/products.controller.js";

const productRouter = Router();

productRouter.get("/", ProductController.getProductsPaginate);

productRouter.get("/productsUpd/:pid",ProductController.getProductById);

productRouter.post("/productsUpd/:pid", ProductController.updateProduct);

//productRouter.get("/ProductoUpdate/:pid", ProductController.getProductoUpdate);

productRouter.get("/productsNew", ProductController.getProductoNew);

productRouter.post("/productsNew", ProductController.saveProduct);

//productRouter.post("/", verifyRole, ProductController.addProduct);

//productRouter.put("/:pid", ProductController.updateProduct);

//productRouter.delete("/:pid", verifyRole, ProductController.deleteProduct);
productRouter.delete("/:pid", ProductController.deleteProduct);

export default productRouter;