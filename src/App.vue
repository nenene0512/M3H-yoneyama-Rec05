<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgcOi00RT5nmS_Rj6PGYyEhTe-bHYxTYlh88JdakEMzyIByLkjttumVSS0tqjHomY6nSuY7Vh2-mnYRYtHADiI6r2ePaLE78whWKnQOnqzQQfKAsNMTMLkI7PT4VAPX2F9o6_K3Xb-GbfE/s800/kaimono_kago.png"
          transition="scale-transition"
          width="40"
        />
        <h1>amezon</h1>


      </div>

      <v-spacer></v-spacer>
            <v-btn text to="/" tag="router-link">Home</v-btn>
      <v-btn text to="/admin" tag="router-link">管理者画面</v-btn>
       <v-btn depressed color="primary" to="/customer" tag="router-link">ユーザー画面</v-btn>

 
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
