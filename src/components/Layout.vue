<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router';
import Header from './Header.vue';

const isLogedIn = localStorage.getItem("userLogin");
</script>
<template>
    <div>
        <header v-if="isLogedIn != null">
            <Header />
        </header>
        <main v-if="isLogedIn == null">
            <RouterView />
        </main>
    </div>
</template>