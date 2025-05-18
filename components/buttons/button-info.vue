<template>
    <button
        class="flex justify-center px-4 py-2 text-white rounded-md shadow-sm bg-info-500 hover:bg-info-600 dark:text-info-200">
        <slot></slot>
    </button>
</template>


<style scoped>
.btn-outline {
    @apply !bg-transparent hover:!bg-info-100 border border-info !text-info hover:!text-info-600
}
</style>