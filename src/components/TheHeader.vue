<template>
  <header>
    <nav>
      <h1><router-link to="/">Z Turizm</router-link></h1>
      <ul>
        <li><router-link to="/rides">Ana Sayfa</router-link></li>
        <li v-if="isLoggedIn">
          <router-link to="/requests">Reservasyonlar</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/add-ride" v-if="this.$store.getters.userId === 'a5rxvotzvlfEAR92JBOgktDBfCs1'" >Sefer Ekle</router-link>
        </li>
        <li v-else><router-link to="/auth">Giriş Yap</router-link></li>
        <li v-if="isLoggedIn">
          <base-button @click="logout">Çıkış Yap</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      localUserId: null
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    }//,
    // adminUser() {
    //   return this.$store.getters.userId;
    // }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace('/rides');
    },
    userAdmin() {
      if (this.localUserId !== 'a5rxvotzvlfEAR92JBOgktDBfCs1') {
        return false;
      } else {
        return true;
      }
      
    }
  },
  created() {
    this.adminUser;
    this.localUserId = this.$store.getters.userId;
    //console.log('loc us id: ' + this.localUserId);
  }
};
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #00b3b3;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #ffffff;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #ffffff;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>
