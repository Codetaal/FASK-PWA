<template>
    <header class="">
        <nav class="flex items-center justify-between p-8 pt-6" aria-label="Global">
            <div class="flex flex-1">
                <svg v-if="canGoBack" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    class="size-6" @click="goBack">
                    <path fill-rule="evenodd"
                        d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <!-- <div class="text-xs font-semibold text-miffyYellow hover:text-miffyWhite">
                back
            </div> -->
            <span class="-m-1.5 p-1.5 w-12 h-12 ">
                <img class="pointer-events-none " src="/images/miffy.png" alt="">
            </span>
            <div class="flex justify-end flex-1">
                <div class="flex">
                    <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 "
                        @click="mobileMenuOpen = true">
                        <Squares2X2Icon class="w-6 h-6" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </nav>
        <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
            <DialogPanel
                class="fixed inset-y-0 left-0 z-10 flex flex-col w-full p-8 pt-6 overflow-y-auto bg-miffyOrange">
                <div class="flex items-center justify-between">
                    <span class="block -m-1.5 p-1.5 w-12 h-12 "></span>
                    <div class="flex justify-end flex-1">
                        <button type="button"
                            class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 focus:outline-none "
                            @click="mobileMenuOpen = false">
                            <XMarkIcon class="w-6 h-6" aria-hidden="true" />
                        </button>
                    </div>
                </div>
                <div>
                    <RouterLink v-for="item in navigation" :key="item.name" :to="item.href" @click="closeMenu"
                        class="block px-3 py-2 -mx-3 text-base font-semibold leading-7 hover:text-miffyYellow ">
                        {{ item.name }}
                    </RouterLink>
                    <a href="mailto:hello@sliceofdutch.com"
                        class="block px-3 py-2 -mx-3 text-base font-semibold leading-7 hover:text-miffyYellow">
                        contact me
                    </a>
                </div>
                <div class="mt-auto">
                    <FooterNote />
                </div>
            </DialogPanel>
        </Dialog>
    </header>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Squares2X2Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import FooterNote from './FooterNote.vue'

const navigation = [
    { name: 'start over', href: '/' },
    // { name: 'about this app', href: '/about' },
]

const mobileMenuOpen = ref(false);

const closeMenu = () => {
    mobileMenuOpen.value = false;
};

const router = useRouter();
const route = useRoute();

const goBack = () => {
    router.back();
};

const canGoBack = computed(() => route.path !== "/");

</script>