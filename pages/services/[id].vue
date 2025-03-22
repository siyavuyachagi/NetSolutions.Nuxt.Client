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
                <span>{{ ourService?.name }}</span>
            </div>
        </div>

        <!-- Main content grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left column - images and details -->
            <div class="lg:col-span-2 space-y-6">
                <!-- Service showcase -->
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="relative aspect-video bg-neutral-100">
                        <img :src="ourService?.thumbnail" :alt="`${ourService?.name} preview`"
                            class="w-full h-full object-cover" />
                    </div>
                    <div class="flex p-2 space-x-2 overflow-x-auto">
                        <button v-for="service in ourServices" :key="service.id"
                            @click="ourService = service" :class="[
                                'relative flex-shrink-0 w-20 h-14 overflow-hidden rounded',
                                ourService === service ? 'ring-2 ring-primary-500' : 'hover:opacity-80'
                            ]">
                            <img :src="service?.thumbnail" :alt="`${service?.name} thumbnail`"
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
                            <span v-if="tab.id === 'testimonials'">({{ ourService?.testimonials?.length || 0 }})</span>
                        </button>
                    </div>

                    <!-- Tab content -->
                    <div class="p-6">
                        <!-- Overview tab -->
                        <div v-if="activeTab === 'overview'" class="space-y-4">
                            <h1 class="text-3xl font-bold text-neutral-800">{{ ourService?.name }}</h1>
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
                                    {{ averageRating.toFixed(1) }} ({{ ourService?.testimonials?.length || 0 }} reviews)
                                </span>
                            </div>



                            <p class="text-neutral-700 leading-relaxed">{{ ourService?.description }}</p>

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
                            <div v-for="servicePackage in ourService?.packages" :key="servicePackage.id">
                                <h4 class="font-semibold text-neutral-700">{{ servicePackage?.name }}</h4>
                                <ul class="space-y-4">
                                    <li v-for="feature in servicePackage.features" :key="feature.id"
                                        class="flex items-start">
                                        <CheckCircle class="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                        <span class="text-neutral-700">{{ feature.description }}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <!-- ContactUs tab -->
                        <div v-if="activeTab === 'contact-us'"
                            class="contact-form-container max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
                            <h2 class="text-2xl font-semibold text-gray-800 mb-6">Contact Us</h2>

                            <form @submit.prevent="handleContactUsSubmit" class="space-y-6">
                                <!-- Email Field -->
                                <div class="form-group">
                                    <label for="email"
                                        class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input type="email" id="email" v-model="model.email.value"
                                        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        :class="{ 'border-red-500': model.email.value }" placeholder="your@email.com" />
                                    <p v-if="model.email.value" class="mt-1 text-sm text-red-600">{{
                                        model.email.value[0] }}</p>
                                </div>

                                <!-- Subject Field -->
                                <div class="form-group">
                                    <label for="subject"
                                        class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                    <input type="text" id="subject" v-model="model.subject.value"
                                        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        :class="{ 'border-red-500': model.subject.errors }"
                                        placeholder="What's this about?" />
                                    <p v-if="model.subject.errors" class="mt-1 text-sm text-red-600">{{
                                        model.subject.errors[0] }}</p>
                                </div>

                                <!-- Message Field -->
                                <div class="form-group">
                                    <label for="message"
                                        class="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea id="message" v-model="model.message.value" rows="5"
                                        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                                        :class="{ 'border-red-500': model.message.errors }"
                                        placeholder="How can we help you?"></textarea>
                                    <p v-if="model.message.errors" class="mt-1 text-sm text-red-600">{{
                                        model.message.errors[0] }}</p>
                                </div>

                                <!-- Submit Button -->
                                <div class="flex items-center justify-between">
                                    <button type="submit"
                                        class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
                                        :disabled="isSubmitting">
                                        {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                                    </button>
                                </div>
                            </form>
                        </div>

                        <!-- Testimonials tab -->
                        <div v-if="activeTab === 'testimonials'" class="space-y-6">
                            <h2 class="text-2xl font-semibold text-neutral-800">Client Testimonials</h2>
                            <div class="flex flex-col space-y-4">
                                <div v-for="testimonial in ourService?.testimonials" :key="testimonial.id"
                                    class="bg-neutral-50 p-4 rounded-lg">
                                    <div class="flex justify-between">
                                        <div class="flex items-center space-x-2">
                                            <div
                                                class="h-10 w-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-500">
                                                <User class="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h4 class="font-medium text-neutral-800">{{
                                                    testimonial.reviewer.lastName }} {{ testimonial.reviewer.firstName
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
                                </div>
                                <button v-if="ourService?.testimonials.length > 5"
                                    class="text-primary-500 hover:text-primary-600 font-medium"
                                    @click="showMoreTestimonials = !showMoreTestimonials">
                                    {{ showMoreTestimonials ? 'Show less' : 'Show more' }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Portfolio showcase -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-xl font-semibold text-neutral-800 mb-4">Portfolio Showcase</h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <nuxt-link
                            v-for="solution in (solutions?.filter((s: any) => s?.project?.ourService?.id == ourService?.id))?.slice(0, 4)"
                            :key="solution.id" class="p-4 bg-neutral-50 hover:bg-primary-50 rounded-lg transition"
                            :to="`/solutions/${solution.id}`">
                            <img :src="solution?.solutionImages[0].viewLink" :alt="solution?.name"
                                class="w-full h-40 object-cover rounded-md mb-3" />
                            <h3 class="font-medium text-neutral-800">{{ solution?.name }}</h3>
                            <div class="flex items-center text-sm text-primary-500 mt-2">
                                <span>View details</span>
                                <ArrowRight class="h-4 w-4 ml-1" />
                            </div>
                        </nuxt-link>
                    </div>
                </div>
            </div>

            <!-- Right column - packages and contact info -->
            <div class="space-y-6">
                <!-- Packages cards -->
                <div v-for="pkg in [...(ourService?.packages || [])].sort((a, b) => a.price - b.price)" :key="pkg.id"
                    class="bg-white rounded-lg shadow-md p-6">
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
                            <li v-for="feature in pkg.features" :key="feature" class="flex items-start">
                                <CheckCircle class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span class="text-neutral-700">{{ feature?.title }}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Contact card -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-lg font-semibold text-neutral-800 mb-4">Contact Us</h3>
                    <p class="text-neutral-600 mb-4">Need a custom solution? Let's discuss your project requirements.
                    </p>

                    <button
                        class="w-full bg-neutral-800 hover:bg-neutral-900 text-white font-medium py-3 px-4 rounded-lg mb-4 flex items-center justify-center">
                        <Mail class="h-5 w-5 mr-2" />
                        Get in Touch
                    </button>

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
                    <div class="grid grid-cols-4 gap-2">
                        <a href="#"
                            class="p-3 border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50 transition flex items-center justify-center">
                            <i data-feather="github" class="h-5 w-5"></i>
                        </a>
                        <a href="#"
                            class="p-3 border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50 transition flex items-center justify-center">
                            <i data-feather="twitter" class="h-5 w-5"></i>
                        </a>
                        <a href="#"
                            class="p-3 border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50 transition flex items-center justify-center">
                            <i data-feather="linkedin" class="h-5 w-5"></i>
                        </a>
                        <a href="#"
                            class="p-3 border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50 transition flex items-center justify-center">
                            <i data-feather="instagram" class="h-5 w-5"></i>
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
import { ArrowLeft, ArrowRight, Star, CheckCircle, User, ShoppingCart, Mail, Phone, Clock } from 'lucide-vue-next';
import { useRoute } from 'vue-router';
import ourServiceService from '~/services/ourServiceService';
import solutionService from '~/services/solutionService';
import type { ModelConfig } from 'vuesanity';

const route = useRoute();
// Fetch our services and solutions asynchronously
const { data: ourService, refresh: ourServiceRefresh } = useAsyncData(`ourService-${route.params.id}`, () => ourServiceService.getServiceAsync(route.params.id as string));
const { data: ourServices, refresh: ourServicesRefresh } = useAsyncData(`ourServices-${route.params.id}`, () => ourServiceService.getServicesAsync());
const { data: solutions, refresh: solutionsRefresh } = useAsyncData(`solutions-${route.params.id}`, () => solutionService.getSolutionsAsync());

// State management using Composition API
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
    const reviews = ourService.value?.testimonials || [];
    if (!reviews.length) return 0;
    const sum = reviews.reduce((total: number, review: any) => total + (review.rating || 0), 0);
    return sum / reviews.length;
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

const model = reactive<ModelConfig>({
    email: {
        type: 'email',
    },
    subject: {
        type: 'string',
    },
    message: {
        type: 'string',
    },
});
const isSubmitting = ref(false);
function handleContactUsSubmit() {

}

onMounted(() => {
    console.log(ourServices.value)
    console.log(ourService.value)
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