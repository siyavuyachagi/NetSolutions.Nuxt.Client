<template>
    <button
        class="flex justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-md shadow-sm dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200">
        <slot></slot>
    </button>
</template>
<script setup lang="ts">

</script>
<style scoped>
.btn-outline{
    @apply !bg-transparent hover:!bg-gray-100 border border-gray-500 !text-gray-500 hover:!text-gray-600
}
</style>