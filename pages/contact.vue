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
                    <ContactInformation />
                </Transition>

                <ContactUsForm v-if="!formSubmitted" @submitted="contactUsFormSubmit" />

                <Transition v-else appear enter-from-class="opacity-0 translate-x-6"
                    enter-active-class="transition-all duration-1000 ease-out">
                    <div class="bg-white rounded-lg shadow-md">
                        <iframe class="w-full h-full rounded-lg shadow-md"
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
import ContactInformation from '~/components/contact-information.vue';
import ContactUsForm from '~/components/forms/contactUsForm.vue';


const googleMapsApiKey = useRuntimeConfig().public.googleMapsApiKey;
const pageLoading = ref(true);
const formSubmitted = ref<boolean>(false)


function contactUsFormSubmit() {
    if (import.meta?.client) {
        sessionStorage.setItem('ns-contact-us-form-submitted', 'true');
    }
    formSubmitted.value = true;
}

onMounted(() => {
    if (import.meta?.client) {
        // sessionStorage.removeItem('ns-contact-us-form-submitted')
        if (sessionStorage.getItem('ns-contact-us-form-submitted')) formSubmitted.value = true;
    }
    pageLoading.value = false
})
</script>