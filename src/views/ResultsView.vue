<template>

    <div class="mb-8 text-center group">
        <h2 class="text-3xl font-bold tracking-tight text-miffyWhite">your score</h2>
        <!-- <p class="text-base font-semibold leading-6 text-miffyWhite"></p> -->
    </div>

    <p class="px-4 mb-10 text-[6rem] font-normal text-center text-miffyWhite">
        <span class="block">
            {{ finalScore.toFixed(0) }}<span class="text-3xl"> %</span>
        </span>
    </p>

    <div class="fixed bottom-2 right-8 left-8">
        <div>
            <div class="w-full py-6 bg-miffyOrange/85">
                <router-link to="/" class="w-full">
                    <button type="button"
                        class="relative overflow-hidden inline-flex items-center justify-center text-center gap-x-2 rounded-lg w-full bg-miffyWhite px-4 py-3.5 text-lg font-semibold text-miffyOrange focus:ring-2 focus:ring-miffyWhite focus:outline-none">
                        another round!
                    </button>
                </router-link>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted } from "vue";
import { getStoredValue } from "/src/utils/storage";

// const storedQuestionCount = ref(0);
const storedScoreCount = ref(0);
const storedEnergy = ref({});
const finalScore = ref(0);

onMounted(() => {
    // storedQuestionCount.value = getStoredValue("questionCount", 0);
    storedScoreCount.value = getStoredValue("scoreCount", 0);
    storedEnergy.value = getStoredValue("energy", null);

    const energyValue = Number(storedEnergy.value?.title) || 1; // Ensure a valid number (avoid NaN / zero)
    finalScore.value = (storedScoreCount.value / energyValue) * 100;
});
</script>