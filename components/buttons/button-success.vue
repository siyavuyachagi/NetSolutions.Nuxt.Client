<template>
    <button
        class="flex justify-center px-4 py-2 text-white rounded-md shadow-sm bg-success-500 hover:bg-success-600 dark:text-success-200">
        <slot></slot>
    </button>
</template>

<style scoped>
.btn-outline {
    @apply !bg-transparent hover:!bg-success-100 border border-success !text-success hover:!text-success-600
}
</style>