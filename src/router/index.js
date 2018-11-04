import Vue from 'vue'
import Router from 'vue-router'
import StoreProductList from '@/components/StoreProductList'
import StoreProduct from '@/components/StoreProduct'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StoreProductList',
      component: StoreProductList
    },
    {
      path: '/StoreProduct',
      name: 'StoreProduct',
      component: StoreProduct
    }
  ]
})
