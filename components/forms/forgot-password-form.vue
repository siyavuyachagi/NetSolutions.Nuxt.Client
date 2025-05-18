<template>
    <Transition appear enter-from-class="opacity-0 translate-x-6"
        enter-active-class="transition-all duration-1000 ease-out">
        <form v-if="mounted" @submit.prevent="submitAsync"
            class="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 mt-8 hover:shadow-lg"
            :class="{ 'pointer-events-none opacity-50': isSubmitting }">

            <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
                Forgot password
            </h2>
            <div class="my-2">
                <p class="text-error">{{ errors?.join(', ') }}</p>
            </div>
            <div v-if="!route.query.sent" class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                    Email Address
                </label>
                <input v-model="email" type="email" id="email" required placeholder="Enter your email-address"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :class="{ 'border-red-500': errors?.length }">
            </div>
            <div v-else class="bg-green-50 p-4 rounded-md mb-6">
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
                            Reset password link sent successfully!
                        </p>
                    </div>
                </div>
            </div>
            <div class="flex items-center" :class="route.query.sent ? 'justify-end' : 'justify-between'">
                <button type="button"
                    class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                    @click="router.replace('/auth/login')">
                    Cancel
                </button>
                <button v-if="!route.query.sent" type="submit"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
                    {{ isSubmitting ? 'Loading...' : 'Send link' }}
                </button>
            </div>
        </form>
    </Transition>
</template>


<script setup lang="ts">
import accountService from '~/services/accountService';


const mounted = ref(false);
const isSubmitting = ref(false);
const email = ref<string>('');
const errors = ref<string[] | null>(null);
const router = useRouter();
const route = useRoute();


const submitAsync = async () => {
    isSubmitting.value = true;
    try {
        const apiRedirectUrl = `${window.location.origin}${'/auth/reset-password'}`;
        var result = await accountService.forgotPasswordAsync(email.value, apiRedirectUrl);
        if (!result.success) {
            errors.value = Array.isArray(result.message)
                ? result.message.filter((m): m is string => typeof m === "string")
                : result.message
                    ? [result.message]
                    : [];
        } else {
            router.replace({
                query: { ...route.query, sent: 'true' }
            });
        }
    } catch (error) {

    } finally {
        isSubmitting.value = false;
    }
}
onMounted(() => {
    mounted.value = true;
})
</script>