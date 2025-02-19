<template>
    <!-- Global notification live region, render this permanently at the end of the document -->
    <!-- <div aria-live="assertive" class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:items-start sm:p-6"> -->
    <div class="flex flex-col items-center w-full" v-if="show">
        <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
        <transition enter-active-class="transition duration-300 ease-out transform"
            enter-from-class="translate-y-2 opacity-0" enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <div class="flex w-full shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5 bg-miffyWhite">
                <div class="flex-1 w-0 px-4 py-6">
                    <div class="flex items-center justify-between">
                        <div class="flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                class="size-6 text-miffyOrange">
                                <path
                                    d="M6 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6ZM15.75 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3H18a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-2.25ZM6 12.75a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3v-2.25a3 3 0 0 0-3-3H6ZM17.625 13.5a.75.75 0 0 0-1.5 0v2.625H13.5a.75.75 0 0 0 0 1.5h2.625v2.625a.75.75 0 0 0 1.5 0v-2.625h2.625a.75.75 0 0 0 0-1.5h-2.625V13.5Z" />
                            </svg>
                        </div>
                        <p class="flex-1 w-0 ml-3 text-sm font-semibold text-gray-900 hover:text-miffyOrange"
                            @click="installApp">
                            Add to your Home Screen
                        </p>
                        <button type="button" @click="closeBanner"
                            class="flex items-center justify-center rounded-md bg-miffyWhite text-miffyBlack">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                class="size-5">
                                <path fill-rule="evenodd"
                                    d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
    <!-- </div> -->
</template>

<script setup>
import { ref, onMounted } from "vue";

const deferredPrompt = ref(null);
const show = ref(false);

onMounted(() => {
    const showBanner = localStorage.getItem("showBanner");
    if (showBanner) {
        show.value = false;
    } else {
        window.addEventListener("beforeinstallprompt", (event) => {
            event.preventDefault();
            deferredPrompt.value = event;
            show.value = true;
        });
    }
});

const installApp = async () => {
    if (!deferredPrompt.value) return;

    deferredPrompt.value.prompt();

    const { outcome } = await deferredPrompt.value.userChoice;
    if (outcome === "accepted") {
        // console.log("User installed the app");
    } else {
        // console.log("User dismissed the install prompt");
    }

    deferredPrompt.value = null;
    show.value = false;
};

const closeBanner = () => {
    show.value = false;
    localStorage.setItem("showBanner", JSON.stringify(show.value));
}

</script>