<template>
  <div>
    <b-button
      @click="showModal"
      class="mt-2"
      variant="info"
    >
      Все продукты
    </b-button>
    <b-modal
      size="lg"
      ref="allProducts"
      hide-footer
      title="Все продукты"
    >
      <b-row class="mb-2">
        <b-col class="font-weight-bold">Название</b-col>
        <b-col class="font-weight-bold">Белки</b-col>
        <b-col class="font-weight-bold">Жиры</b-col>
        <b-col class="font-weight-bold">Углеводы</b-col>
      </b-row>
      <hr>
      <div
        class="mb-2"
        v-for="product of allProducts"
        :key="product.id"
      >
        <b-row>
          <b-col>
            {{ product.title }}
          </b-col>
          <b-col>
            {{ product.proteins }}
          </b-col>
          <b-col>
            {{ product.fats }}
          </b-col>
          <b-col>
            {{ product.carbohydrates }}
          </b-col>
        </b-row>
        <hr>
      </div>
      <div v-if="allProducts.length === 0">
        Нет добавленных продуктов :(
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  computed: {
    allProducts () {
      return this.$store.state.allProducts
    }
  },

  methods: {
    showModal () {
      this.$refs.allProducts.show()
    },

    hideModal () {
      this.$refs.allProducts.hide()
    }
  }
}
</script>
