<template>

    <div class="mb-8 text-center group">
        <h2 class="text-3xl font-bold tracking-tight text-miffyWhite">confidence check</h2>
        <p class="text-base font-semibold leading-6 text-miffyWhite">how are your feeling today?</p>
    </div>

    <div>
        <RadioGroup v-model="selectedRadioOption">
            <div class="grid grid-cols-1 mt-4 mb-4 gap-y-6">
                <RadioGroupOption as="template" v-for="option in radioOptions" :key="option.id" :value="option"
                    v-slot="{ checked, active }">
                    <div class="relative overflow-hidden"
                        :class="[checked ? 'border-transparent bg-miffyWhite text-miffyOrange border-miffyWhite ring-0 ring-miffyWhite' : 'border-miffyWhite bg-miffyOrange ', active ? '' : '', 'relative flex cursor-pointer rounded-lg border-2 p-4 focus:outline-none']">
                        <span class="flex flex-1 pr-10">
                            <span class="flex flex-col">
                                <RadioGroupLabel as="span" class="flex gap-2 text-lg font-semibold ">{{
                                    option.title }}
                                    <CheckCircleIcon :class="[!checked ? 'invisible' : '', 'h-5 w-5 mt-1']"
                                        aria-hidden="true" />
                                </RadioGroupLabel>
                                <RadioGroupDescription as="span" class="flex items-center mt-1 text-sm ">{{
                                    option.description }}</RadioGroupDescription>
                            </span>
                        </span>
                        <span
                            :class="[active ? 'border' : 'border-2', checked ? 'border-miffyWhite' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-lg']"
                            aria-hidden="true" />
                        <div class="absolute translate-x-1/2 right-2 -bottom-2">
                            <img :src="option.image" class="max-w-[78px] max-h-[78px] pointer-events-none" />
                        </div>
                    </div>
                </RadioGroupOption>
            </div>
        </RadioGroup>

        <div class="sticky inset-0 top-auto w-full py-6 bg-miffyOrange/75">
            <button type="button"
                class="relative overflow-hidden inline-flex items-center justify-center text-center gap-x-1 rounded-lg w-full bg-miffyWhite px-4 py-3.5 text-base font-semibold text-miffyOrange focus:ring-2 focus:ring-miffyWhite focus:outline-none"
                @click="goToPage('/configure-challenge')">
                <span class="">next step</span>
            </button>
        </div>
    </div>

</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import { ArrowRightCircleIcon, CheckCircleIcon } from '@heroicons/vue/20/solid'

const radioOptions = [
    { id: 1, title: "shy", description: "get familiar with common verbs and simple present tense", image: "/images/sheep.png" },
    { id: 2, title: "curious", description: "explore ways to describe things that already happened", image: "/images/frog.png" },
    { id: 3, title: "brave", description: "master your ability to learn about things that already happened", image: "/images/lion.png" }
];
const selectedRadioOption = ref(radioOptions[1]);
const router = useRouter();

onMounted(() => {
    const storedOption = localStorage.getItem("confidence");
    if (storedOption) {
        const parsedOption = JSON.parse(storedOption);
        const matchedOption = radioOptions.find(option => option.id === parsedOption.id);
        if (matchedOption) {
            selectedRadioOption.value = matchedOption;
        }
    }
    else {
        localStorage.setItem("confidence", JSON.stringify(selectedRadioOption.value));
    }
});

watch(selectedRadioOption, (newValue) => {
    // console.log(newValue);
    localStorage.setItem("confidence", JSON.stringify(newValue));
});

const goToPage = (path) => {
    router.push(path);
};
</script>