<template>
  <v-app>
    <v-main>
      <v-container>
        <table class="products-table">
          <thead>
            <tr>
              <th>商品コード</th>
              <th>商品名</th>
              <th>価格</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.product_code">
              <td>{{ product.product_code }}</td>
              <td>{{ product.product_name }}</td>
              <td>{{ product.price }}円</td>
              <td><v-btn depressed color="error" @click="deleteProduct(product.product_code)"> 削除 </v-btn></td>
            </tr>
            <tr v-if="!products || products.length === 0">
              <td colspan="4" class="text-center">
                表示できる商品がありません
              </td>
            </tr>
          </tbody>
        </table>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "ProductManagement",
  data(){
    return{
      // user_id:"test",
      // password:"0000",
    }
  },
  methods: {
    fetchProductsData() {
      this.$store.dispatch("fetchProductsData");
    },
    deleteProduct(product_code){
      this.$store.dispatch("deleteProduct",product_code);

    },
    // test(){
    //   this.$store.dispatch('login',
    //   {
    //     user_id:this.user_id,
    //     password:this.password}
    //     )

    // }
  },
  computed: {
    products() {
      // return(this.$store.state.productsData || []).filter((product)=>{return !product.is_deleted });
      return this.$store.getters.getProducts;
    },
  },
  mounted() {
    this.fetchProductsData();
    //this.test();
  },
};
</script>

<style scoped>
.products-table {
  width: 100%;
  border-collapse: collapse;
}
.products-table th,
.products-table td {
  border: 1px solid #ddd;
  padding: 8px;
}
.products-table th {
  background-color: #f9f9f9;
  text-align: left;
}
.text-center {
  text-align: center;
}
</style>
