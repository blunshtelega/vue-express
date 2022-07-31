<template>
    <div class="container" v-if="products.length > 0">
        <h3>Список продуктов</h3>
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <product-item 
                v-for="product in products"
                :product="product"
                :categories="categories"
                :key="product.id"
            />
        </div>
    </div>
    <h2 v-else>Список продуктов пуст</h2>
</template>

<script>
    import ProductItem from '@/Components/Product/ProductItem.vue'
    export default {
        components: {
            ProductItem
        },
        props: {
            products: {
                type: Array,
                required: true,
            },
            categories: {
                type: Array,
                required: true,
            }      
        }
    }
</script>

<style scoped>

</style>
