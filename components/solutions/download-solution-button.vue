<template>
    <button class="download-btn flex px-6 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50"
        @click="downloadSolutionAsync">
        <DownloadCloud class="h-5 w-5 mr-2" />
        Download Now
    </button>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import axios, { Axios } from 'axios';
import { DownloadCloud } from 'lucide-vue-next';
import type { AxiosProgressEvent } from 'axios';
import toast from '~/utils/toasts';

const props = defineProps<{
    solutionId: string;
}>();

const isDownloading = ref(false);
const progress = ref(0);

const downloadSolutionAsync = async () => {
    try {
        isDownloading.value = true;
        progress.value = 0;

        const response = await axios.get(`/api/Solutions/${props.solutionId}/download`, {
            responseType: 'blob',
            onDownloadProgress: (event: AxiosProgressEvent) => {
                if (event.total) {
                    progress.value = Math.floor((event.loaded / event.total) * 100);
                }
            },
        });

        const contentDisposition = response.headers['content-disposition'];
        const fileNameMatch = contentDisposition?.match(/filename="?([^"]+)"?/);
        const fileName = fileNameMatch ? fileNameMatch[1] : 'download.zip';

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();

    } catch (error) {
        console.error('Download failed:', error);
        // alert('An error occurred while downloading the file.');
        toast.error('An error occurred while downloading the file.','top-center');
    } finally {
        isDownloading.value = false;
        progress.value = 0;
    }
};
</script>

<style scoped>
.download-btn {
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s;
}

.download-btn:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
}
</style>