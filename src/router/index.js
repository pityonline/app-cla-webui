import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        /*组件懒加载*/
        component: () => import('../views/Login.vue')
    },
    {
        path: '/login',
        /*组件懒加载*/
        component: () => import('../views/Login.vue')
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        children: [{
            path: '/linkedRepo',
            name: 'LinkedRepo',
            component: () => import('../components/LinkedRepo.vue')
        },
            {
                path: '/signedRepoLogin',
                name: 'SignedRepoLogin',
                component: () => import('../components/SignedRepoLogin.vue')
            },
            {
                path: '/signedRepo',
                name: 'SignedRepo',
                component: () => import('../components/SignedRepo.vue')
            },]
    },
    {
        path: '/config',
        name: 'Config',
        component: () => import('../views/Config.vue')
    },
    {
        path: '/createCLA',
        name: 'CreateCLA',
        component: () => import('../views/CreateCLA.vue')
    },
    {
        path: '/createMetadata',
        name: 'CreateMetadata',
        component: () => import('../views/CreateMetadata.vue')
    },
    {
        path: '/checkCLA',
        name: 'CheckCLA',
        component: () => import('../views/CheckCLA.vue')
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
