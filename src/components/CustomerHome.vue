<template>
  <div>
    <v-app>
      <v-main>
        <v-container>
          <v-btn
            depressed
            color="primary"
            to="/purchaseinsert"
            tag="router-link"
            >購入画面</v-btn
          >
          <p></p>
          <v-btn
            depressed
            color="primary"
            to="/purchasehistory"
            tag="router-link"
            >購入履歴</v-btn
          >
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "CustomerHome",
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
  mounted() {
    this.logout();
  },
};
</script>

<style>
</style>