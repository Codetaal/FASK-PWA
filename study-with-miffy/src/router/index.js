import { createRouter, createWebHistory } from "vue-router";
import ConfigureLevelView from "../views/ConfigureLevelView.vue";
import ConfigureChallengeView from "../views/ConfigureChallengeView.vue";
import ExerciseView from "../views/ExerciseView.vue";
import ResultsView from "../views/ResultsView.vue";
import NotFoundView from "../views/NotFoundView.vue";

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
        // {
        //     path: "/webtoon/:titleNo",
        //     name: "WebtoonDetails",
        //     component: WebtoonDetailsView,
        //     props: true,
        // },
        // {
        //     path: "/webtoon/:titleNo/:episodeNo",
        //     name: "WebtoonEpisode",
        //     component: WebtoonEpisodeView,
        //     props: true,
        // },
        // {
        //     path: "/not-found",
        //     name: "404",
        //     component: NotFoundView,
        // },
        {
            path: "/:pathMatch(.*)*",
            // redirect: "/not-found",
            name: "404",
            component: NotFoundView,
        },
    ],
});

export default router;
