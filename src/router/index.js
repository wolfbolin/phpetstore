import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Select from '@/components/select'
import Animal from '@/components/animal'
import Cart from '@/components/cart'
import Pick from '@/components/pick'
import Order from '@/components/order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/select',
      name: 'Select',
      component: Select
    },
    {
      path: '/animal',
      name: 'Animal',
      component: Animal
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/pick',
      name: 'Pick',
      component: Pick
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    }
  ]
})
