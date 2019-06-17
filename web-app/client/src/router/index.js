import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import CreateCar from '@/components/CreateCar'
import ChangeCarOwner from '@/components/ChangeCarOwner'
import QueryAllCars from '@/components/QueryAllCars'

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
      path: '/queryAllCars',
      name: 'QueryAllCars',
      component: QueryAllCars
    }
  ]
})
