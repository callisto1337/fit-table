import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allProducts: JSON.parse(localStorage.getItem(`allProducts`)) || [],
    selectedProducts: JSON.parse(localStorage.getItem(`selectedProducts`)) || []
  },

  mutations: {
    addProduct (state, data) {
      state.allProducts.push(data)
    },

    addSelectedProduct (state, data) {
      state.selectedProducts.push(data)
    },

    removeSelectedProduct (state, id) {
      const productIndex = state.selectedProducts.findIndex(product => {
        return product.id === id
      })

      state.selectedProducts.splice(productIndex)
    },

    saveProducts (state) {
      localStorage.setItem(`addProduct`, JSON.stringify(state.addProduct))
      localStorage.setItem(`selectedProducts`, JSON.stringify(state.selectedProducts))
    }
  },

  actions: {

  }
})
