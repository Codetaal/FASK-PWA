<template>

    <div class="mb-8 text-center group">
        <h2 class="text-3xl font-bold tracking-tight text-miffyWhite">score
        </h2>
        <p class="-mt-1 text-base font-semibold leading-8 text-miffyWhite">~60%</p>
    </div>

    <div class="pb-24">

        <p class="mb-6 text-lg text-center text-miffyWhite">
            What is the <span class="text-xl font-semibold text-miffyYellow">simple present tense</span> of the verb <span class="text-xl font-bold underline text-miffyWhite underline-offset-8 decoration-2 decoration-wavy">lopen</span> in the <span class="text-xl font-semibold text-miffyYellow">jij</span>-form
        </p>

        <input type="text" name="first-name" id="first-name" placeholder="jij ..." autocomplete="given-name" class="block w-full px-3 py-3 text-xl text-center rounded-md bg-miffyWhite/20 outline-gray-300 placeholder:text-white/50 focus:outline-2 focus:-outline-offset-2 focus:outline-white">

        <div class="fixed inset-0 top-auto w-full px-8 py-8 bg-miffyOrange/85">
            <button type="button"
                class="rounded-lg w-full bg-miffyWhite px-3.5 py-2.5 text-sm font-semibold text-miffyOrange hover:translate-y-[2px]">check my answer</button>
        </div>
    </div>


</template>

<script setup>
import { ref } from 'vue'
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import { CheckCircleIcon } from '@heroicons/vue/20/solid'

const mailingLists = [
    { id: 1, title: 'everyday moments', description: 'get familiar with common verbs and simple present tense' },
    { id: 2, title: 'past adventures', description: 'learn how to describe things that already happened' },
    { id: 3, title: 'time travel journey', description: 'perfect your ability to learn about things that have already happened or will happen' },
]

const selectedMailingLists = ref(mailingLists[0])
console.log(selectedMailingLists);
</script>