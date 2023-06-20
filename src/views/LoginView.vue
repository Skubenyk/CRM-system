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
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Увійти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Немає акаунта?
        <router-link to="/register">Зареєструватися</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import messages from "@/utils/messages";
export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      isEmailInvalid: false,
      isPasswordInvalid: false,
    };
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
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
    async submitHandler() {
      this.validateEmail();
      this.validatePassword();

      if (this.isEmailInvalid || this.isPasswordInvalid) {
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
      };

      try {
        await this.$store.dispatch("login", formData);
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
