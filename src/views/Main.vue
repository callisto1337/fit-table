<template>
  <b-container class="mt-4 mb-5 pb-5">
    <AllProducts/>
    <NewProduct class="mt-5"/>
    <MyMenu class="mt-5"/>
  </b-container>
</template>

<script>
import NewProduct from '@/components/NewProduct.vue'
import AllProducts from '@/components/AllProducts.vue'
import MyMenu from '@/components/MyMenu.vue'

export default {
  components: {
    NewProduct,
    AllProducts,
    MyMenu
  }
}
</script>
