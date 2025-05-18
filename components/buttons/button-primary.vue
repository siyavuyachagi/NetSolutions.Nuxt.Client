<template>
    <button
        class="flex justify-center px-4 py-2 text-white rounded-md shadow-sm bg-primary-500 hover:bg-primary-600 dark:text-primary-200">
        <slot></slot>
    </button>
</template>

<style>
.btn-outline {
    @apply !bg-transparent hover:!bg-primary-100 border border-primary !text-primary hover:!text-primary-600
}
</style>