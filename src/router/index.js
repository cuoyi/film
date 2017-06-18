import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Detail from '@/components/detail'
import About from '@/components/about'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/Detail',
            name: 'Detail',
            component: Detail
        },
        {
            path: '/About',
            name: 'About',
            component: About
        }
    ]
})