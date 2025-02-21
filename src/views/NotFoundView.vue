<template>

    <div class="mb-8 text-center group">
        <h2 class="text-3xl font-bold tracking-tight text-miffyWhite">page not found</h2>
        <p class="text-base font-semibold leading-6 text-miffyWhite">how did you get here?</p>
    </div>

    <div class="text-center">

        <img src="/images/miffy-ghosting.png" class="my-6 inline-block w-[196px] pointer-events-none select-none">

        <div class="fixed bottom-0 right-8 left-8">
            <div class="sticky inset-0 top-auto w-full py-6 bg-miffyOrange/85">
                <button type="button"
                    class="relative overflow-hidden inline-flex items-center justify-center text-center gap-x-2 rounded-lg w-full bg-miffyWhite px-4 py-3.5 text-base font-semibold text-miffyOrange focus:ring-2 focus:ring-miffyWhite focus:outline-none"
                    @click="goToPage('/')">
                    <span class="flex-1">bring me home please..</span>
                </button>
            </div>
        </div>
    </div>


</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToPage = (path) => {
    router.push(path);
};
</script>