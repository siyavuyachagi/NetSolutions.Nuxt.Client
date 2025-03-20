<template>
    <form @submit.prevent="login" class="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 mt-8">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
            Create an account
        </h2>

        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Email Address
            </label>
            <input v-model="model.username.value" type="email" id="email" required placeholder="Enter your email"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                :class="{ 'border-red-500': model.username?.errors?.length }">
            <p v-if="model.username?.errors" class="text-red-500 text-xs italic mt-1">
                <!-- {{ model.username.errors[0] }} -->
            </p>
        </div>

        <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Password
            </label>
            <div class="relative">
                <input v-model="model.password.value" :type="showPassword ? 'text' : 'password'" id="password" required
                    placeholder="Enter your password"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :class="{ 'border-red-500': model.password.errors?.length }">
                <button type="button" @click="togglePasswordVisibility" class="absolute right-3 top-3 text-gray-600">
                    <Eye v-if="!showPassword" />
                    <EyeOff v-else />
                </button>
            </div>
            <p v-if="model.password?.errors" class="text-red-500 text-xs italic">
                <!-- {{ model.password.errors[0] }} -->
            </p>
        </div>
        <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Confirm Password
            </label>
            <div class="relative">
                <input v-model="model.password.value" :type="showPassword ? 'text' : 'password'" id="password" required
                    placeholder="Enter your password"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :class="{ 'border-red-500': model.password.errors?.length }">
                <button type="button" @click="togglePasswordVisibility" class="absolute right-3 top-3 text-gray-600">
                    <Eye v-if="!showPassword" />
                    <EyeOff v-else />
                </button>
            </div>
            <p v-if="model.password?.errors" class="text-red-500 text-xs italic">
                <!-- {{ model.password.errors[0] }} -->
            </p>
        </div>

        <div class="flex items-center justify-between">
            <button type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
                Sign Up
            </button>
            <!-- 
            <a href="#" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                Forgot Password?
            </a> -->
        </div>

        <div class="mt-4 text-center">
            <p class="text-gray-600 text-sm">
                Already have an account?
                <nuxt-link to="login" class="text-blue-500 hover:text-blue-800 font-bold">
                    Login
                </nuxt-link>
            </p>
        </div>

        <div class="mt-6 border-t pt-4">
            <p class="text-center text-gray-600">Sign up with</p>
            <div class="flex justify-center space-x-4 mt-2">
                <button type="button"
                    class="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" class="mr-2">
                        <path fill="#FFC107"
                            d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                        <path fill="#FF3D00"
                            d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
                        <path fill="#4CAF50"
                            d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                        <path fill="#1976D2"
                            d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
                    </svg>
                    Google
                </button>

                <button type="button"
                    class="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="blue"
                        class="mr-2">
                        <path
                            d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z" />
                    </svg>
                    Facebook
                </button>
            </div>
        </div>
    </form>
</template>


<script setup lang="ts">
import { EyeOff, Eye } from 'lucide-vue-next';
import VueSanity, { required, type ModelConfig } from 'vuesanity';
import authService from '~/services/authService';


const model = reactive<ModelConfig>({
    username: {
        validations: [required()]
    },
    password: {
        validations: [required()]
    },
    rememberMe: {
        type: Boolean,
        value: false
    }
});
const showPassword = ref(false)

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
}
async function login() {
    try {
        var state = new VueSanity(model);
        if (!state.isValid) return;
        await authService.loginAsync(state.normalizedModel, '/dashboard');
    } catch (error) {
        // Handle error
    }
}
</script>