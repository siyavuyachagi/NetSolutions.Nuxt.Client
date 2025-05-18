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
                <span>{{ businessService?.name }}</span>
            </div>
        </div>

        <!-- Main content grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left column - images and details -->
            <div class="lg:col-span-2 space-y-6">
                <!-- Service showcase -->
                <div v-if="businessServiceStatus === 'pending'" class="bg-white rounded-lg shadow-md overflow-hidden">
                    <!-- Main image skeleton -->
                    <div class="relative aspect-video bg-neutral-100 animate-pulse">
                        <div class="w-full h-full bg-neutral-200"></div>
                    </div>

                    <!-- Thumbnail skeletons -->
                    <div class="flex p-2 space-x-2 overflow-x-auto">
                        <div v-for="n in 5" :key="n"
                            class="relative flex-shrink-0 w-20 h-14 rounded bg-neutral-200 animate-pulse"></div>
                    </div>
                </div>

                <div v-else-if="businessServiceStatus === 'error'"
                    class="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center space-y-4">
                    <svg class="h-10 w-10 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p class="text-center text-red-600 text-sm">
                        Failed to load service images. Please try again later.
                    </p>
                    <button @click="businessServiceRefresh()"
                        class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition">
                        Retry
                    </button>
                </div>

                <div v-else class="bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="relative aspect-video bg-neutral-100">
                        <img :src="selectedImage?.viewLink || ''" :alt="`${businessService?.name} preview`"
                            class="w-full h-full object-cover" />
                    </div>
                    <div class="flex p-2 space-x-2 overflow-x-auto">
                        <button v-for="(image, index) in businessService?.images" :key="image.id || index"
                            @click="selectedImage = image" :class="[
                                'relative flex-shrink-0 w-20 h-14 overflow-hidden rounded',
                                selectedImage === image ? 'ring-2 ring-primary-500' : 'hover:opacity-80'
                            ]">
                            <img :src="image?.viewLink || ''" :alt="`${image?.name || 'Image'} thumbnail`"
                                class="w-full h-full object-cover" />
                        </button>
                    </div>
                </div>

                <!-- Tabs navigation -->
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="flex border-b">
                        <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
                            'px-6 py-4 text-sm font-medium',
                            activeTab === tab.id
                                ? 'border-b-2 border-primary-500 text-primary-600'
                                : 'text-neutral-600 hover:text-neutral-900'
                        ]">
                            {{ tab.label }}
                            <span v-if="tab.id === 'testimonials'">({{ businessService?.testimonials?.length || 0
                                }})</span>
                        </button>
                    </div>

                    <!-- Tab content -->
                    <div class="p-6">
                        <!-- Overview tab -->
                        <div v-if="activeTab === 'overview'" class="space-y-4">
                            <h1 class="text-3xl font-bold text-neutral-800">{{ businessService?.name }}</h1>
                            <div class="flex items-center space-x-2">
                                <div class="flex">
                                    <Star v-for="i in 5" :key="i" :class="[
                                        'h-5 w-5',
                                        i <= Math.floor(averageRating)
                                            ? 'text-yellow-400 fill-current'
                                            : i - Math.floor(averageRating) <= 0.5 && i > Math.floor(averageRating)
                                                ? 'text-yellow-400 fill-current star-half'
                                                : 'text-neutral-300'
                                    ]" />
                                </div>
                                <span class="text-sm font-medium text-neutral-700">
                                    {{ averageRating.toFixed(1) }} ({{ businessService?.testimonials?.length || 0 }}
                                    reviews)
                                </span>
                            </div>



                            <p class="text-neutral-700 leading-relaxed">{{ businessService?.description }}</p>

                            <div class="flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0 pt-4">
                                <!-- <div>
                                    <h3 class="text-sm font-medium text-neutral-500">Lead Developer</h3>
                                    <p class="text-neutral-800">{{ activeService?.leadDeveloper }}</p>
                                </div> -->
                                <div>
                                    <h3 class="text-sm font-medium text-neutral-500">Typical Timeframe</h3>
                                    <p class="text-neutral-800">2-6 Months</p>
                                </div>
                                <!-- <div>
                                    <h3 class="text-sm font-medium text-neutral-500">Starting From</h3>
                                    <p class="text-neutral-800">R{{ activeService?.basePrice.toFixed(2) }}</p>
                                </div> -->
                            </div>
                        </div>

                        <!-- Features tab -->
                        <div v-if="activeTab === 'features'" class="space-y-6">
                            <h2 class="text-2xl font-semibold text-neutral-800">Key Features</h2>
                            <div v-for="servicePackage in businessService?.businessServicePackages"
                                :key="servicePackage.id">
                                <h4 class="font-semibold text-neutral-700">{{ servicePackage?.name }}</h4>
                                <ul class="space-y-4">
                                    <li v-for="feature in servicePackage.businessServicePackageFeatures"
                                        :key="feature.id" class="flex items-start">
                                        <CheckCircle class="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                        <span class="text-neutral-700">{{ feature.description }}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <!-- ContactUs tab -->
                        <div v-if="activeTab === 'contact-us'">
                            <!-- <h2 class="text-2xl font-semibold text-gray-800 mb-6">Contact Us</h2> -->
                            <Transition appear enter-from-class="opacity-0 translate-x-6"
                                enter-active-class="transition-all duration-1000 ease-out">
                                <ContactInformation />
                            </Transition>
                        </div>

                        <!-- Testimonials tab -->
                        <div v-if="activeTab === 'testimonials'" class="space-y-6">
                            <h2 class="text-2xl font-semibold text-neutral-800">Client Testimonials</h2>
                            <div class="flex flex-col space-y-4">
                                <div v-for="testimonial in sortedTestimonials" :key="testimonial.id"
                                    class="bg-neutral-50 p-4 rounded-lg">
                                    <div class="flex justify-between">
                                        <div class="flex items-center space-x-2">
                                            <div
                                                class="h-10 w-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-500">
                                                <User class="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h4 class="font-medium text-neutral-800">{{
                                                    testimonial.evaluator.lastName }} {{ testimonial.evaluator.firstName
                                                    }}</h4>
                                                <div class="flex">
                                                    <Star v-for="j in 5" :key="j" :class="[
                                                        'h-4 w-4',
                                                        j <= testimonial.rating ? 'text-yellow-400 fill-current' : 'text-neutral-300'
                                                    ]" />
                                                </div>
                                            </div>
                                        </div>
                                        <span class="text-sm text-neutral-500">
                                            {{ format(new Date(testimonial.createdAt), "do MMM yyyy HH:mm a") }}
                                        </span>
                                    </div>
                                    <p class="mt-3 text-neutral-700">
                                        {{ testimonial.comment }}
                                    </p>
                                    <div v-if="authStore.isAuthenticated" class="mt-2 flex justify-end">
                                        <button v-if="testimonial.evaluator.id === authStore.user?.id"
                                            @click="deleteTestimonial(testimonial.id)"
                                            class="text-neutral-500 hover:text-red-500 p-1 rounded-full hover:bg-neutral-100 transition-colors">
                                            <Trash2 class="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                                <button v-if="businessService?.testimonials.length"
                                    class="text-primary-500 hover:text-primary-600 font-medium"
                                    @click="showMoreTestimonials = !showMoreTestimonials">
                                    {{ showMoreTestimonials ? 'Show less' : 'Show more' }}
                                </button>

                                <!-- Testimonial Form -->
                                <FormsServiceTestimonialForm v-if="businessService" :businessService="businessService"
                                    @update="businessServiceRefresh" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Portfolio showcase -->
                <ServicePortfolioShowcase v-if="businessService" :businessService="businessService" />

            </div>

            <!-- Right column - packages and contact info -->
            <div class="space-y-6">
                <!-- Packages cards -->
                <div v-for="pkg in [...(businessService?.businessServicePackages || [])].sort((a, b) => a.price - b.price)"
                    :key="pkg.id" class="bg-white rounded-lg shadow-md p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-2xl font-bold text-neutral-800">{{ pkg?.name }}</h3>
                        <span :class="pkgColor(pkg?.name)">
                            {{ pkg?.name }}
                        </span>
                    </div>

                    <div v-if="pkg.price !== 0" class="mb-4">
                        <span class="text-3xl font-bold text-neutral-800">R{{ pkg.price.toFixed(2) }}</span>
                        <span class="text-neutral-500 text-sm">/{{ pkg.billingCycle }}</span>
                    </div>

                    <p class="text-neutral-600 mb-4">{{ pkg.description }}</p>

                    <nuxt-link :to="`getting-started/${pkg.id}`"
                        class="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-lg mb-4 flex items-center justify-center">
                        <ShoppingCart class="h-5 w-5 mr-2" />
                        Get Started
                    </nuxt-link>

                    <div class="border-t py-4">
                        <h4 class="font-medium text-neutral-800 mb-2">Included in this package:</h4>
                        <ul class="space-y-2">
                            <li v-for="feature in pkg.businessServicePackageFeatures" :key="feature.id"
                                class="flex items-start">
                                <CheckCircle class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span class="text-neutral-700">{{ feature?.name }}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Contact card -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-lg font-semibold text-neutral-800 mb-4">Contact Us</h3>
                    <p class="text-neutral-600 mb-4">Need a custom solution? Let's discuss your project requirements.
                    </p>

                    <nuxt-link
                        :to="`/contact?path-from=/service/${businessService?.id}&resource-id=${businessService?.id}#contact`"
                        class="w-full bg-neutral-800 hover:bg-neutral-900 text-white font-medium py-3 px-4 rounded-lg mb-4 flex items-center justify-center">
                        <Mail class="h-5 w-5 mr-2" />
                        Get in Touch
                    </nuxt-link>

                    <div class="space-y-3 mt-6">
                        <a href="#" class="flex items-center text-neutral-700 hover:text-primary-500 transition">
                            <Phone class="h-5 w-5 mr-3 text-neutral-500" />
                            <span>+27 123 456 7890</span>
                        </a>
                        <a href="#" class="flex items-center text-neutral-700 hover:text-primary-500 transition">
                            <Mail class="h-5 w-5 mr-3 text-neutral-500" />
                            <span>contact@yourcompany.com</span>
                        </a>
                        <a href="#" class="flex items-center text-neutral-700 hover:text-primary-500 transition">
                            <Clock class="h-5 w-5 mr-3 text-neutral-500" />
                            <span>Mon-Fri: 9:00 - 17:00</span>
                        </a>
                    </div>
                </div>

                <!-- Social links -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-lg font-semibold text-neutral-800 mb-4">Follow Us</h3>
                    <div class="flex space-x-4 mt-4">
                        <!-- Instagram -->
                        <!-- <a href="#" class="text-pink-600 hover:text-pink-800 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                    </a> -->

                        <!-- Facebook -->
                        <a href="#" class="text-blue-600 hover:text-blue-800 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.738-.9 10.126-5.864 10.126-11.854z" />
                            </svg>
                        </a>

                        <!-- LinkedIn -->
                        <a href="#" class="text-blue-700 hover:text-blue-900 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>

                        <!-- X (formerly Twitter) -->
                        <!-- <a href="#" class="text-gray-800 hover:text-gray-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                        </svg>
                    </a> -->

                        <!-- YouTube -->
                        <a href="#" class="text-red-600 hover:text-red-800 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </a>

                        <!-- TikTok -->
                        <a href="#" class="text-gray-800 hover:text-gray-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { format } from 'date-fns';
import { ArrowLeft, Star, CheckCircle, User, ShoppingCart, Mail, Phone, Clock, Trash2 } from 'lucide-vue-next';
import { useRoute } from 'vue-router';
import businessServiceService from '~/services/businessServiceService';
import ServicePortfolioShowcase from '~/components/service-portfolio-showcase.vue';
import feedbackService from '~/services/feedbackService';
import toast from '~/utils/toasts';


const route = useRoute();
const authStore = useAuthStore();
// Fetch our services and solutions asynchronously
const { data: businessService, status: businessServiceStatus, refresh: businessServiceRefresh } = useAsyncData(`businessService-${route.params.id}`, () => businessServiceService.getServiceAsync(route.params.id as string));
const { data: businessServices, refresh: businessServicesRefresh } = useAsyncData(`businessServices-${route.params.id}`, () => businessServiceService.getServicesAsync());

// State management using Composition API
const selectedImage = ref();
const activeTab = ref('overview');
const showMoreTestimonials = ref(false);

// Tabs configuration
const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'contact-us', label: 'Contact Us' },
    { id: 'testimonials', label: 'Testimonials' },
];

// Computed property for average rating from the service testimonials
const averageRating = computed(() => {
    const reviews = businessService.value?.testimonials || [];
    if (!reviews.length) return 0;
    const sum = reviews.reduce((total: number, review: any) => total + (review.rating || 0), 0);
    return sum / reviews.length;
});

const sortedTestimonials = computed(() => {
    return [...(businessService?.value?.testimonials ?? [])].sort((a, b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
});

// Function to return a CSS class for package names
function pkgColor(name: string) {
    switch (name?.toLowerCase()) {
        case 'custom':
            return 'bg-blue-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded';
        case 'basic':
            return 'bg-green-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded';
        case 'standard':
            return 'bg-purple-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded';
        case 'premium':
            return 'bg-[gold] text-black text-xs font-semibold px-2.5 py-0.5 rounded';
        case 'enterprise':
            return 'bg-red-500 text-black text-xs font-semibold px-2.5 py-0.5 rounded';
        default:
            return 'bg-gray-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded';
    }
}

const deleteTestimonial = async (id: string) => {
    const result = await feedbackService.deleteFeedbackAsync(id);
    if (!result.success) {
        console.error(result)
        toast.error(result.message as string, 'bottom-center')
    } else {
        toast.success(result.message as string, 'top-center');
        businessServiceRefresh();
    }
}

watch(businessService, () => {
    if (businessService.value) {
        selectedImage.value = businessService.value.images[0];
    }
});

onMounted(() => {
    businessServiceRefresh();
    businessServicesRefresh();
    console.log(businessService.value)
    console.log(businessServices.value)
});
</script>


<style scoped>
.star-half {
    position: relative;
    overflow: hidden;
}

.star-half:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background-color: currentColor;
    z-index: 1;
}
</style>