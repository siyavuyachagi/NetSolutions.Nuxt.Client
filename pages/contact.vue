<!-- ContactUs.vue -->
<template>
    <div class="contact-page">
        <!-- Header Section -->
        <section class="py-16 bg-gradient-to-r from-purple-50 to-purple-100">
            <div class="container mx-auto px-4">
                <h1 class="text-4xl font-bold text-purple-900">Contact Us</h1>
                <p class="mt-4 text-xl max-w-2xl text-purple-800">
                    We'd love to hear from you. Get in touch with our team for any
                    inquiries or feedback.
                </p>
            </div>
        </section>

        <!-- Main Content Section -->
        <section id="contact" v-if="!pageLoading" class="container mx-auto px-4 py-16">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <!-- Contact Information -->
                <Transition appear enter-from-class="opacity-0 -translate-x-6"
                    enter-active-class="transition-all duration-1000 ease-out">
                    <div class="contact-info">
                        <h2 class="text-2xl font-semibold mb-6">Our Contact Information</h2>
                        <div class="space-y-8">
                            <!-- Address -->
                            <div class="flex items-start">
                                <div class="mr-4 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-500" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="font-medium text-lg">Address</h3>
                                    <p class="text-gray-600 mt-1">123 Business Street</p>
                                    <p class="text-gray-600">Bizana, Eastern Cape, 4800</p>
                                    <p class="text-gray-600">South Africa</p>
                                </div>
                            </div>

                            <!-- Email -->
                            <div class="flex items-start">
                                <div class="mr-4 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-500" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="font-medium text-lg">Email</h3>
                                    <p class="text-gray-600 mt-1">info@yourcompany.com</p>
                                    <p class="text-gray-600">support@yourcompany.com</p>
                                </div>
                            </div>

                            <!-- Phone -->
                            <div class="flex items-start">
                                <div class="mr-4 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-500" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="font-medium text-lg">Phone</h3>
                                    <p class="text-gray-600 mt-1">
                                        <a href="tel:+0639615361">+27 63 961 5361</a>
                                    </p>
                                    <p class="text-gray-600">Mon-Fri: 9am - 5pm</p>
                                </div>
                            </div>

                            <!-- Social Media -->
                            <div>
                                <h3 class="font-medium text-lg mb-3">Connect With Us</h3>
                                <div class="flex space-x-4">
                                    <a href="#" class="text-blue-600 hover:text-blue-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                        </svg>
                                    </a>
                                    <a href="#" class="text-blue-600 hover:text-blue-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                        </svg>
                                    </a>
                                    <a href="#" class="text-blue-600 hover:text-blue-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </a>
                                    <a href="#" class="text-blue-600 hover:text-blue-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>

                <ContactUsForm v-if="!formSubmitted" @submitted="contactUsFormSubmit" />

                <Transition v-else appear enter-from-class="opacity-0 translate-x-6"
                    enter-active-class="transition-all duration-1000 ease-out">
                    <div class="bg-white rounded-lg shadow-md">
                        <iframe class="w-full h-full"
                            :src="`https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=Bizana,South+Africa&zoom=15`"
                            allowfullscreen loading="lazy" title="Google Map">
                        </iframe>
                    </div>
                </Transition>

            </div>
        </section>

        <hr class="my-8 border-t border-gray-200" />

        <!-- Map Section -->
        <section v-if="!pageLoading && !formSubmitted" class="my-16">
            <div class="container mx-auto px-4">
                <h2 class="text-2xl font-semibold mb-6">Our Location</h2>
                <div class="h-96 bg-gray-200 rounded-lg overflow-hidden">
                    <iframe class="w-full h-full"
                        :src="`https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=Bizana,South+Africa&zoom=15`"
                        allowfullscreen loading="lazy" title="Google Map">
                    </iframe>
                </div>
            </div>
        </section>
    </div>
</template>


<script setup lang="ts">
import ContactUsForm from '~/components/forms/contactUsForm.vue';
import {
    CheckCircle
} from 'lucide-vue-next';

const googleMapsApiKey = useRuntimeConfig().public.googleMapsApiKey;
const pageLoading = ref(true);
const formSubmitted = ref<boolean>(false)


function contactUsFormSubmit() {
    console.log('Update UI')
    if (import.meta.client) {
        sessionStorage.setItem('ns-contact-us-form-submitted', 'true');
        formSubmitted.value = true;
        toasts.success('Message sent successfully')
    }
}

onMounted(() => {
    if (import.meta.client) {
        // sessionStorage.removeItem('ns-contact-us-form-submitted')
        if (sessionStorage.getItem('ns-contact-us-form-submitted')) formSubmitted.value = true;
    }
    pageLoading.value = false
})
</script>