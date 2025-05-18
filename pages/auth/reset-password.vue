<template>
    <div class="flex items-center justify-center px-4">
        <div class="w-full max-w-md">
            <ResetPasswordForm />
        </div>
    </div>
</template>

<script setup lang="ts">
import ResetPasswordForm from '~/components/forms/reset-password-form.vue';
definePageMeta({
    validate(route) {
        return Boolean(route.query.userId && route.query.token);
    },
});
</script>