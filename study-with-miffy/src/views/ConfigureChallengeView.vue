<template>

    <div class="mb-8 text-center group">
        <h2 class="text-3xl font-bold tracking-tight text-miffyWhite">energy check</h2>
        <p class="text-base font-semibold leading-6 text-miffyWhite">how many questions can you handle?</p>
    </div>

    <div>
        <RadioGroup v-model="selectedRadioOption">
            <div class="grid grid-cols-2 mt-4 mb-4 gap-y-6 gap-x-4">
                <RadioGroupOption as="template" v-for="option in radioOptions" :key="option.id" :value="option"
                    v-slot="{ checked, active }">
                    <div
                        :class="[checked ? 'border-transparent bg-miffyWhite text-miffyOrange border-miffyWhite ring-0 ring-miffyWhite' : 'border-miffyWhite bg-miffyOrange ', active ? '' : '', 'relative flex cursor-pointer rounded-lg border-2 px-4 py-10 focus:outline-none overflow-hidden']">
                        <span class="flex flex-1">
                            <RadioGroupLabel as="span" class="flex text-lg font-semibold gap-x-2 ">{{
                                option.title }}
                                <CheckCircleIcon :class="[!checked ? 'invisible' : '', 'h-5 w-5 mt-1']"
                                    aria-hidden="true" />
                            </RadioGroupLabel>
                        </span>
                        <span
                            :class="[active ? 'border' : 'border-2', checked ? 'border-miffyWhite' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-lg']"
                            aria-hidden="true" />

                        <img src="/images/flower.png" class="absolute pointer-events-none select-none"
                            :style="{ width: `${option.factor * 48}px`, right: `-${option.factor * 18}px`, bottom: `-${option.factor / 0.08}px` }">
                    </div>
                </RadioGroupOption>
            </div>
        </RadioGroup>

        <div class="sticky inset-0 top-auto w-full py-6 bg-miffyOrange/85">
            <router-link to="/exercise" class="w-full">
                <button type="button"
                    class="relative overflow-hidden  inline-flex items-center justify-center text-center gap-x-2 rounded-lg w-full bg-miffyWhite px-4 py-3.5 text-base font-semibold text-miffyOrange focus:ring-2 focus:ring-miffyWhite focus:outline-none">
                    <span class="flex-1">let's study!</span>
                </button>
            </router-link>
        </div>
    </div>


</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import { CheckCircleIcon } from '@heroicons/vue/20/solid'
import { getStoredValue } from "/src/utils/storage";

const radioOptions = [
    { id: 1, title: '10', description: 'questions', factor: 1.2 },
    { id: 2, title: '25', description: 'questions', factor: 1.8 },
    { id: 3, title: '50', description: 'questions', factor: 2.4 },
    { id: 4, title: '100', description: 'questions', factor: 3.6 },
]
const selectedRadioOption = ref(radioOptions[1]);

onMounted(() => {
    const storedOption = getStoredValue("energy", null);
    if (storedOption) {
        const matchedOption = radioOptions.find(option => option.id === storedOption.id);
        if (matchedOption) {
            selectedRadioOption.value = matchedOption;
        }
    }
    else {
        localStorage.setItem("energy", JSON.stringify(selectedRadioOption.value));
    }
});

watch(selectedRadioOption, (newValue) => {
    localStorage.setItem("energy", JSON.stringify(newValue));
});

// Reset
localStorage.setItem("questionCount", JSON.stringify(1));
localStorage.setItem("scoreCount", JSON.stringify(0));
</script>