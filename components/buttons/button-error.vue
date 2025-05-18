<template>
    <button
        class="flex justify-center px-4 py-2 text-white rounded-md shadow-sm bg-error-500 hover:bg-error-600 dark:text-error-200">
        <slot></slot>
    </button>
</template>

<style scoped>
.btn-outline {
    @apply !bg-transparent hover:!bg-error-100 border border-error !text-error hover:!text-error-600
}
</style>