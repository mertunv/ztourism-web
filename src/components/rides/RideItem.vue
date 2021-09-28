<template>
  <section>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
    <li>
      <h3>{{ name }} - <h4 style="display:inline;">{{ date }}</h4> - <h4 style="display:inline;">{{ time }}</h4> </h3>
      <h4>{{ seatPrice }}₺</h4>
      <div>
        <!-- <base-badge
        v-for="list in listOfEntries"
        :key="list"
        :type="list"
        :title="list"
      ></base-badge> -->
      </div>
      <div class="actions">
        <base-button @click="deleteRide" v-if="isLoggedIn && this.$store.getters.userId === 'a5rxvotzvlfEAR92JBOgktDBfCs1'"
          ><i class="material-icons">delete</i>
        </base-button>

        <!-- <base-button mode="outline" link :to="reserveLink" v-if="isLoggedIn"
          >Rezerve Et</base-button
        > -->
        <base-button link :to="detailLink" >Detayları Göster</base-button>
      </div>
    </li>
  </section>
</template>

<script>
export default {
  props: ['id', 'name', 'seatPrice', 'time', 'date'],
  computed: {
    // reserveLink() {
    //   return this.$route.path + '/' + this.id + '/reserve'; // /rides/r1/reserve
    // },
    detailLink() {
      return this.$route.path + '/' + this.id; // /rides/r1
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    reserveLink() {
      return this.$route.path + '/' + this.id;
    }
  },
  methods: {
    // reserveLink() {
    //   return this.$route.path + '/' + this.id + '/reserve';
    //   this.$router.replace('/auth');
    // },
    async deleteRide() {
      //console.log(this.id);
      const response = await fetch(
        `https://z-tourism-web-default-rtdb.europe-west1.firebasedatabase.app/rides/${this.id}.json`,
        {
          method: 'DELETE'
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(
          responseData.message || 'Göndermeyi başaramadık!'
        );
        throw error;
      }
    }
  }
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
