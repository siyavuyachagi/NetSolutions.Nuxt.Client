<template>
    <button
        class="flex justify-center px-4 py-2 text-white rounded-md shadow-sm bg-warning-500 hover:bg-warning-600 dark:text-warning-200">
        <slot></slot>
    </button>
</template>

<style scoped>
.btn-outline {
    @apply !bg-transparent hover:!bg-warning-100 border border-warning !text-warning hover:!text-warning-600
}
</style>