import Vue from 'vue'
import HelloWorld from '@/components/HelloStoreProductListWorld'

describe('StoreProductList.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(StoreProductList)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .toEqual('Welcome to Your Vue.js App')
  })
})
