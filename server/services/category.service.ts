import { Product } from './../models/product.model';
import { ICategory } from './../models/category.model';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllCategories = async () => {
    const categories = await prisma.category.findMany({
        include: {productsList: true}
    })

    return categories
};

export const createCategory = async (categoryData: ICategory) => {
    const { title, description } = categoryData;
    const createdCategory = await prisma.category.create({
        data: {
            title: title,
            description: description
        }
    });

    return createdCategory
};

export const getCategory = async (id: string) => {
    console.log('Id Category', id, typeof id)
    const category = await prisma.category.findUnique({
        where: { id: Number(id) },
    })
    return category
};

export const getCategoryByName = async (title: string) => {
    const category = await prisma.category.findUnique({
        where: {
            title : title,
        },
        select: {
            id: true,
        },
    })
    return category
};

export const deleteCategory = async (id: string) => {
    await prisma.category.delete({
        where: { id: Number(id) },
    });
};

export const updateCategory = async (categoryData: ICategory, id: string) => {
    const updatedCategory = await prisma.category.update({
        where: {
            id: Number(id),
        },
        data: {
            ...(categoryData.title ? { title: categoryData.title } : {}),
            ...(categoryData.description ? { description: categoryData.description } : {}),
            updatedAt: new Date(),
        },
    });

    return updatedCategory
};


