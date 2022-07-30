<template>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'modal-button'
    }
</script>

<style scoped>

</style>
