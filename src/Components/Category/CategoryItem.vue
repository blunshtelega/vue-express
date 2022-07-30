<template>
    <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
        <div class="fw-bold">{{ category.title }}</div>
        {{ category.description }}
        </div>
    </li>
</template>

<script>
export default {
    props: {
        category: {
            type: Object,
            required: true
        }
    },
}
</script>

<style scoped>

</style>
