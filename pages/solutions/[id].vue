<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Breadcrumb navigation -->
        <div class="mb-6">
            <div class="flex items-center text-sm text-neutral-500">
                <NuxtLink to="/" class="flex items-center hover:text-primary-500 transition">
                    <ArrowLeft class="h-4 w-4 mr-2" />
                    <span class="hidden md:block">Back to Solutions</span>
                </NuxtLink>
                <span class="mx-2">/</span>
                <span>{{ solution?.name }}</span>
            </div>
        </div>

        <!-- Main content grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left column - images and details -->
            <div class="lg:col-span-2 space-y-6">
                <!-- Skeleton for Image Gallery -->
                <div v-if="solutionStatus === 'pending'" class="bg-white rounded-lg shadow-md overflow-hidden">
                    <!-- Main image skeleton -->
                    <div class="relative aspect-video bg-neutral-100 flex items-center justify-center">
                        <div class="w-full h-full animate-pulse bg-gray-200"></div>
                    </div>
                    <!-- Thumbnails skeleton -->
                    <div class="flex p-2 space-x-2 overflow-x-auto">
                        <div class="w-20 h-14 bg-gray-200 animate-pulse rounded"></div>
                        <div class="w-20 h-14 bg-gray-200 animate-pulse rounded"></div>
                        <div class="w-20 h-14 bg-gray-200 animate-pulse rounded"></div>
                        <div class="w-20 h-14 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                </div>
                <!-- Image gallery -->
                <div v-else class="bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="relative aspect-video bg-neutral-100">
                        <img v-if="activeImage?.viewLink" :src="activeImage?.viewLink"
                            :alt="`${solution?.name} preview`" class="w-full h-full object-cover" />
                    </div>
                    <div class="flex p-2 space-x-2 overflow-x-auto">
                        <button v-for="(img, index) in solution?.images" :key="img.id" @click="activeImage = img"
                            :class="[
                                'relative flex-shrink-0 w-20 h-14 overflow-hidden rounded',
                                activeImage === img ? 'ring-2 ring-primary-500' : 'hover:opacity-80'
                            ]">
                            <img :src="img.viewLink || ''" :alt="`Thumbnail ${index + 1}`"
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
                            <span v-if="tab.id === 'reviews'">({{ solution?.reviews?.length }})</span>
                        </button>
                    </div>

                    <!-- Tab content -->
                    <div class="p-6">
                        <!-- Overview tab -->
                        <div v-if="activeTab === 'overview'" class="space-y-4">
                            <h1 class="text-3xl font-bold text-neutral-800">{{ solution?.name }}</h1>
                            <span class="text-sm text-neutral-600">
                                {{
                                solution?.project?.businessService ?
                                solution?.project?.businessService?.name :
                                solution?.discriminator
                                }}
                            </span>
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
                                    {{ averageRating.toFixed(1) }} ({{ solution?.reviews?.length || 0 }}
                                    reviews)
                                </span>
                            </div>

                            <p class="text-neutral-700 leading-relaxed">{{ solution?.description }}</p>

                            <div class="flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0 pt-4">
                                <div>
                                    <h3 class="text-sm font-medium text-neutral-500">Author</h3>
                                    <p class="text-neutral-800">{{ `Chagi Siyavuya` }}</p>
                                </div>
                                <div>
                                    <h3 class="text-sm font-medium text-neutral-500">Last Updated</h3>
                                    <p class="text-neutral-800">
                                        {{
                                        solution?.updatedAt ? format(new Date(solution?.updatedAt), 'do MMM yyyy') :
                                        solution?.createdAt ? format(new Date(solution?.createdAt), 'do MMM yyyy') :
                                        'N/A'
                                        }}
                                    </p>
                                </div>
                                <div>
                                    <h3 class="text-sm font-medium text-neutral-500">Version</h3>
                                    <p class="text-neutral-800">{{ solution?.version.toFixed(2) || 'N/A' }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Features tab -->
                        <div v-if="activeTab === 'features'" class="space-y-6">
                            <h2 class="text-2xl font-semibold text-neutral-800">Key Features</h2>
                            <ul class="space-y-4">
                                <li v-for="feature in solution?.features" :key="feature.id" class="flex items-start">
                                    <CheckCircle class="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span class="text-neutral-700">{{ feature.description }}</span>
                                </li>
                            </ul>
                        </div>

                        <!-- Tech Stack tab -->
                        <div v-if="activeTab === 'techStack'" class="space-y-6">
                            <h2 class="text-2xl font-semibold text-neutral-800">Technology Stack</h2>
                            <div class="flex flex-wrap gap-3">
                                <span v-for="stack in solution?.technologyStacks" :key="stack.id"
                                    class="bg-primary-100 text-primary-600 px-4 py-2 rounded-full text-sm font-medium">
                                    {{ stack.name }}
                                </span>
                            </div>
                        </div>

                        <!-- Reviews tab -->
                        <div v-if="activeTab === 'reviews'" class="space-y-6">
                            <h2 class="text-2xl font-semibold text-neutral-800">Customer Reviews</h2>
                            <div class="flex flex-col space-y-4">
                                <div v-for="review in sortedReviews" :key="review.id"
                                    class="bg-neutral-50 p-4 rounded-lg">
                                    <div class="flex justify-between">
                                        <div class="flex items-center space-x-2">
                                            <div
                                                class="h-10 w-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-500">
                                                <User class="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h4 class="font-medium text-neutral-800">{{ review.evaluator.lastName }}
                                                    {{ review.evaluator.firstName }}</h4>
                                                <div class="flex">
                                                    <Star v-for="j in 5" :key="j" :class="[
                                                        'h-4 w-4',
                                                        j <= 5 - (review.rating % 2) ? 'text-yellow-400 fill-current' : 'text-neutral-300'
                                                    ]" />
                                                </div>
                                            </div>
                                        </div>
                                        <span class="text-sm text-neutral-500">
                                            {{ format(new Date(review.createdAt), 'do MMM yyyy hh:mm a') }}
                                        </span>
                                    </div>
                                    <p class="mt-3 text-neutral-700">
                                        {{ review.comment }}
                                    </p>
                                </div>
                                <button class="text-primary-500 hover:text-primary-600 font-medium"
                                    @click="showMoreReviews = !showMoreReviews">
                                    {{ showMoreReviews ? 'Show less' : 'Show more' }}
                                </button>

                            </div>
                        </div>
                    </div>
                </div>



                <div v-if="allSolutionsStatus === 'pending' || solutionStatus === 'pending'"
                    class="bg-white rounded-lg shadow-md p-6">
                    <!-- Skeleton Heading -->
                    <div class="h-6 w-1/3 bg-gray-300 animate-pulse mb-4"></div>
                    <!-- Skeleton Grid -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <!-- Skeleton Card -->
                        <div class="p-4 bg-neutral-50 rounded-lg animate-pulse">
                            <!-- Title Placeholder -->
                            <div class="h-4 w-2/3 bg-gray-300 mb-2"></div>
                            <!-- Details Placeholder -->
                            <div class="flex items-center space-x-2">
                                <div class="h-3 w-16 bg-gray-300"></div>
                                <div class="h-4 w-4 bg-gray-300"></div>
                            </div>
                        </div>
                        <!-- Repeat Skeleton Card 3 more times -->
                        <div class="p-4 bg-neutral-50 rounded-lg animate-pulse">
                            <div class="h-4 w-2/3 bg-gray-300 mb-2"></div>
                            <div class="flex items-center space-x-2">
                                <div class="h-3 w-16 bg-gray-300"></div>
                                <div class="h-4 w-4 bg-gray-300"></div>
                            </div>
                        </div>
                        <div class="p-4 bg-neutral-50 rounded-lg animate-pulse">
                            <div class="h-4 w-2/3 bg-gray-300 mb-2"></div>
                            <div class="flex items-center space-x-2">
                                <div class="h-3 w-16 bg-gray-300"></div>
                                <div class="h-4 w-4 bg-gray-300"></div>
                            </div>
                        </div>
                        <div class="p-4 bg-neutral-50 rounded-lg animate-pulse">
                            <div class="h-4 w-2/3 bg-gray-300 mb-2"></div>
                            <div class="flex items-center space-x-2">
                                <div class="h-3 w-16 bg-gray-300"></div>
                                <div class="h-4 w-4 bg-gray-300"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Related solutions -->
                <div v-else class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-xl font-semibold text-neutral-800 mb-4">Related Solutions</h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <NuxtLink v-for="related in relatedSolutions" :key="related.id" :to="`/solutions/${related.id}`"
                            class="p-4 bg-neutral-50 hover:bg-primary-50 rounded-lg transition">
                            <h3 class="font-medium text-neutral-800">{{ related.name }}</h3>
                            <div class="flex items-center text-sm text-primary-500 mt-2">
                                <span>View details</span>
                                <ArrowRight class="h-4 w-4 ml-1" />
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </div>

            <!-- Right column - purchase card and social buttons -->
            <div class="space-y-6">
                <!-- Purchase card -->
                <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-2xl font-bold text-neutral-800">R{{ solution?.price.toFixed(2) || 'Undefined' }}
                        </h3>
                        <span class="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">Once
                            off</span>
                    </div>

                    <nuxt-link :to="`purchase/${solution?.id}`"
                        class="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-lg mb-4 flex items-center justify-center">
                        <ShoppingCart class="h-5 w-5 mr-2" />
                        Purchase Now
                    </nuxt-link>
                    <button
                        class="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-medium py-3 px-4 rounded-lg mb-6 flex items-center justify-center">
                        <DownloadCloud class="h-5 w-5 mr-2" />
                        Download Demo
                    </button>

                    <div class="border-t border-b py-4 mb-4">
                        <div class="flex justify-between mb-2">
                            <span class="text-neutral-600">License</span>
                            <span class="text-neutral-800 font-medium">Single Domain</span>
                        </div>
                        <div class="flex justify-between mb-2">
                            <span class="text-neutral-600">Support</span>
                            <span class="text-neutral-800 font-medium">6 months included</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-neutral-600">Updates</span>
                            <span class="text-neutral-800 font-medium">1st 6 months free</span>
                        </div>
                    </div>

                    <!-- Social and action buttons -->
                    <div class="flex space-x-2 mb-4">
                        <button @click="isLiked = !isLiked" :class="[
                            'flex-1 py-2 rounded-lg border flex items-center justify-center transition',
                            isLiked
                                ? 'bg-red-50 border-red-200 text-red-500'
                                : 'border-neutral-200 hover:bg-neutral-50 text-neutral-600'
                        ]">
                            <Heart :class="['h-5 w-5 mr-1', isLiked ? 'fill-current' : '']" />
                            <span>{{ isLiked ? 'Liked' : 'Like' }}</span>
                        </button>
                        <button @click="bookmarkSolution" :class="[
                            'flex-1 py-2 rounded-lg border flex items-center justify-center transition',
                            isBookmarked
                                ? 'bg-blue-50 border-blue-200 text-blue-500'
                                : 'border-neutral-200 hover:bg-neutral-50 text-neutral-600'
                        ]">
                            <Bookmark :class="['h-5 w-5 mr-1', isBookmarked ? 'fill-current' : '']" />
                            <span>{{ isBookmarked ? 'Saved' : 'Save' }}</span>
                        </button>
                    </div>

                    <div class="grid grid-cols-3 gap-2">
                        <button
                            class="p-2 border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50 transition flex flex-col items-center text-xs">
                            <Share2 class="h-5 w-5 mb-1" />
                            Share
                        </button>
                        <nuxt-link to="/contact#contact"
                            class="p-2 border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50 transition flex flex-col items-center text-xs">
                            <MessageCircle class="h-5 w-5 mb-1" />
                            Contact
                        </nuxt-link>
                        <button
                            class="p-2 border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50 transition flex flex-col items-center text-xs">
                            <Info class="h-5 w-5 mb-1" />
                            Report
                        </button>
                    </div>
                </div>

                <!-- Resource links -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-lg font-semibold text-neutral-800 mb-4">Resources</h3>
                    <div class="space-y-3">
                        <a href="#" target="_blank"
                            class="flex items-center text-neutral-700 hover:text-primary-500 transition">
                            <FileCode class="h-5 w-5 mr-3 text-neutral-500" />
                            <span>Documentation</span>
                        </a>
                        <a v-if="solution?.SourceUrl" :href="solution.SourceUrl" target="_blank"
                            class="flex items-center text-neutral-700 hover:text-primary-500 transition">
                            <Github class="h-5 w-5 mr-3 text-neutral-500" />
                            <span>Source Code</span>
                        </a>
                        <nuxt-link v-if="solution?.previewUrl" :to="solution?.previewUrl" target="_blank"
                            class="flex items-center text-neutral-700 hover:text-primary-500 transition">
                            <Globe class="h-5 w-5 mr-3 text-neutral-500" />
                            <span>Live Demo</span>
                        </nuxt-link>
                        <a href="#" target="_blank"
                            class="flex items-center text-neutral-700 hover:text-primary-500 transition">
                            <ExternalLink class="h-5 w-5 mr-3 text-neutral-500" />
                            <span>API Reference</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import solutionService from '~/services/solutionService';
import { ref } from 'vue';
import {
    ArrowLeft,
    ArrowRight,
    Heart,
    Star,
    ShoppingCart,
    DownloadCloud,
    Share2,
    MessageCircle,
    Bookmark,
    CheckCircle,
    User,
    Github,
    Globe,
    FileCode,
    ExternalLink,
    Info
} from 'lucide-vue-next';
import { useAuthStore } from '~/stores/useAuthStore';
import { format } from 'date-fns';

// Fetch the current solution
const route = useRoute();
const solutionId = route.params.id as string;

const { data: solution, status: solutionStatus, error: solutionError, refresh: solutionRefresh } =
    useAsyncData(`solutions-solution-${solutionId}`, () => solutionService.getSolutionAsync(solutionId));

// Fetch all solutions
const {
    data: allSolutions,
    status: allSolutionsStatus,
    error: allSolutionsError,
    refresh: allSolutionsRefresh
} = useAsyncData('allSolutions', () => solutionService.getSolutionsAsync());

// Compute related solutions based on current solution
const relatedSolutions = computed(() => {
    if (!solution.value || !allSolutions.value) return [];

    // Filter out the current solution and find related ones
    return allSolutions.value
        .filter(s => s.id !== solutionId) // Remove current solution
        .filter(s => {
            // Check for keyword matches in title
            const nameMatch = solution.value?.name.split(' ')
                .some((word: any) => {
                    // Only consider meaningful words (longer than 3 chars)
                    if (word.length <= 3) return false;
                    return s.name.toLowerCase().includes(word.toLowerCase());
                });
            const discriminatorMatch = solution.value?.discriminator.split(' ')
                .some((word: any) => {
                    return s.discriminator.toLowerCase().includes(word.toLowerCase());
                });
            // Find solutions with matching category or technology stack
            const techStackMatch = s.technologyStacks.some((stack: any) =>
                solution.value?.technologyStacks.some((ts: any) => ts.id === stack.id)
            );

            return nameMatch || techStackMatch || discriminatorMatch;
        })
        .slice(0, 4); // Limit to 4 related solutions
});

// UI state
const activeTab = ref('overview');
const activeImage = ref();
const isLiked = ref(false);
const isBookmarked = ref(false);
const showMoreReviews = ref(false);

// Tab definitions
const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'techStack', label: 'Tech Stack' },
    { id: 'reviews', label: 'Reviews' }
];

async function bookmarkSolution() {
    if (useAuthStore().isAuthenticated && useAuthStore().user?.id) {
        try {
            var payload = {
                userId: useAuthStore().user?.id,
                solutionId: solution.value?.id
            }
            await solutionService.bookmarkAsync(payload);
        }
        catch (e) {
            console.error(e);
        }
    }
}

// Calculate average rating from reviews
const averageRating = computed(() => {
    const reviews = solution.value?.reviews || [];

    if (!reviews.length) {
        return 0;
    }

    // Calculate the sum of all ratings
    const sum = reviews.reduce((total: any, review: { rating: any; }) => {
        return total + (review.rating || 0);
    }, 0);

    // Return the average
    return sum / reviews.length;
});


const sortedReviews = computed(() => {
    if (!solution.value) return [];
    if (showMoreReviews.value) return solution.value?.reviews.reverse();
    else return solution.value?.reviews.slice(-4).reverse();
});

watch(solution, () => {
    if (solution.value) {
        activeImage.value = solution.value.images[0];
    }
});

onMounted(() => {
    solutionRefresh();
    allSolutionsRefresh();
    console.log(solution.value);
});
</script>