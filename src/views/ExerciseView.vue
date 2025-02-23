<template>

    <div class="mb-8 text-center group">
        <h2 class="text-3xl font-bold tracking-tight text-miffyWhite">{{ storedConfidence.title }} lesson</h2>
        <p class="text-base font-semibold leading-6 text-miffyWhite">{{ questionCount }} / {{ storedEnergy.title }}
            questions left</p>
    </div>

    <p class="px-4 mb-10 text-2xl font-normal leading-8 text-center text-miffyWhite" v-html="questionHtml"></p>

    <div class="fixed bottom-2 right-8 left-8">
        <div>
            <div class="relative overflow-hidden border-2 rounded-lg border-miffyWhite">
                <input v-model="userAnswer" type="text" name="answer" id="answer" autocapitalize="none"
                    autocomplete="off" :placeholder="randomFormKey + ' ...'"
                    class="block w-full px-3 py-6 mb-0 text-xl font-normal text-center bg-transparent border-transparent outline-none text-miffyWhite focus:outline-0 focus:bg-miffyWhite/10 placeholder:text-miffyWhite/70">
                <img v-if="storedConfidence.image" :src="storedConfidence.image"
                    class="absolute translate-x-1/2 right-2 -bottom-2 w-[72px] pointer-events-none select-none">
            </div>

            <div class="sticky inset-0 top-auto w-full py-6 bg-miffyOrange/85">
                <button type="button"
                    class="relative overflow-hidden inline-flex items-center justify-center text-center gap-x-2 rounded-lg w-full bg-miffyWhite px-4 py-3.5 text-base font-semibold text-miffyOrange focus:ring-2 focus:ring-miffyWhite focus:outline-none"
                    @click="checkAnswer()">
                    check
                </button>
            </div>
        </div>
    </div>

    <TransitionRoot as="template" :show="isModalOpen">
        <Dialog as="div" class="relative z-10">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 transition-opacity bg-miffyOrange/70" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex items-end justify-center min-h-full p-4 text-center">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4"
                        enter-to="opacity-100 translate-y-0" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0" leave-to="opacity-0 translate-y-4">
                        <DialogPanel
                            class="relative w-full px-4 pt-6 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl">
                            <div>
                                <div class="px-4 mt-3 text-center">
                                    <p class="text-sm" v-html="answerExplanationHtml"></p>
                                </div>
                            </div>
                            <div class="mt-5">
                                <button type="button"
                                    class="relative overflow-hidden inline-flex items-center justify-center text-center gap-x-2 rounded-lg w-full px-4 py-3.5 text-base font-semibold text-miffyWhite bg-miffyOrange focus:ring-2 focus:ring-miffyWhite focus:outline-none"
                                    @click="loadQuestion()">okay, next!</button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>


</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { getStoredValue } from '/src/utils/storage';

const router = useRouter();
const data = ref([]);
const storedConfidence = ref({});
const storedEnergy = ref({});
const questionHtml = ref(`...`);
const answerExplanationHtml = ref(`...`);
const userAnswer = ref('');
const randomFormKey = ref('');
const correctAnswer = ref('');
const correctAnswerShort = ref('');
const isQuestionModeActive = ref(true);
const inputStatus = ref('');
const questionCount = ref(1);
const scoreCount = ref(1);
const isModalOpen = ref(false);

watch(questionCount, (newValue) => {
    localStorage.setItem("questionCount", JSON.stringify(newValue));
});

watch(scoreCount, (newValue) => {
    localStorage.setItem("scoreCount", JSON.stringify(newValue));
});

onMounted(async () => {
    try {
        // Retrieve stored values with fallback defaults
        storedConfidence.value = getStoredValue("confidence", null);
        storedEnergy.value = getStoredValue("energy", null);

        // If either value is missing, redirect to home
        if (!storedConfidence.value || !storedEnergy.value) {
            router.push('/');
            return;
        }

        questionCount.value = getStoredValue("questionCount", 1);
        scoreCount.value = getStoredValue("scoreCount", 0);

        // Fetch data.json
        const response = await fetch(import.meta.env.BASE_URL + 'json/data.json'); // Ensure correct path
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        data.value = await response.json();
        loadQuestion();

    } catch (error) {
        console.error("Error during initialization:", error);
    }
});

const loadQuestion = () => {
    isQuestionModeActive.value = true;
    isModalOpen.value = false;
    userAnswer.value = '';

    if (!data.value || data.value.length === 0) {
        console.error("No verbs available.");
        return;
    }

    if (questionCount.value >= Number(storedEnergy.value.title)) {
        router.push('/results');
        return;
    }

    const selectedConjugations = getSelectedConjugations(storedConfidence.id);
    const randomVerb = getRandomItem(data.value);

    const randomConjugations = randomVerb.conjugations.filter(conjugation =>
        selectedConjugations.includes(conjugation.abbreviation)
    );

    if (randomConjugations.length === 0) {
        console.error("No matching conjugations found.");
        return;
    }

    const randomConjugation = getRandomItem(randomConjugations);
    const formKeys = Object.keys(randomConjugation.forms);

    if (formKeys.length === 0) {
        console.error("No forms found for selected conjugation.");
        return;
    }

    randomFormKey.value = getRandomItem(formKeys);
    correctAnswer.value = randomConjugation.forms[randomFormKey.value];
    correctAnswerShort.value = correctAnswer.value.replace(`${randomFormKey.value} `, '').toLowerCase();

    questionHtml.value = generateQuestionHtml(randomConjugation, randomVerb);
};

// Helper function to get a random item from an array
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Helper function to determine selected conjugations based on confidence level
const getSelectedConjugations = (confidenceId) => {
    switch (confidenceId) {
        case 2: return ['ovt', 'vvt', 'ottt', 'vttt'];
        case 3: return ['ottt', 'vttt', 'ovtt', 'vvtt'];
        default: return ['ott', 'vtt'];
    }
};

// Helper function to generate question HTML
const generateQuestionHtml = (conjugation, verb) => `
    What is the <span class="italic text-miffyYellow">${conjugation.label.en}</span> of the verb 
    <span class="font-semibold text-miffyYellow">${verb.verb}</span> 
    in the <span class="italic text-miffyYellow">${randomFormKey.value}</span>-form?
`;


const checkAnswer = () => {
    userAnswer.value = userAnswer.value.trim().toLowerCase();
    if (!userAnswer.value) return false;

    questionCount.value++;
    isQuestionModeActive.value = false;
    isModalOpen.value = true;

    const isCorrect = userAnswer.value === correctAnswer.value || userAnswer.value === correctAnswerShort.value;
    const isAlmostCorrect = levenshteinDistance(userAnswer.value, correctAnswer.value) <= 1
        || levenshteinDistance(userAnswer.value, correctAnswerShort.value) <= 1;

    if (isCorrect) {
        inputStatus.value = 'success';
        scoreCount.value++;
        answerExplanationHtml.value = getAnswerExplanation('success', correctAnswerShort.value);
    } else if (isAlmostCorrect) {
        inputStatus.value = 'warning';
        answerExplanationHtml.value = getAnswerExplanation('warning', correctAnswerShort.value, userAnswer.value);
    } else {
        inputStatus.value = 'error';
        answerExplanationHtml.value = getAnswerExplanation('error', correctAnswerShort.value, userAnswer.value);
    }

};

const getAnswerExplanation = (status, correct, user = '') => {
    const images = {
        success: import.meta.env.BASE_URL + 'images/miffy-cheering.png',
        warning: import.meta.env.BASE_URL + 'images/miffy-peeking.png',
        error: import.meta.env.BASE_URL + 'images/miffy-peeking.png',
    };

    const messages = {
        success: `That is correct!`,
        warning: `Almost! The correct answer is:`,
        error: `Too bad! The correct answer is:`,
    };

    return `
        <img src="${images[status]}" class="inline-block w-[128px]">
        <div class="pt-2">
            <h3 class="text-base font-normal leading-6 text-miffyBlack/80">
                ${messages[status]} 
                <span class="block mt-0 text-xl font-semibold ${status === 'success' ? 'text-miffyGreen' : 'text-miffyOrange'}">
                    (${randomFormKey.value}) ${correct}
                </span>
            </h3>
            ${user ? `<span class="block mt-2 text-xs text-miffyBlack/80">Your answer: ${user}</span>` : ''}
        </div>
    `;
};

function levenshteinDistance(a, b) {
    const tmp = [];
    let i, j;
    for (i = 0; i <= a.length; i++) {
        tmp[i] = [i];
    }
    for (j = 0; j <= b.length; j++) {
        tmp[0][j] = j;
    }
    for (i = 1; i <= a.length; i++) {
        for (j = 1; j <= b.length; j++) {
            tmp[i][j] = Math.min(
                tmp[i - 1][j] + 1,
                tmp[i][j - 1] + 1,
                tmp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
            )
        }
    }
    return tmp[a.length][b.length];
}
</script>