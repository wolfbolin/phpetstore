import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Animal from '@/components/animal'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/animal',
      name: 'Animal',
      component: Animal
    }
  ]
})
