import { DestinationCallback, FileNameCallback } from './../models/multer.model';
import { createProduct, deleteProduct, getAllProducts, updateProduct } from './../services/product.service';
import express, { NextFunction, Request, Response, Router } from 'express';
import multer, { FileFilterCallback } from 'multer';

const router = Router();
const app = express()
const path = require("path");
app.use("/public", express.static("public"));

export const fileStorage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: DestinationCallback): void {
        cb(null, './public');
    },
    filename: function (req: Request, file: Express.Multer.File, cb: FileNameCallback): void {
        const imageName = Date.now() + path.extname(file.originalname);
        cb(null, imageName);
    }
});

export const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png "]
    if(!allowedTypes.includes(file.mimetype)) {
        cb(null, false)
    } cb(null, true)
};

export const upload = multer({ 
    storage: fileStorage, 
    fileFilter: fileFilter,
    limits: {
        fileSize: 10485760
    }
});

/**
 * List all products
 * @route {GET} /products
 * @returns List of all products
 */ 

router.get('/products', async (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods', 'GET,POST");
    try {
        const products = await getAllProducts();
        res.json(products);
    } catch (error) {
        next(error);
    }
});

/**
 * Create product
 * @route {POST} /products
 * @bodyparam title
 * @bodyparam description
 * @bodyparam price
 * @bodyparam image
 * @bodyparam category
 * @returns created product
 */


router.post('/products', upload.single('image'), async (req: any, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods', 'GET,POST");
    try {
        const product = await createProduct(req.body, req.file);
        res.json({ product });
        return product;
    } catch (error) {
        next(error);
    }
});

/**
 * Update product
 * @route {PUT} /products/:id
 * @param id id of the product
 * @bodyparam title | new title
 * @bodyparam description | new description
 * @bodyparam price | new price
 * @bodyparam image | new image
 * @bodyparam category | new category
 * @returns updated article
 */

router.put(
    '/products/:id',
    upload.single('image'),
    async (req: any, res: Response, next: NextFunction) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods', 'GET,POST,PUT");
        try {
            const product = await updateProduct(req.body, req.params.id, req.file);
            res.json(product);
            return product
        } catch (error) {   
            next(error);
        }
    },
);

/**
 * Delete product
 * @route {DELETE} /products/:id
 * @param id id of the product
 */

router.delete(
    '/products/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            await deleteProduct(id);
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    },
);

export default router;