<template>
  <div>
    <v-select
      label="日付を選択"
      :items="purchasesdate"
      v-model="selectedDate"
    ></v-select>

    <v-btn @click="visible = !visible"> 表示する </v-btn>

    <div v-if="visible && selectedList.length">
      <table class="history-table">
        <thead>
          <tr>
            <th>商品コード</th>
            <th>商品名</th>
            <th>単価</th>
            <th>数量</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in selectedList" :key="product.purchase_id">
            <td>{{ product.product_code }}</td>
            <td>{{ product.product_name }}</td>
            <td>{{ product.unit_price }}円</td>
            <td>{{ product.quantity }}</td>
          </tr>
        </tbody>
      </table>
      <div>合計金額:{{ totalPrice }}円</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PurchaseHistory",
  data() {
    return {
      selectedDate: null,
      visible: false,
    };
  },
  computed: {
    purchasesdate() {
      return this.$store.getters.getPurchaseDateList || [];
    },
    selectedList() {
      return this.$store.state.purchaseList[this.selectedDate] || [];
    },
     totalPrice() {
      return this.selectedList.reduce(function (sum, item) {
        return sum + item.unit_price * item.quantity;
      }, 0);
   },
 
  },
  methods: {
    fetchProductsData() {
      this.$store.dispatch("fetchPurchaseHistoryList");
    },

  },
  mounted() {
    this.fetchProductsData();
  },
};
</script>

<style scoped>
.history-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}
.history-table th,
.history-table td {
  border: 1px solid #ccc;
  padding: 8px 12px;
  text-align: left;
}
.history-table th {
  background-color: #f0f0f0;
}
</style>
