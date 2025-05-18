<template>
    <div class="flex items-center justify-center px-4">
        <div class="w-full max-w-md">
            <div class="bg-white p-8 rounded-lg shadow-md">
                <div class="text-center mb-6">
                    <h1 class="text-2xl font-bold text-gray-800">Account Confirmed</h1>
                    <p class="text-gray-600 mt-2">Your account has been successfully activated!</p>
                </div>

                <div class="bg-green-50 p-4 rounded-md mb-6">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <!-- Checkmark icon -->
                            <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm font-medium text-green-800">
                                Email verification complete!
                            </p>
                        </div>
                    </div>
                </div>

                <div class="mb-6">
                    <p class="text-gray-700 mb-4">
                        Congratulations <span class="font-semibold">{{ route.query.email }}</span>, your account has
                        been verified
                        and is now fully active.
                    </p>
                    <p class="text-gray-700">
                        You can now login and edit your profile, access all features of our platform. Use the button below to log in and start
                        exploring.
                    </p>
                </div>

                <div class="space-y-4">
                    <button @click="router.replace('/auth/login')"
                        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Log In Now
                    </button>
                    <button @click="goToDashboard"
                        class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

definePageMeta({
    validate(route) {
        if (!(route.query.email))
            return false
        return true;
    },
})

const router = useRouter();
const route = useRoute();

const goToDashboard = () => {
    router.push('/dashboard');
}
</script>