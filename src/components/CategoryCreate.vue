<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Створити</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: titleError }"
          />
          <label for="name">Назва</label>
          <span class="helper-text invalid" v-if="titleError">
            Введіть назву категорії
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: limitError }"
          />
          <label for="limit">Ліміт</label>
          <span class="helper-text invalid" v-if="limitError">
            Мінімальне значення повинно бути не менше {{ minLimitValue }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Створити
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import M from "materialize-css";

export default {
  data() {
    return {
      title: "",
      limit: 100,
      titleError: false,
      limitError: false,
      minLimitValue: 100,
    };
  },
  mounted() {
    M.updateTextFields();
  },
  methods: {
    async submitHandler() {
      this.titleError = this.title === "";
      this.limitError = this.limit < this.minLimitValue;

      if (this.titleError || this.limitError) {
        return;
      }

      try {
        const category = await this.$store.dispatch("createCategory", {
          title: this.title,
          limit: this.limit,
        });
        console.log(category);
        this.title = "";
        this.limit = 100;
        this.$emit("created", category);
      } catch (error) {
        console.log("Error", error);
      }
    },
  },
};
</script>
