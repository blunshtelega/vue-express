import { IFileUpload } from './../models/filesUpload.model';
import { Product } from './../models/product.model';
import { IInputProduct } from '../models/inputProduct.model';
import { getCategoryByName } from './category.service';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllProducts = async () => {
    const products = await prisma.products.findMany({
        include: {category: true},
    })

    return products
};

//Вариант с деструктуризацией объекта
export const createProduct = async (productData: IInputProduct, image: IFileUpload) => {
    const { title, description, price, category } = productData;
    const imagePath = 'public/' + image.filename
    const existingCategory = await getCategoryByName(category as string)
    const createdProduct = await prisma.products.create({
        data: {
            title: title,
            description: description,
            price: Number(price),
            image: imagePath,
            category: {
                connect: {
                    id: existingCategory?.id
                }
            }
        }
    });

    return createdProduct
};

//Вариант без деструктуризации объекта
export const updateProduct = async (productData: Product, id: string) => {
    const existingCategory = await getCategoryByName(productData.category as string)
    const updatedProduct = await prisma.products.update({
        where: {
            id: Number(id),
        },
        data: {
            ...(productData.title ? { title: productData.title } : {}),
            ...(productData.description ? { description: productData.description } : {}),
            ...(productData.price ? { price: productData.price } : {}),
            ...(productData.image ? { image: productData.image } : {}),
            categoryId: existingCategory?.id,
            updatedAt: new Date(),
        }
    });

    return updatedProduct
};

export const deleteProduct = async (id: string) => {
    await prisma.products.delete({
        where: { id: Number(id) },
    });
};