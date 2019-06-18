import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import CreateCar from '@/components/CreateCar'
import ChangeCarOwner from '@/components/ChangeCarOwner'
import QueryAll from '@/components/QueryAll'
import QueryWithQueryString from '@/components/QueryWithQueryString'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/createCar',
      name: 'CreateCar',
      component: CreateCar
    },
    {
      path: '/changeCarOwner',
      name: 'ChangeCarOwner',
      component: ChangeCarOwner
    },
    {
      path: '/queryAll',
      name: 'QueryAll',
      component: QueryAll
    },
    {
      path: '/queryWithQueryString',
      name: 'QueryWithQueryString',
      component: QueryWithQueryString
    }
  ]
})
