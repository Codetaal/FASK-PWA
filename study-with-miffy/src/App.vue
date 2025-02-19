<template>
  <div class="flex flex-col h-screen">
    <InstallNotification />
    <NavigationBar />
    <div class="px-8">
      <router-view></router-view>
    </div>
    <div class="px-8 py-8 mt-auto">
      <FooterNote v-if="isAllowedPage" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import InstallNotification from './components/InstallNotification.vue'
import NavigationBar from './components/NavigationBar.vue'
import FooterNote from './components/FooterNote.vue'

const route = useRoute();

const isAllowedPage = computed(() => (route.path !== "/exercise" && route.path !== "/results") && route.name !== "/404");
// console.log(isAllowedPage.value);
</script>
