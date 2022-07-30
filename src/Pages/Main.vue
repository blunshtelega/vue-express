<template>
    <div class="container-fluid">
        <div class="custom-wrapper">
            <modal-button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Добавить новый продукт
            </modal-button>
        </div>
        <common-modal>
            <product-form
                @create="createProduct"
                :categories="categories"
            />
        </common-modal>
        <div class="custom-wrapper">
            <category-list
                :categories="categories"
            />    
        </div>
        <div class="custom-wrapper">
            <product-list
                :products="products"
            />
        </div>
    </div>

</template>

<script>
    import CategoryList from '@/Components/Category/CategoryList.vue'
    import ProductList from '@/Components/Product/ProductList.vue'
    import ProductForm from '@/Components/Forms/ProductForm.vue'
    import axios from 'axios'
    export default {
        components: {
            CategoryList, ProductList, ProductForm
        },
        data() {
            return {
                categories: [],
                products: [],
            }
        },
        methods: {
            createProduct(product) {
                this.products.push(product)
            },
            async fetchCategories() {
                this.isLoading = true;
                try{
                    const response = await axios.get('http://localhost:3000/api/categories')
                    this.categories = response.data;
                } catch (error){
                    console.log(error)
                } finally {
                    this.isLoading = false
                }
            },
            async fetchProducts() {
                try{
                    const response = await axios.get('http://localhost:3000/api/products')
                    this.products = response.data;
                } catch (error){
                    console.log(error)
                }
            }
        },
        mounted() {
            this.fetchCategories();
            this.fetchProducts();
        },
    }

</script>

<style scoped>
    .custom-wrapper{
        margin: 25px auto;
    }
</style>
