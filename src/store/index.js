import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    productsData: null,
    purchaseList: null,
    shoppingCart: [],
    loginStatus: null,
  },
  getters: {
    getPurchaseDateList(state) {
      return Object.keys(state.purchaseList || {});
    },
    getProducts(state) {//削除されていない商品データの取得
      return (state.productsData || []).filter((product) => {
        return !product.is_deleted;
      });
    },
    getShoppingCartJson(state) {//insert用にデータを変換
      return { List: state.shoppingCart };
    },
  },
  mutations: {
    SET_PRODUCTS_DATA(state, value) {//
      state.productsData = value;
    },
    SET_PURCHASE_DATA(state, value) {
      state.purchaseList = value;
    },
    ADD_SHOPPINGCART(state, value) {
      var i = state.shoppingCart.findIndex(
        (elem) => elem.product_name === value.product_name
      );
      //商品が見つからない(新規)場合
      if (i === -1) {
        state.shoppingCart.push(value);
        console.log("新規注文");
      } else {//すでに商品ある(既存)場合
        state.shoppingCart[i].quantity += value.quantity;
        console.log("追加注文");
      }
      console.log(state.shoppingCart);
    },
    //商品かごを空にする
    CLEAR_SHOPPINGCART(state) {
      state.shoppingCart = [];
    },
    //ログイン状態の変更
    SET_STATUS(state, value) {
      state.loginStatus = value;
    },
  },
  actions: {
    
    async fetchProductsData({ commit }) {
      try {
        const response = await axios.get(
          "https://m3h-yoneyama-rec04.azurewebsites.net/api/SELECTPRODUCTS?"
        );
        commit("SET_PRODUCTS_DATA", response.data.List);
        console.log(this.state.productsData);
        console.log("読み取り完了");
      } catch (error) {
        console.log(error);
      }
    },

    // _,で未使用であるということを示せるらしい
    async addProduct(_, { productName, price }) {
      if (!productName) {
        console.log("nameエラー");
        return;
      }
      if (!price || isNaN(price)) {
        console.log("priceエラー");
        return;
      }
      //POSTメソッドで送るパラメーターを作成
      const param = {
        product_name: productName,
        price: price,
      };
      //INSERT用のAPIを呼び出し
      const response = await axios.post(
        "https://m3h-yoneyama-rec04.azurewebsites.net/api/INSERTPRODUCTS?",
        param
      );

      //結果をコンソールに出力
      console.log(response.data.List);
    },
    async fetchPurchaseHistoryList({ commit }) {
      try {
        const response = await axios.get(
          "https://m3h-yoneyama-rec04.azurewebsites.net/api/SELECTPURCHASES?"
        );
        const data = response.data;
        //mutationsでpurchaseListにデータセット
        commit("SET_PURCHASE_DATA", data);
        console.log("読み取り完了");

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    async addPurchasehistory(_, param) {
      if (!(param == null || param.List.Count == 0)) {
        //POSTメソッドで送るパラメーターを作成
        //INSERT用のAPIを呼び出し
        const response = await axios.post(
          "https://m3h-yoneyama-rec04.azurewebsites.net/api/INSERTALL?",
          param
        );

        //結果をコンソールに出力
        console.log(response.data.List);
      }
    },
    async deleteProduct(_, product_code) {
      if (!product_code || isNaN(product_code)) {
        console.log("product_codeエラー");
        return;
      }
      try {
        const param = {
          product_code: product_code,
        };
        //INSERT用のAPIを呼び出し
        const response = await axios.post(
          "https://m3h-yoneyama-rec04.azurewebsites.net/api/DELETE?",
          param
        );

        //結果をコンソールに出力
        console.log(response.data.List);
        console.log("削除に成功");
        console.log("更新してください");
      } catch (error) {
        console.log("削除に失敗しました");
      }
    },
    async login({ commit }, { user_id, password }) {
      if (!user_id) {
        console.log("user_idエラー");
        return;
      }
      if (!password) {
        console.log("passwordエラー");
        return;
      }
      const param = {
        user_id: user_id,
        password: password,
      };

      const response = await axios.post(
        "https://m3h-yoneyama-rec04.azurewebsites.net/api/LOGIN?",
        param
      );
      if (response.data.status == "success") {
        commit("SET_STATUS", true);
      }

      //結果をコンソールに出力
      console.log(response.data);
    },
    async logout({ commit }) {
      commit("SET_STATUS", false);
    },
  },
  modules: {},
});
