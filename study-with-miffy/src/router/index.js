import { createRouter, createWebHistory } from "vue-router";
import ConfigureLevelView from "../views/ConfigureLevelView.vue";
import ConfigureChallengeView from "../views/ConfigureChallengeView.vue";
import ExerciseView from "../views/ExerciseView.vue";
import ResultsView from "../views/ResultsView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import { getStoredValue } from "/src/utils/storage";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    strict: true,
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 }
    },
    routes: [
        {
            path: "/",
            name: "home",
            component: ConfigureLevelView,
        },
        {
            path: "/configure-level",
            name: "configureLevel",
            component: ConfigureLevelView,
            props: true,
        },
        {
            path: "/configure-challenge",
            name: "configureChallenge",
            component: ConfigureChallengeView,
            props: true,
        },
        {
            path: "/exercise",
            name: "exercise",
            component: ExerciseView,
            props: true,
        },
        {
            path: "/results",
            name: "results",
            component: ResultsView,
            props: true,
        },
        {
            path: "/:pathMatch(.*)*",
            // redirect: "/not-found",
            name: "404",
            component: NotFoundView,
        },
    ],
});

// 🌍 Global Navigation Guard
router.beforeEach((to, from, next) => {
    const storedConfidence = getStoredValue("confidence", null);
    const storedEnergy = getStoredValue("energy", null);
    const storedQuestionCount = getStoredValue("questionCount", null);
    const storedScoreCount = getStoredValue("scoreCount", null);

    if (to.path !== "/") {
        if (to.path === "/exercise" && (!storedConfidence || !storedEnergy)) {
            next("/");
            // }
            // else if (to.path === "/results" && (!storedConfidence || !storedEnergy || storedScoreCount === null)) {
            //     next("/");
        } else {
            next();
        }
    } else {
        next();
    }
});


export default router;
