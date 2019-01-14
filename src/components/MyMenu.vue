<template>
  <div>
    <h1>Моё меню</h1>
    <div
      v-if="selectedProducts.length === 0"
      class="mt-4"
    >
      Пока пусто :(
    </div>
    <template v-else>
      <b-row class="mt-4 pb-3">
        <b-col class="font-weight-bold">Название</b-col>
        <b-col cols="2" class="font-weight-bold">БЖУ</b-col>
        <b-col cols="2" class="font-weight-bold">Вес</b-col>
        <b-col cols="2" class="font-weight-bold">Калории</b-col>
        <b-col cols="2" class="font-weight-bold"></b-col>
      </b-row>
      <hr class="m-0">
      <div
        v-for="product of selectedProducts"
        :key="product.id"
      >
        <b-row class="py-2 display-flex align-items-center">
          <b-col>
            {{ product.title }}
          </b-col>
          <b-col cols="2">
            {{ product.proteins }}/{{ product.fats }}/{{ product.carbohydrates }}
          </b-col>
          <b-col cols="2">
            {{ product.weight }}
          </b-col>
          <b-col cols="2">
            {{ totalCalories(product) }}
          </b-col>
          <b-col cols="2">
            <b-button
              @click="removeProduct(product.id)"
              variant="danger"
            >
              Удалить
            </b-button>
          </b-col>
        </b-row>
        <hr class="m-0">
        <b-row class="py-2 display-flex align-items-center">
          <b-col>
            Итого
          </b-col>
        </b-row>
      </div>
    </template>
    <form @submit.prevent="addProduct()">
      <b-row
        v-if="showSelect"
        class="mt-4"
      >
        <b-col>
          <b-form-group label="Название">
            <select
              v-model="selectedProduct"
              class="form-control"
            >
              <option disabled :value="null">
                -- Выберите новый продукт --
              </option>
              <option
                v-for="product of allProducts"
                :key="product.id"
                :value="product"
              >
                {{ product.title }}
              </option>
            </select>
          </b-form-group>
        </b-col>
        <b-col cols="2">
          <b-form-group label="Вес, г.">
            <b-form-input
              v-model="productWeight"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-alert
        :show="showError"
        :dismissible="true"
        variant="danger"
        @dismissed="showError = false"
      >
        Заполните все поля!
      </b-alert>
      <b-button
        v-if="!showSelect"
        @click="showSelect = true"
        variant="primary"
        class="mt-3"
      >
        Добавить
      </b-button>
      <div
        v-if="showSelect"
        class="mt-2"
      >
        <b-button
          variant="primary"
          type="submit"
        >
          Сохранить
        </b-button>
        <b-button
          @click="showSelect = false"
          variant="cancel"
          class="ml-3"
        >
          Отмена
        </b-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showSelect: false,
      selectedProduct: null,
      productWeight: ``,
      showError: false
    }
  },

  computed: {
    allProducts () {
      return this.$store.state.allProducts
    },

    selectedProducts () {
      return this.$store.state.selectedProducts
    }
  },

  methods: {
    /**
     * Ищет свободный id среди уже добавленных товаров, начиная с 0, и возвращает его
     *
     * @param {number} targetId
     * @returns {number}
     */
    getFreeId (targetId = 0) {
      const products = this.$store.state.allProducts
      const result = products.findIndex(product => product.id === targetId)

      if (result === -1) return result

      return this.getFreeId(targetId + 1)
    },

    /**
     * Добавляет выбранный продукт в список выбранных
     */
    addProduct () {
      if (!this.selectedProduct || !this.productWeight) {
        this.showError = true
        return
      }

      this.selectedProduct.weight = this.productWeight
      this.selectedProduct.id = this.getFreeId()

      this.$store.commit(`addSelectedProduct`, this.selectedProduct)
      this.$store.commit(`saveProducts`)

      this.showError = false
      this.showSelect = false
      this.selectedProduct = null
      this.productWeight = ``
    },

    /**
     * Высчитывает количество калорий продукта и возвращает их
     *
     * @param {product} product
     * @returns {number}
     */
    totalCalories (product) {
      const proteins = product.proteins
      const fats = product.fats
      const carbohydrates = product.carbohydrates
      const weight = product.weight

      return Math.round(proteins * 4 + fats * 9 + carbohydrates * 4) * (weight * 0.01)
    },

    /**
     * Удаляет продукт из списка выбранных
     *
     * @param {number} id
     */
    removeProduct (id) {
      const conf = confirm(`Вы уверены, что хотите удалить продукт?`)

      if (conf) this.$store.commit(`removeSelectedProduct`, id)
    }
  }
}
</script>
