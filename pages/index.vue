<template>
    <!-- Header Section -->
    <!-- <section class="py-14 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg shadow-md">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl font-bold text-purple-900 text-center">Our Portfolio</h1>
            <p class="mt-4 text-xl max-w-2xl text-purple-800 text-center mx-auto" style="min-height: 2.5rem;">
                <span id="typed-element"></span>
            </p>
        </div>
    </section> -->
    <hr class="my-8 border-t border-gray-200" />
    <ClientOnly>
        <IndexSolutions />
    </ClientOnly>
</template>



<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Typed from 'typed.js';
import IndexSolutions from '~/components/indexSolutions.vue';

const typed = ref<any>(null);

onMounted(() => {
    // typed.value = new Typed('#typed-element', {
    //     strings: [
    //         'We deliver exceptional products and services.',
    //         'We empower customers to achieve their goals.',
    //         'We strive to make a positive impact on communities.',
    //         'We aim to be industry leaders and exceed expectations.',
    //         'We foster innovation and inspire positive change.',
    //         'Integrity, excellence, and innovation define us.',
    //         'Collaboration and customer focus drive our success.'
    //     ],
    //     typeSpeed: 50,
    //     backSpeed: 5, // 🚀 backspacing speed
    //     loop: true,
    //     smartBackspace: true,
    //     showCursor: true, // ✅ Removes the blinking cursor
    //     // startDelay: 4000,
    //     backDelay: 3000
    // });
});

onUnmounted(() => {
    if (typed.value) {
        typed.value.destroy();
    }
});
</script>
