import VueRouter from 'vue-router'
import Home from "@/components/pages/Home";
import Login from "@/components/pages/Login";
import Register from "@/components/pages/Register";
import PassResetRequest from "@/components/pages/PassResetRequest";
import PassResetConfirm from "@/components/pages/PassResetConfirm";

export default new VueRouter({
    routes:[
        {
            path: '/',
            component: Home
        },
        {
            path: '/login/',
            component: Login
        },
        {
            path: '/register/',
            component: Register
        },
        {
            path: '/pass_reset/',
            component: PassResetRequest
        },
        {
            path: '/password/reset/confirm/:uid/:token/',
            component: PassResetConfirm
        }
    ],
    mode: 'history'
})
