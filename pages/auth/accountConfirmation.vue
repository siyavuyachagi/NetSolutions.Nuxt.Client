<template>
    <div class="flex items-center justify-center px-4">
        <div class="w-full max-w-md">
            <div class="flex items-center justify-center px-4">
                <div class="w-full max-w-md">
                    <div class="bg-white p-8 rounded-lg shadow-md">
                        <div class="text-center mb-6">
                            <h1 class="text-2xl font-bold text-gray-800">Account Confirmation</h1>
                            <p class="text-gray-600 mt-2">Thank you for registering with us!</p>
                        </div>

                        <div class="bg-green-50 p-4 rounded-md mb-6">
                            <div class="flex">
                                <div class="flex-shrink-0">
                                    <!-- Checkmark icon -->
                                    <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div class="ml-3">
                                    <p class="text-sm font-medium text-green-800">
                                        Your account has been created successfully!
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="mb-6">
                            <p class="text-gray-700 mb-4">
                                We've sent a confirmation email to <span class="font-semibold">{{ route.query.email
                                }}</span>.
                                Please
                                check your inbox and follow the instructions to activate your
                                account.
                            </p>
                            <p class="text-gray-700">Didn't receive an email? Check your spam folder or click the button
                                below
                                to resend the confirmation email.</p>
                        </div>

                        <div class="space-y-4">
                            <button @click="resendConfirmationEmail"
                                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                :disabled="isSubmitting">
                                {{ isSubmitting ? 'Sending...' : 'Resend Confirmation Email' }}
                            </button>
                            <button @click="goToDashboard"
                                class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Continue to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import accountService from '~/services/accountService';
import toast from '~/utils/toasts';

definePageMeta({
    validate(route) {
        if (!(route.query.email) && route.query?.email !== null) {
            return false
        }
        return true;
    },
})


// Get email from route params or use stored value from previous form
const isSubmitting = ref(false)
const router = useRouter();
const route = useRoute();

const resendConfirmationEmail = async () => {
    isSubmitting.value = true;

    if (!route.query.email) return

    try {
        const apiRedirectUrl = `${window.location.origin}/auth/accountConfirmed?email=${route.query.email}`
        const result = await accountService.sendConfirmationEmailAsync(route.query.email as string, apiRedirectUrl)
        if (result.success) toast.success(result.message)
        else throw new Error(result.message);
    } catch (error) {
        console.error('Failed to resend confirmation email:', error)
        toast.error('Failed to resend confirmation email. Please try again.')
    } finally {
        isSubmitting.value = false
    }
}

const goToDashboard = () => {
    router.push('/dashboard')
}
</script>