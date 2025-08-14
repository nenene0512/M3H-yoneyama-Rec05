<template>
  <div>
    <table class="shopping-cart-table">
      <thead>
        <tr>
          <th>商品コード</th>
          <th>商品名</th>
          <th>金額</th>
          <th>個数</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in shoppingCart" :key="item.product_code">
          <td>{{ item.product_code }}</td>
          <td>{{ item.product_name }}</td>
          <td>{{ item.unit_price }}</td>
          <td>{{ item.quantity }}</td>
        </tr>
        <tr v-if="!shoppingCart.length">
          <td colspan="4" class="text-center">カートに商品がありません</td>
        </tr>
      </tbody>
    </table>
    <div>合計金額:{{ totalPrice }}円</div>
    <v-btn elevation="2" @click="addPurchasehistory">確定</v-btn>
  </div>
</template>

<script>
export default {
  name: "CheckOrder",
  computed: {
    shoppingCart() {
      console.log(this.$store.state.shoppingCart);
      return this.$store.state.shoppingCart;
    },
    totalPrice() {
      return this.shoppingCart.reduce(function (sum, item) {
        return sum + item.unit_price * item.quantity;
      }, 0);
    },
    ShoppingCartJson() {
      return this.$store.getters.getShoppingCartJson;
    },
  },
  methods: {
    async addPurchasehistory() {
      try {
        await this.$store.dispatch("addPurchasehistory", this.ShoppingCartJson);
        this.$store.commit("CLEAR_SHOPPINGCART");
        console.log("購入完了、カートを空にしました");
      } catch (error) {
        console.error("購入処理に失敗しました:", error);
      }
    },
    
  },
};
</script>

<style scoped>
.shopping-cart-table {
  width: 100%;
  border-collapse: collapse;
}
.shopping-cart-table th,
.shopping-cart-table td {
  border: 1px solid #ddd;
  padding: 8px;
}
.shopping-cart-table th {
  background-color: #f2f2f2;
}
.text-center {
  text-align: center;
}
</style>
