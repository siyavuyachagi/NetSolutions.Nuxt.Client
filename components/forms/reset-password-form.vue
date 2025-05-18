<template>
    <Transition appear enter-from-class="opacity-0 translate-x-6"
        enter-active-class="transition-all duration-1000 ease-out">
        <form v-if="mounted" @submit.prevent="submitAsync"
            class="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 mt-8 hover:shadow-lg"
            :class="{ 'pointer-events-none opacity-50': isSubmitting }">
            <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
                Login to Your Account
            </h2>
            <div v-if="errors.length" class="my-2">
                <p class="text-error">{{ errors?.join(', ') }}</p>
            </div>

            <div class="mb-2">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    New password
                </label>
                <div class="relative">
                    <input v-model="model.newPassword.value" :type="showPassword ? 'text' : 'password'" id="password"
                        required placeholder="Enter your password"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        :class="{
                            'border-red-500': model.newPassword.errors?.length,
                            'password-field': !showPassword
                        }">
                    <button tabindex="-1" type="button" @click="togglePasswordVisibility"
                        class="absolute right-3 top-3 text-gray-600">
                        <Eye v-if="!showPassword" />
                        <EyeClosed v-else />
                    </button>
                </div>
                <p v-if="model.newPassword?.errors?.length" class="text-red-500 text-xs italic">
                    {{ model.newPassword.errors[0] }}
                </p>
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="confirm-password">
                    Confirm password
                </label>
                <div class="relative">
                    <input v-model="model.newPasswordConfirmation.value" :type="showPassword ? 'text' : 'password'"
                        id="confirm-password" required placeholder="Confirm your password"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        :class="{
                            'border-red-500': model.newPasswordConfirmation.errors?.length,
                            'password-field': !showPassword
                        }">
                </div>
                <p v-if="model.newPasswordConfirmation?.errors" class="text-red-500 text-xs italic">
                    {{ model.newPasswordConfirmation.errors[0] }}
                </p>
            </div>

            <div class="flex items-center" :class="route.query.sent ? 'justify-end' : 'justify-between'">
                <button type="button"
                    class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                    @click="router.replace('/auth/login')">
                    Cancel
                </button>
                <button v-if="!route.query.sent" type="submit"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
                    {{ isSubmitting ? 'Loading...' : 'Update' }}
                </button>
            </div>
        </form>
    </Transition>
</template>


<script setup lang="ts">
import { Eye, EyeClosed } from 'lucide-vue-next';
import VueSanity, { required, sameAs, type ModelConfig } from 'vuesanity';
import accountService from '~/services/accountService';
import toast from '~/utils/toasts';



const mounted = ref(false);
const route = useRoute();
const router = useRouter();
const isSubmitting = ref(false);
const errors = ref<string[]>([]);
const showPassword = ref(false);

const model: ModelConfig = reactive({
    userId: { value: route.query.userId },
    token: { value: route.query.token },
    newPassword: {
        validations: [required()],
    },
    newPasswordConfirmation: {
        validations: [sameAs(() => model.newPassword.value)]
    }
});


const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
}
const submitAsync = async () => {
    isSubmitting.value = true;
    try {
        console.log(model)
        const state = new VueSanity(model);
        console.log(state)
        var result = await accountService.resetPasswordAsync(state.formData);
        if (!result.success) {
            errors.value = Array.isArray(result.message)
                ? result.message.filter((m): m is string => typeof m === "string")
                : result.message
                    ? [result.message]
                    : [];
        } else {
            toast.success(result.message);
            router.replace('login')
        }
    } catch (error) {
        console.error(error)
    } finally {
        isSubmitting.value = false;
    }
}

onMounted(() => {
    mounted.value = true;
})
</script>