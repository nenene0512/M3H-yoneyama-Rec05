<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col
            cols="4"
            v-for="product in products"
            :key="product.product_code"
          >
            <v-card class="mx-auto" max-width="344" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="text-overline mb-4">
                    {{ product.product_code }}
                  </div>
                  <v-list-item-title class="text-h5 mb-1">
                    {{ product.product_name }}
                  </v-list-item-title>
                  <v-list-item-subtitle
                    >{{ product.price }}円</v-list-item-subtitle
                  >
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  size="80"
                  color="grey"
                ></v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <v-btn
                  color="primary"
                  class="ma-2"
                  dark
                  @click="openDialog(product)"
                >
                  商品かごに入れる
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-dialog v-model="dialog2" max-width="500px">
      <v-card>
        <v-card-title> 購入数 </v-card-title>
        <v-card-text>
          <v-select
            :items="select"
            label="Select quantity"
            item-value="text"
            v-model="selectedQuantity"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="dialog2 = false"> Close </v-btn>
          <v-btn depressed color="primary" @click="addShoppingCart(selectedProduct)"> 追加 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn depressed color="primary" to="/about" tag="router-link">最終画面</v-btn>
  </v-app>
</template>

<script>
export default {
  name: "PurchaseInsert",
  data() {
    return {
      selectedQuantity:null,
      selectedProduct:null,
      dialog2: false,
      select: [
        { text: "1" },
        { text: "2" },
        { text: "3" },
        { text: "4" },
        { text: "5" },
        { text: "6" },
        { text: "7" },
        { text: "8" },
        { text: "9" },
      ],
    };
  },
  methods: {
    fetchProductsData() {
      this.$store.dispatch("fetchProductsData");
    },
    addShoppingCart(product){
        //mutationでadd処理
        var item ={product_code:product.product_code,
                   product_name:product.product_name,
                   quantity:parseInt(this.selectedQuantity),
                   unit_price:product.price,
                   }

        this.$store.commit('ADD_SHOPPINGCART',item);
        this.dialog2 = false;
        this.selectedQuantity=null;
    },
    openDialog(product) {
      this.selectedProduct = product; 
      this.dialog2 = true;
    },
  },
  computed: {
    products() {
    //   return(this.$store.state.productsData || []).filter((product)=>{return !product.is_deleted });
        return this.$store.getters.getProducts;
    },
  },

  mounted() {
    this.fetchProductsData();
  },
};
</script>

<style>
</style>