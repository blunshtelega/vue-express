<template>
    <form @submit.prevent enctype="multipart/form-data">
        <h4>Редактирование поста</h4>
        <label for="product-description" class="form-label">Название товара</label>
        <input 
            type="text" 
            style="margin: 0 auto 5px"
            class="form-control" 
            id="product-title" 
            :title="product.title"
            v-model="updatedProduct.title"
        >
        <label for="product-description" class="form-label">Описание товара</label>
        <input 
            type="text" 
            style="margin: 0 auto 5px"
            class="form-control" 
            id="product-description"
            :description="product.description"
            v-model="updatedProduct.description"
        >
        <label for="product-description" class="form-label">Цена товара</label>
        <input 
            type="number" 
            style="margin: 0 auto 5px"
            class="form-control" 
            id="product-price"
            :price="product.price"
            v-model="updatedProduct.price"
        >
        <div class="mb-3">
            <label for="product-price" class="form-label">Категория</label>
            <select id="inputState" class="form-select" v-model="updatedProduct.category">
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
                :title="product.image"
                id="product-image"
                @change="handleFileUpload( $event )"
            >
        </div>
        <button 
            type="submit" 
            class="btn btn-primary"
            @click="updateProduct"
        >
            Обновить
        </button>
    </form>
</template>

<script>
    import axios from 'axios'
    export default {
        props: {
            product: {
                type: Object,
                required: true
            },
            categories: {
                type: Array,
                required: true,
            },
            show: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                updatedProduct: {
                    title: this.product.title,
                    description: this.product.description,
                    price: this.product.price,
                    category: this.product.category.title,
                    id: this.product.id
                },
            };
        },
        methods: {
            handleFileUpload( event ){
                this.image = event.target.files[0];
            },
            async updateProduct(){
                const formData = new FormData();
                formData.append('image', this.image)
                formData.append('title', this.updatedProduct.title)
                formData.append('description', this.updatedProduct.description)
                formData.append('price', this.updatedProduct.price)
                formData.append('category', this.updatedProduct.category)
                try{
                    const updatedProduct = await axios.put(`http://localhost:3000/api/products/${this.updatedProduct.id}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }

                    })
                    const newData = updatedProduct.data;
                    this.product.title = newData.title
                    this.product.description = newData.description
                    this.product.price = newData.price
                    this.product.image = newData.image

                } catch (e) {
                    console.log(e);
                } finally {
                    this.$emit("closeModal");
                }
            }
        },
    }
</script>

<style scoped>

</style>
