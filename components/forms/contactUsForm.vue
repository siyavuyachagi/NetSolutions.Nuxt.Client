<template>
    <!-- Contact Form -->
    <Transition appear enter-from-class="opacity-0 translate-x-6"
        enter-active-class="transition-all duration-1000 ease-out">
        <div class="contact-form bg-white rounded-lg shadow-md p-8">
            <h2 class="text-2xl font-semibold mb-6">Send Us a Message</h2>

            <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Email Field -->
                <div class="form-group">
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" id="email" v-model="model.email.value"
                        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                        :class="{ 'border-red-500': model.email.errors?.length }" placeholder="your@email.com" />
                    <p v-if="model.email.errors?.values()" class="mt-1 text-sm text-red-600">
                        {{ model.email.errors[0] }}
                    </p>
                </div>

                <!-- Subject Field -->
                <div class="form-group">
                    <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input type="text" id="subject" v-model="model.subject.value"
                        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                        :class="{ 'border-red-500': model.subject.errors?.length }" placeholder="What's this about?" />
                    <p v-if="model.subject.errors?.values()" class="mt-1 text-sm text-red-600">
                        {{ model.subject.errors[0] }}
                    </p>
                </div>

                <!-- Message Field -->
                <div class="form-group">
                    <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea id="message" v-model="model.message.value" rows="5"
                        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none resize-none"
                        :class="{ 'border-red-500': model.message.errors?.length }"
                        placeholder="How can we help you?"></textarea>
                    <p v-if="model.message.errors?.values()" class="mt-1 text-sm text-red-600">
                        {{ model.message.errors[0] }}
                    </p>
                </div>

                <!-- Submit Button -->
                <div class="flex items-center justify-between">
                    <button type="submit"
                        class="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition"
                        :disabled="isSubmitting">
                        {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                    </button>
                </div>
            </form>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import VueSanity, { email, maxLength, minLength, required, type ModelConfig } from 'vuesanity';
import messagesService from '~/services/messagesService';

const pageLoading = ref(true);
const emit = defineEmits(['submitted'])
const model: ModelConfig = reactive({
    email: {
        validations: [email(), required()]
    },
    subject: {
        validations: [required()]
    },
    message: {
        validations: [required(), minLength(20), maxLength(500)]
    }
});
const isSubmitting = ref(false);

async function handleSubmit() {
    try {
        isSubmitting.value = true;
        const state = new VueSanity(model);
        if (state.isValid) {
            await messagesService.contactUs(state.formData);
            emit('submitted')
            toasts.success('Message sent successfully')
        }
        console.log(state)
    } catch (err: any) {
        console.error(err);
        toasts.error(err?.message)
    } finally {
        isSubmitting.value = false;
    }
}

onMounted(() => pageLoading.value = false)
</script>