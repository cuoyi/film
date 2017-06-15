import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Detail from '@/components/detail'
import checkbox from '@/components/checkbox'

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
            path: '/checkbox',
            name: 'checkbox',
            component: checkbox
        }
    ]
})