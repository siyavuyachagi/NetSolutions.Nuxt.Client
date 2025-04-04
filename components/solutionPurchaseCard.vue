<template>
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
            <button @click="likeSolution" :class="[
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
</template>


<script setup lang="ts">
import type { PropType } from 'vue';
import type { Solution } from '~/models/types';
import solutionService from '~/services/solutionService';
import {
    Heart,
    ShoppingCart,
    DownloadCloud,
    Share2,
    MessageCircle,
    Bookmark,
    Info
} from 'lucide-vue-next';



const props = defineProps({
    solution: {
        type: Object as PropType<Solution>,
        required: true
    }
});

const emit = defineEmits(["update"])

const authStore = useAuthStore();

async function likeSolution() {
    if (useAuthStore().isAuthenticated && useAuthStore().user?.id) {
        try {
            var payload = {
                userId: useAuthStore().user?.id,
            }
            await solutionService.likeAsync(props.solution.id, payload);
            emit('update');
        }
        catch (e) {
            console.error(e);
        }
    }
    console.log("Not authenticated")
}

async function bookmarkSolution() {
    if (useAuthStore().isAuthenticated && useAuthStore().user?.id) {
        try {
            var payload = {
                userId: useAuthStore().user?.id,
            }
            await solutionService.bookmarkAsync(props.solution.id, payload);
            emit('update');
        }
        catch (e) {
            console.error(e);
        }
    }
}

const isLiked = computed(() => {
    if (!authStore.isAuthenticated) false;
    if (props.solution?.likes.some(l => l.id === authStore.user?.id)) {
        return true;
    } else return false;
});
const isBookmarked = computed(() => {
    if (!authStore.isAuthenticated) false;
    if (props.solution?.bookmarks?.some(b => b.id === authStore.user?.id)) {
        return true;
    } else return false;
});
</script>