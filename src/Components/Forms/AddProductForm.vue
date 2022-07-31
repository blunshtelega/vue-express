<template>
<form>
    <div class="mb-3" @submit.prevent enctype="multipart/form-data">
        <label for="product-title" class="form-label">Название товара</label>
        <input 
            type="text" 
            class="form-control" 
            id="product-title" 
            v-model="product.title"
        >
    </div>
    <div class="mb-3">
        <label for="product-description" class="form-label">Описание товара</label>
        <input 
            type="text" 
            class="form-control" 
            id="product-description"
            v-model="product.description"
        >
    </div>
    <div class="mb-3">
        <label for="product-price" class="form-label">Цена товара</label>
        <input 
            type="number" 
            class="form-control" 
            id="product-price"
            v-model="product.price"
        >
    </div>
    <div class="mb-3">
        <label for="product-price" class="form-label">Категория</label>
        <select id="inputState" class="form-select" v-model="product.category">
            <option selected disabled>Выберите категорию...</option>
            <option
                v-for="category in categories"
                :category="category"
                :key="category.id"
            >{{category.title}}</option>
        </select>
    </div>
    <div class="mb-3">
        <label for="product-image" class="form-label">Вставьте изображение</label>
        <input 
            class="form-control" 
            type="file" 
            id="product-image"
            @change="handleFileUpload( $event )"
        >
    </div>
    <button 
        type="submit" 
        class="btn btn-primary"
        @click="createProduct"
        :disabled="!formFullfiled"
    >
        Создать
    </button>
</form>

</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                product: {
                    title: "",
                    description: "",
                    price: "",
                    image: "",
                    category: ""
                },
            };
        },
        props: {
            categories: {
                type: Array,
                required: true,
            }          
        },
        computed: {
            formFullfiled () {    
                return (
                    this.product.title != '' &&
                    this.product.description != '' &&
                    this.product.price != '' &&
                    this.product.category != ''
                    // TODO - Добавить проверку изображения
                )
            }
        },
        methods: {
            handleFileUpload( event ){
                this.image = event.target.files[0];
            },
            async createProduct(){
                const formData = new FormData();
                formData.append('image', this.image)
                formData.append('title', this.product.title)
                formData.append('description', this.product.description)
                formData.append('price', this.product.price)
                formData.append('category', this.product.category)
                try{
                    const createdProduct = await axios.post('http://localhost:3000/api/products', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }

                    })
                    this.$emit("create", createdProduct.data.product);
                } catch (e) {
                    console.log(e);
                }
                this.product = {
                    title: "",
                    description: "",
                    price: "",
                    image: "",
                    category: ""
                };
            }
        },
    }
</script>

<style scoped>

</style>
