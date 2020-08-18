import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        redirect:'/index',
        /*组件懒加载*/
        // component: () => import('../views/Index.vue')
    },
    {
        path: '/login',
        /*组件懒加载*/
        component: () => import('../views/Login.vue')
    },
    {
        path: '/index',
        /*组件懒加载*/
        component: () => import('../views/Index.vue'),
        children: [
            {
                path: '/',
                name: 'LoginTypeSelect',
                component: () => import('../views/LoginTypeSelect.vue')
            },
            {
                path: '/repoSelect',
                name: 'RepoSelect',
                component: () => import('../views/RepoSelect.vue')
            },
            {
                path: '/platformSelect',
                name: 'PlatformSelect',
                component: () => import('../views/PlatformSelect.vue')
            },
            {
                path: '/corporationManagerLogin',
                name: 'CorporationManagerLogin',
                component: () => import('../views/CorporationManagerLogin.vue')
            },
            ]
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        children: [
            {
                path: '/',
                name: 'LinkedRepo',
                component: () => import('../components/LinkedRepo.vue')
            },
            {
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
            },
            {
                path: '/rootManager',
                name: 'RootManager',
                component: () => import('../components/RootManager.vue')
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
        component: () => import('../views/SignCla.vue')
    },
    {
        path: '/verifyPage',
        name: 'VerifyPage',
        component: () => import('../views/VerifyPage.vue')
    },
    {
        path: '/findPwd',
        name: 'FindPwd',
        component: () => import('../views/FindPwd.vue')
    },
    {
        path: '/emailVerify',
        name: 'EmailVerify',
        component: () => import('../views/EmailVerify.vue')
    },
    {
        path: '/createCLA2',
        name: 'CreateCLA2',
        component: () => import('../views/CreateCLA2.vue')
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
