<template>
    <div class="col">
        <div class="card h-100">
        <img :src="(`${product.image}`)" class="card-img-top"/>
        <div class="card-body">
            <h5 class="card-title">{{ product.title }}</h5>
            <p class="card-text">{{ product.description }}</p>
            <p class="card-text"><strong>Цена: </strong>{{ product.price }} &#8381;</p>
        </div>
        <div class="card-footer">
            <common-button
                @click="editProduct(product)"
            >
                Изменить
            </common-button>
        </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            product: {
                type: Object,
                required: true
            }
        },
        methods: {
            editProduct(product) {

            }
        },
    }
</script>

<style scoped>

</style>
