<template>
  <div>
    <br>
    <v-text-field
      class="ml-6 mr-6"
      v-model="productName"
      label="商品名を入力"
      placeholder="商品名を入力…"
      outlined
    >
    </v-text-field>
    <v-text-field
      class="ml-6 mr-6"
      v-model="price"
      label="金額を入力"
      placeholder="金額を入力…"
      outlined
    >
    </v-text-field>

    
      <v-btn block @click="addProduct"> 登録 </v-btn>
      <h1 v-show="isRegist">完了</h1>
    
  </div>
</template>

<script>
export default {
  name: "ProductInsert",

  data() {
    return {
      productName: "",
      price: "",
      isRegist:false,
    };
  },
  methods: {
    addProduct() {
      this.$store.dispatch("addProduct", {
        productName: this.productName,
        price: this.price,
      });
      this.isRegist=true;
    },
  },
  mounted() {},
};
</script>

<style>
</style>