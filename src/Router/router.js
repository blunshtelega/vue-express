import Main from "@/Pages/Main";
import {createRouter, createWebHistory} from "vue-router";
// import UserPage from "@/pages/UserPage";
// import About from "@/pages/About";
// import PostIdPage from "@/pages/PostIdPage";
// import PostPageWithStore from "@/pages/PostPageWithStore";
// import PostPageCompositionApi from "@/pages/PostPageCompositionApi";


const routes = [
    {
        path: '/',
        component: Main
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;