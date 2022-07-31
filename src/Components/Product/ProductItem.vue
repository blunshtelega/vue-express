<template>
    <div class="col">
        <!-- ProductCard -->
        <div class="card h-100">
            <img :src="(`${product.image}`)" class="card-img-top"/>
            <div class="card-body">
                <h5 class="card-title">{{ product.title }}</h5>
                <p class="card-text">{{ product.description }}</p>
                <p class="card-text"><strong>Цена: </strong>{{ product.price }} &#8381;</p>
            </div>
            <div class="card-footer">
                <common-button
                    @click="showModal"
                >
                    Изменить
                </common-button>
            </div>
        </div>
        <!-- Editform modal -->
        <custom-modal v-model:show="modalVisible">
            <edit-product-form
                :product="product"    
                :categories="categories"
                :show="modalVisible"
                @closeModal="closeModal"
            />
        </custom-modal>
    </div>
</template>

<script>
    import EditProductForm from '@/Components/Forms/EditProductForm.vue'
    export default {
        components: {
            EditProductForm
        },
        data() {
            return {
                modalVisible: false,
            }
        },
        props: {
            product: {
                type: Object,
                required: true
            },
            categories: {
                type: Array,
                required: true,
            }      
        },
        methods: {
            showModal( ) {
                this.modalVisible = true
            },
            closeModal(){
                this.modalVisible = false
            }
        },
    }
</script>

<style scoped>

</style>
