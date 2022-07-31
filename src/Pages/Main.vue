<template>
    <div class="container-fluid">
        <!-- Boostrap button for modal view + Bootstrap modal + AddProductForm -->
        <div class="custom-wrapper">
            <modal-button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Добавить новый продукт
            </modal-button>
        </div>
        <bootstrap-modal>
            <add-product-form
                @create="createProduct"
                :categories="categories"
            />
        </bootstrap-modal>
        <!-- Categories list -->
        <div class="custom-wrapper">
            <category-list
                :categories="categories"
            />    
        </div>
        <!-- Products list -->        
        <div class="custom-wrapper">
            <product-list
                :products="products"
                :categories="categories"
            />
        </div>
    </div>
</template>

<script>
    import CategoryList from '@/Components/Category/CategoryList.vue'
    import ProductList from '@/Components/Product/ProductList.vue'
    import AddProductForm from '@/Components/Forms/AddProductForm.vue'
    import axios from 'axios'
    export default {
        components: {
            CategoryList, ProductList, AddProductForm
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
                try{
                    const response = await axios.get('http://localhost:3000/api/categories')
                    this.categories = response.data;
                } catch (error){
                    console.log(error)
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
