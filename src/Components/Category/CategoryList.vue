<template>
    <h3>Список категорий</h3>
    <ol class="list-group list-group-numbered">
        <category-item
            v-for="category in categories"
            :category="category"
            :key="category.id"            
        />
    </ol>
</template>

<script>
    import CategoryItem from '@/Components/Category/CategoryItem.vue'
    export default {
        components: {
            CategoryItem
        },
        props: {
            categories: {
                type: Array,
                required: true,
            }
        }
    }
</script>

<style scoped>

</style>
