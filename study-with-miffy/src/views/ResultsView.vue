<template>

    <div class="mb-8 text-center group">
        <h2 class="text-3xl font-bold tracking-tight text-miffyWhite">your score</h2>
        <p class="text-base font-semibold leading-6 text-miffyWhite"></p>
    </div>

    <p class="px-4 mb-10 text-[6rem] font-normal text-center text-miffyWhite">
        <!-- <img src="/images/miffy-cheering.png" class="inline-block w-[128px]"> -->
        <span class="block">
            {{ score.toFixed(0) }}<span class="text-lg"> %</span>
        </span>
    </p>

    <div class="fixed bottom-2 right-8 left-8">
        <div>
            <div class="sticky inset-0 top-auto w-full py-6 bg-miffyOrange/85">
                <button type="button"
                    class="relative overflow-hidden  inline-flex items-center justify-center text-center gap-x-2 rounded-lg w-full bg-miffyWhite px-4 py-3.5 text-lg font-semibold text-miffyOrange focus:ring-2 focus:ring-miffyWhite focus:outline-none"
                    @click="goToPage('/')">
                    another round!
                </button>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const storedQuestionCount = ref(0);
const storedScoreCount = ref(0);
const storedEnergy = ref(0);

const score = ref(0);

onMounted(async () => {
    try {
        // Retrieve stored values with fallback defaults
        storedQuestionCount.value = getStoredValue("questionCount", null);
        storedScoreCount.value = getStoredValue("scoreCount", null);
        storedEnergy.value = getStoredValue("energy", null);

        score.value = storedScoreCount.value / Number(storedEnergy.value.title) * 100;
        console.log(score.value);

    } catch (error) {
        console.error("Error during initialization:", error);
    }
});

// Helper function to safely retrieve localStorage values
const getStoredValue = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
        try {
            return JSON.parse(storedValue);
        } catch (error) {
            console.warn(`Error parsing localStorage key "${key}":`, error);
            return defaultValue;
        }
    }
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
};

const goToPage = (path) => {
    router.push(path);
};
</script>