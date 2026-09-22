<template>
    <div class="min-h-screen">
        <div v-if="isSidebarOpen" class="fixed inset-0 z-40 md:hidden" @click="closeSidebar"></div>
        <div class="fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out md:translate-x-0"
            :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'">
            <Sidebar @close="closeSidebar" />
        </div>
        <div class="min-h-screen md:pl-72">
            <TopBar @toggle-sidebar="toggleSidebar" />
            <main class="min-h-screen pt-16">
                <div class="p-4 sm:p-6 md:p-8 animate-fadeUp">
                    <RouterView />
                </div>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from './Sidebar.vue';
import TopBar from './TopBar.vue';
import { RouterView } from 'vue-router';

const isSidebarOpen = ref(false)
const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
}
const closeSidebar = () => {
    isSidebarOpen.value = false
}
</script>