<template>
    <div class="flex items-center justify-center px-4">
        <div class="w-full max-w-md">
            <FormsRegisterForm />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const emailError = ref('')
const passwordError = ref('')

const pageState = ref({
    loading: false,
    errors: [],
})


const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
}

const handleLogin = () => {
    // Reset previous errors
    emailError.value = ''
    passwordError.value = ''

    // Basic validation
    if (!email.value) {
        emailError.value = 'Email is required'
    } else if (!isValidEmail(email.value)) {
        emailError.value = 'Invalid email format'
    }

    if (!password.value) {
        passwordError.value = 'Password is required'
    } else if (password.value.length < 6) {
        passwordError.value = 'Password must be at least 6 characters'
    }

    // If no errors, proceed with login
    if (!emailError.value && !passwordError.value) {
        // Implement your login logic here
        console.log('Login attempted', { email: email.value })
    }
    useRouter().push('/dashboard');
}

const isValidEmail = (emailToValidate) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(emailToValidate)
}
</script>