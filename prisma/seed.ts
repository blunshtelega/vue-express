import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const defaultCategory1 = await prisma.category.upsert({
        where: { title: 'Скажите «горячо»' },
        update: {},
        create: {
            title: 'Скажите «горячо»',
            description: 'Горячие блюда',
        },
    })

    const defaultCategory2 = await prisma.category.upsert({
        where: { title: 'Песнь пламени' },
        update: {},
        create: {
            title: 'Песнь пламени',
            description: 'Горячие блюда',
        },
    })

    const defaultCategory3 = await prisma.category.upsert({
        where: { title: 'Маргинальные повадки' },
        update: {},
        create: {
            title: 'Маргинальные повадки',
            description: 'Скидка на алкоголь с 9 до 12 дня',
        },
    })

    const defaultCategory4 = await prisma.category.upsert({
        where: { title: 'Ну очень поздний завтра' },
        update: {},
        create: {
            title: 'Ну очень поздний завтра',
            description: 'Для сов',
        },
    })
    console.log({ defaultCategory1, defaultCategory2, defaultCategory3, defaultCategory4 })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })