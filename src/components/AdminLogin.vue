<template>
  <div>
    <v-container>
      <div v-show="!LoginStatus">
        <v-text-field
          prepend-icon="mdi-account-circle"
          label="ユーザID"
          v-model="user_id"
        />
        <v-text-field
          v-bind:type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          prepend-icon="mdi-lock"
          v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          label="パスワード"
          v-model="password"
        />
        <v-btn class="info" @click="login">ログイン</v-btn>
        <p></p>
      </div>

      <div v-show="LoginStatus">
        <v-btn
          depressed
          color="primary"
          to="/productmanagement"
          tag="router-link"
          >商品一覧</v-btn
        >
        <p></p>
        <v-btn depressed color="primary" to="/productinsert" tag="router-link"
          >商品管理</v-btn
        >
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "AdminLogin",
  data() {
    return {
      showPassword: false,
      user_id: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", {
        user_id: this.user_id,
        password: this.password,
      });
    },
  },
  computed: {
    LoginStatus() {
      return this.$store.state.loginStatus;
    },
  },
};
</script>

<style>
</style>