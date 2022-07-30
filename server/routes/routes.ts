import { Router } from 'express';
import categoryController from '../controllers/category.controller';
import productController from '../controllers/product.controller'

const api = Router()
    .use(categoryController)
    .use(productController)

export default Router().use('/api', api);   