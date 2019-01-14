<template>
  <div>
    <h1>Новый продукт</h1>
    <form
      @submit.prevent="createProduct()"
      class="mt-4"
    >
      <b-row>
        <b-col>
          <b-form-group label="Название продукта">
            <b-form-input
              v-model="newProduct.title"
            />
          </b-form-group>
        </b-col>
        <b-col cols="2">
          <b-form-group label="Белки">
            <b-form-input
              v-model="newProduct.proteins"
            />
          </b-form-group>
        </b-col>
        <b-col cols="2">
          <b-form-group label="Жиры">
            <b-form-input
              v-model="newProduct.fats"
            />
          </b-form-group>
        </b-col>
        <b-col cols="2">
          <b-form-group label="Углеводы">
            <b-form-input
              v-model="newProduct.carbohydrates"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-alert
        @dismissed="showError = false"
        :show="showError"
        :dismissible="true"
        variant="danger"
      >
        Заполните все поля!
      </b-alert>
      <b-alert
        @dismissed="showError = false"
        :show="successfullyAdded"
        :dismissible="true"
        variant="success"
      >
        Новый товар успешно добавлен!
      </b-alert>
      <b-button
        class="mt-2"
        variant="primary"
        type="submit"
      >
        Добавить
      </b-button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newProduct: {
        title: ``,
        proteins: ``,
        fats: ``,
        carbohydrates: ``
      },
      showError: false,
      successfullyAdded: false
    }
  },

  methods: {
    /**
     * Возвращает true, если хоть одно значение data равно ``.
     * В противном случае возвращает false
     *
     * @param {object} data
     * @returns {boolean}
     */
    checkEmptyFields (data) {
      return Object.values(data).some(field => field === ``)
    },

    /**
     * Очищает ключи входящего объекта
     */
    clearForm (data) {
      console.log(data)
      for (const name in data) {
        data[name] = ``
      }
    },

    /**
     * Создает новый продукт
     */
    createProduct () {
      if (this.checkEmptyFields(this.newProduct)) {
        this.showError = true
        return
      }

      this.showError = false
      this.successfullyAdded = true
      this.$store.commit(`createProduct`, this.newProduct)
      this.$store.commit(`saveProducts`)
      this.clearForm(this.newProduct)
    }
  }
}
</script>
