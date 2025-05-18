<template>
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
</template>

<script setup lang="ts">
import { HelpCircle, Mail, MessageCircle, Phone } from 'lucide-vue-next';

</script>