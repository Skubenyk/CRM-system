<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Власна бухгалтерія</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{ invalid: isEmailInvalid }"
          @input="validateEmail"
        />
        <label for="email">Email</label>
        <small class="helper-text invalid" v-if="isEmailInvalid">Email</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model="password"
          :class="{ invalid: isPasswordInvalid }"
          @input="validatePassword"
        />
        <label for="password">Пароль</label>
        <small class="helper-text invalid" v-if="isPasswordInvalid"
          >Password</small
        >
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{ invalid: isNameInvalid }"
          @input="validateName"
        />
        <label for="name">Ім'я</label>
        <small class="helper-text invalid" v-if="isNameInvalid">Name</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="isAgreed" />
          <span>З правилами згоден</span>
        </label>
        <small class="helper-text invalid" v-if="!isAgreed"
          >( Ви повинні погодитися з правилами! )</small
        >
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зареєструватися
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Вже є акаунт?
        <router-link to="/login">Увійти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
export default {
  name: "RegisterView",
  data() {
    return {
      email: "",
      password: "",
      name: "",
      isAgreed: false,
      isEmailInvalid: false,
      isPasswordInvalid: false,
      isNameInvalid: false,
    };
  },
  methods: {
    validateEmail() {
      if (!this.email) {
        this.isEmailInvalid = true;
      } else if (!this.email.includes("@")) {
        this.isEmailInvalid = true;
      } else {
        this.isEmailInvalid = false;
      }
    },
    validatePassword() {
      if (!this.password) {
        this.isPasswordInvalid = true;
      } else if (this.password.length < 7) {
        this.isPasswordInvalid = true;
      } else {
        this.isPasswordInvalid = false;
      }
    },
    validateName() {
      if (!this.name) {
        this.isNameInvalid = true;
      } else if (this.name.length < 3) {
        this.isNameInvalid = true;
      } else {
        this.isNameInvalid = false;
      }
    },
    async submitHandler() {
      this.validateEmail();
      this.validatePassword();
      this.validateName();

      if (
        !this.isAgreed ||
        this.isEmailInvalid ||
        this.isPasswordInvalid ||
        this.isNameInvalid
      ) {
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      };

      try {
        await this.$store.dispatch("register", formData);
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
