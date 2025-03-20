<template>
    <div class="min-h-screen flex flex-col bg-neutral-50">
        <!-- Header -->
        <DefaultHeader />
        <!-- Main Content -->
        <main class="flex-grow container mx-auto px-4 py-8">
            <slot></slot>
        </main>
        <!-- Footer -->
        <DefaultFooter />
    </div>
</template>

<script setup lang="ts">
import DefaultFooter from '~/components/footers/defaultFooter.vue';
import DefaultHeader from '~/components/headers/defaultHeader.vue';
</script>
