<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Breadcrumb navigation -->
        <div class="mb-6">
            <div class="flex items-center text-sm text-neutral-500">
                <NuxtLink to="/" class="flex items-center hover:text-primary-500 transition">
                    <ArrowLeft class="h-4 w-4 mr-2" />
                    Back to Home
                </NuxtLink>
                <span class="mx-2">/</span>
                <NuxtLink :to="`/solutions/${solution?.id}`" class="hover:text-primary-500 transition">
                    {{ solution?.name }}
                </NuxtLink>
                <span class="mx-2">/</span>
                <span>Purchase</span>
            </div>
        </div>

        <!-- Main content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left column - form and inputs -->
            <div class="lg:col-span-2 space-y-6">
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h1 class="text-2xl font-bold text-neutral-800 mb-4">Get Started with {{ solution?.name }}</h1>
                    <p class="text-neutral-600 mb-6">Tell us about your project requirements to help us understand your
                        needs better.</p>
                    <!-- Step content -->
                    <form @submit.prevent="submitForm" class="space-y-6"
                        :class="{ 'opacity-50 pointer-events-none':isSubmitting }">
                        <!-- Contact Information -->
                        <div>
                            <div class="space-y-4">
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label for="firstName"
                                            class="block text-sm font-medium text-neutral-700 mb-1">First Name</label>
                                        <input type="text" id="firstName" v-model="model.firstName.value"
                                            class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                            :class="{ 'border-red-500': model.firstName.errors?.length }"
                                            placeholder="Your first name" />
                                        <p v-if="model.firstName.errors?.length" class="mt-1 text-sm text-red-600">{{
                                            model.firstName.errors[0]
                                            }}</p>
                                    </div>

                                    <div>
                                        <label for="lastName"
                                            class="block text-sm font-medium text-neutral-700 mb-1">Last Name</label>
                                        <input type="text" id="lastName" v-model="model.lastName.value"
                                            class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                            :class="{ 'border-red-500': model.lastName.errors?.length }"
                                            placeholder="Your last name" />
                                        <p v-if="model.lastName.errors?.length" class="mt-1 text-sm text-red-600">{{
                                            model.lastName.errors[0]
                                            }}</p>
                                    </div>
                                </div>

                                <div>
                                    <label for="email" class="block text-sm font-medium text-neutral-700 mb-1">Email
                                        Address</label>
                                    <input type="email" id="email" v-model="model.email.value"
                                        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                        :class="{ 'border-red-500': model.email.errors?.length }"
                                        placeholder="your@email.com" />
                                    <p v-if="model.email.errors?.length" class="mt-1 text-sm text-red-600">{{
                                        model.email.errors[0] }}</p>
                                </div>

                                <div>
                                    <label for="phone" class="block text-sm font-medium text-neutral-700 mb-1">Phone
                                        Number</label>
                                    <input type="tel" id="phone" v-model="model.phoneNumber.value"
                                        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                        :class="{ 'border-red-500': model.phoneNumber.errors?.length }"
                                        placeholder="Your phone number" />
                                    <p v-if="model.phoneNumber.errors?.length" class="mt-1 text-sm text-red-600">{{
                                        model.phoneNumber.errors[0] }}</p>
                                </div>

                                <div>
                                    <label for="company"
                                        class="block text-sm font-medium text-neutral-700 mb-1">Company/Organization</label>
                                    <input type="text" id="company" v-model="model.organizationName.value"
                                        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                        placeholder="Your company or organization (if applicable)" />
                                </div>

                                <div>
                                    <label class="flex items-center">
                                        <input type="checkbox" v-model="model.terms.value"
                                            class="h-4 w-4 text-primary-600 focus:ring-primary-500" />
                                        <span class="ml-2 text-sm text-neutral-700">
                                            I agree to the <a href="#" class="text-primary-600 hover:underline">Terms of
                                                Service</a> and
                                            <a href="#" class="text-primary-600 hover:underline">Privacy Policy</a>
                                        </span>
                                    </label>
                                    <p v-if="model.terms.errors?.length" class="mt-1 text-sm text-red-600">{{
                                        model.terms.errors[0] }}</p>
                                </div>
                            </div>
                        </div>

                        <div class="flex justify-between pt-4 border-t">
                            <nuxt-link :to="`/solutions/${solution?.id}`"
                                class="px-6 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50 transition">
                                Back
                            </nuxt-link>
                            <button type="submit" @click="submitForm"
                                class="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition flex items-center"
                                :disabled="isSubmitting">
                                {{ isSubmitting ? 'Submitting...' : 'Submit' }}
                                <ArrowRight v-if="!isSubmitting" class="h-4 w-4 ml-2" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Right column - Package summary and help -->
            <div class="space-y-6">
                <!-- Selected package summary -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-lg font-semibold text-neutral-800 mb-4">
                        Purchase solution
                    </h3>

                    <div class="bg-neutral-50 rounded-lg p-4 mb-4">
                        <div class="flex justify-between items-center mb-2">
                            <h4 class="font-bold text-neutral-800">{{ solution?.name }}</h4>
                            <span :class="pkgColor(solution?.name || '')">
                                OnceOff
                            </span>
                        </div>

                        <div v-if="solution?.price" class="mb-2">
                            <span class="text-xl font-bold text-neutral-800">R{{ solution.price }}</span>
                            <span class="text-neutral-500 text-sm">/{{ `Total Price` }}</span>
                        </div>

                        <p class="text-neutral-600 text-sm mt-4 line-clamp-6">{{ solution?.description }}</p>
                    </div>


                    <div class="border-t py-4">
                        <h4 class="font-medium text-neutral-800 mb-2">Included in this package:</h4>
                        <ul class="space-y-2">
                            <li v-for="feature in solution?.features" :key="feature.id" class="flex items-start">
                                <CheckCircle class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span class="text-neutral-700 text-sm">{{ feature?.title }}</span>
                            </li>
                        </ul>
                    </div>

                    <div class="mt-4 pt-4 border-t">
                        <NuxtLink :to="`/solutions/${solution?.id}`"
                            class="text-primary-500 hover:text-primary-600 text-sm flex items-center">
                            <ArrowLeft class="h-4 w-4 mr-1" />
                            Back to {{ solution?.name }}
                        </NuxtLink>
                    </div>
                </div>

                <!-- Need help section -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-lg font-semibold text-neutral-800 mb-4">Need Help?</h3>
                    <p class="text-neutral-600 mb-4">Have questions about our services or the application process?</p>

                    <div class="space-y-3">
                        <a href="#" class="flex items-center text-neutral-700 hover:text-primary-500 transition">
                            <MessageCircle class="h-5 w-5 mr-3 text-neutral-500" />
                            <span>Chat with Support</span>
                        </a>
                        <a href="#" class="flex items-center text-neutral-700 hover:text-primary-500 transition">
                            <Phone class="h-5 w-5 mr-3 text-neutral-500" />
                            <span>+27 123 456 7890</span>
                        </a>
                        <a href="#" class="flex items-center text-neutral-700 hover:text-primary-500 transition">
                            <Mail class="h-5 w-5 mr-3 text-neutral-500" />
                            <span>support@yourcompany.com</span>
                        </a>
                    </div>

                    <div class="mt-6">
                        <button
                            class="w-full border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-medium py-2 px-4 rounded-lg flex items-center justify-center">
                            <HelpCircle class="h-5 w-5 mr-2" />
                            View FAQ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
    ArrowLeft, ArrowRight, CheckCircle,
    MessageCircle, Phone, Mail, HelpCircle
} from 'lucide-vue-next';
import { useRoute } from 'vue-router';
import solutionService from '~/services/solutionService';
import VueSanity, { required, type ModelConfig } from 'vuesanity';

definePageMeta({
    validate(route) {
        if (!(route.params.id)) {
            return false
        }
        return true;
    },
})

// Get route and service ID
const route = useRoute();

const { data: solution } =
    useAsyncData(`solutions-solution-${route.params.id}`, () => solutionService.getSolutionAsync(route.params.id as string));


// Define steps

// Form state
const isSubmitting = ref(false);

const model: ModelConfig = {
    lastName: { validations: [required()] },
    firstName: { validations: [required()] },
    email: { validations: [required()] },
    phoneNumber: { validations: [required()] },
    organizationName: {},
    terms: { validations: [required()] },
};


// Submit form
const submitForm = async () => {
    isSubmitting.value = true;
    try {
        const state = new VueSanity(model);
        if (!state.isValid) {
            console.error('Form validation failed:', state.errors);
            isSubmitting.value = false;
        } else {
            await solutionService.purchaseSolutionsAsync(solution.value?.id || route.params.id as string, state.formData);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
    }
    // isSubmitting.value = false;
};

// Color helper function
const pkgColor = (name: string) => {
    switch (name) {
        case 'Basic':
            return 'bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium';
        case 'Professional':
            return 'bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium';
        case 'Enterprise':
            return 'bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium';
        default:
            return 'bg-neutral-100 text-neutral-700 px-2 py-1 rounded-full text-xs font-medium';
    }
};

onMounted(() => {
    console.log(solution.value);
});
</script>
