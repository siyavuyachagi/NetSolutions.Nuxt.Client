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
                <NuxtLink :to="`/services/${businessServicePackage?.businessService?.id}`"
                    class="hover:text-primary-500 transition">
                    {{ businessServicePackage?.businessService?.name }}
                </NuxtLink>
                <span class="mx-2">/</span>
                <span>Getting Started</span>
                <span class="mx-2">/</span>
                <span>Success</span>
            </div>
        </div>

        <!-- Main content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left column - form and inputs -->
            <div class="lg:col-span-2 space-y-6">
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h1 class="text-2xl font-bold text-neutral-800 mb-4">Get started with {{
                        businessServicePackage?.businessService?.name }}</h1>
                    <p class="text-neutral-600 mb-6">Tell us about your project requirements to help us understand your
                        needs better.</p>

                    <!-- Progress steps -->
                    <!-- Progress steps (All Completed) -->
                    <div class="mb-8">
                        <div class="flex items-center justify-between">
                            <!-- Step 1 -->
                            <div class="flex flex-col items-center w-full relative">
                                <div
                                    class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium z-10 bg-primary-500 text-white">
                                    1
                                </div>
                                <div class="text-xs mt-2 text-center text-primary-600 font-medium">
                                    Project Details
                                </div>
                                <!-- Connector line -->
                                <div class="absolute top-4 w-full h-0.5 left-1/2 bg-primary-500"></div>
                            </div>

                            <!-- Step 2 -->
                            <div class="flex flex-col items-center w-full relative">
                                <div
                                    class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium z-10 bg-primary-500 text-white">
                                    2
                                </div>
                                <div class="text-xs mt-2 text-center text-primary-600 font-medium">
                                    Attachments
                                </div>
                                <!-- Connector line -->
                                <div class="absolute top-4 w-full h-0.5 left-1/2 bg-primary-500"></div>
                            </div>

                            <!-- Step 3 -->
                            <div class="flex flex-col items-center w-full relative">
                                <div
                                    class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium z-10 bg-primary-500 text-white">
                                    3
                                </div>
                                <div class="text-xs mt-2 text-center text-primary-600 font-medium">
                                    Contact Info
                                </div>
                            </div>
                        </div>
                    </div>


                    <!-- Step content -->
                    <div class="space-y-6">
                        <!-- Success screen -->
                        <div v-if="currentStep > steps.length" class="text-center py-6">
                            <div class="flex justify-center mb-4">
                                <div class="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                                    <XCircle class="h-10 w-10 text-red-500" />
                                </div>
                            </div>
                            <h2 class="text-2xl font-bold text-neutral-800 mb-2">Request cancelled!</h2>
                            <p class="text-neutral-600 mb-6">Thank you for your interest in our services. We've received
                                your request and will contact you shortly.</p>
                            <p class="text-sm text-neutral-500 mb-4">Reference ID: {{ businessServicePackage?.id }}</p>
                            <div class="flex justify-center space-x-4">
                                <NuxtLink to="/"
                                    class="px-6 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50">
                                    Back to Home
                                </NuxtLink>
                                <NuxtLink class="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
                                    Retry
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right column - Package summary and help -->
            <div class="space-y-6">
                <!-- Selected package summary -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-lg font-semibold text-neutral-800 mb-4">{{ businessServicePackage?.name }}
                    </h3>


                    <div class="border-t py-4">
                        <h4 class="font-medium text-neutral-800 mb-2">Included in this package:</h4>
                        <ul class="space-y-2">
                            <li v-for="feature in businessServicePackage?.packageFeatures" :key="feature.id"
                                class="flex items-start">
                                <CheckCircle class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span class="text-neutral-700 text-sm">{{ feature?.title }}</span>
                            </li>
                        </ul>
                    </div>

                    <div class="bg-neutral-50 rounded-lg p-4 mb-4">
                        <div v-if="businessServicePackage?.name !== 'Custom'"
                            class="flex justify-between items-center mb-2">
                            <h4 class="font-bold text-neutral-800">Total Price</h4>
                            <span :class="pkgColor(businessServicePackage?.name || '')">
                                {{ businessServicePackage?.name }}
                            </span>
                        </div>

                        <div class="mb-2">
                            <span class="text-xl font-bold text-neutral-800 mr-2">R{{ businessServicePackage?.price
                            }}</span>
                            <span class="text-neutral-500 text-sm">/{{
                                businessServicePackage?.billingCycle }}</span>
                        </div>

                        <p class="text-neutral-600 text-sm mt-2">{{ businessServicePackage?.description }}</p>
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
import { onMounted } from 'vue';
import {
    ArrowLeft, CheckCircle,
    MessageCircle, Phone, Mail, HelpCircle,
    XCircle
} from 'lucide-vue-next';
import { useRoute, useRouter } from 'vue-router';
import businessServicePackageService from '~/services/businessServicePackageService';
definePageMeta({
    validate(route) {
        if (!(route.query.subscriptionId && route.query.paymentId)) {
            return false
        } else
            return true;
    },
})

const route = useRoute();
const router = useRouter();

const { data: businessServicePackage, refresh: businessServicePackageRefresh }
    = useAsyncData(`ourServicePackage--getting-started-cancelled-${route.params.id}`, () => businessServicePackageService.getBusinessServicePackage(route.params.id as string));


// Define steps
const steps = [
    { label: 'Project Details' },
    { label: 'Attachments' },
    { label: 'Contact Info' },
];

// Form state
const currentStep = computed(() => {
    return parseInt(route.query.step as string) || 1;
});


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
// Submit form

console.log(businessServicePackage.value);
onMounted(() => {
    if (!route.query.step) router.replace({ query: { ...route.query, step: 1 } })
    businessServicePackageRefresh();
})
</script>
