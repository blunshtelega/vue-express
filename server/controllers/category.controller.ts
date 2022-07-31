import { createCategory, deleteCategory, getCategory, updateCategory } from './../services/category.service';
import { NextFunction, Request, Response, Router } from 'express';
import { getAllCategories } from '../services/category.service';

const router = Router();

/**
 * List all categories
 * @route {GET} /categories
 * @returns List of all categories
 */

router.get('/categories', async (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods', 'GET,POST");
    try {
        const result = await getAllCategories();
        res.json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * Create category
 * @route {POST} /categories
 * @bodyparam title
 * @bodyparam description
 * @returns created category
 */

router.post('/categories', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await createCategory(req.body);
        res.json(category);
    } catch (error) {
        next(error);
    }
});

/**
 * Get one category
 * @route {GET} /categories/:id
 * @param id id of the category
 * @returns category
 */

router.get(
    '/categories/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const category = await getCategory(id);
            res.json(category);
        } catch (error) {
            next(error);
        }
    },
);

/**
 * Delete category
 * @route {DELETE} /categories/:id
 * @param id id of the category
 */

router.delete(
    '/categories/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            await deleteCategory(id);
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    },
);

/**
 * Update category
 * @route {PUT} /categories/:id
 * @param id id of the category
 * @bodyparam title | new title
 * @bodyparam description | new description
 * @returns updated category
 */

router.put(
    '/categories/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const category = await updateCategory(req.body, req.params.id);
            res.json(category);
        } catch (error) {   
            next(error);
        }
    },
);

export default router;