<template>
  <div>
    <base-dialog :show="!!error" title="Bir hata oluştu!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
      <div class="controls">
          <base-button mode="outline" @click="loadRides()" 
            >Yenile
            </base-button
          >
        </div>
        <header>
          <h2>Rezervasyonlar</h2>
        </header>
        
        <div v-if="isLoading"><base-spinner></base-spinner></div>
        <!-- <div v-if="hasReservations">
          <ul v-for="res in reservationsRecieved" :key="res.namez">
          <request-item
            v-for="res in reservationsRecieved"
            :key="res.name"
            :seatNumber="res.seatNumber"
            :rideId="res.rideId"
            :userId="res.userId"
            :name="res.name"
            :time="res.time"
            :price="res.price"
          ></request-item>
          </ul>
        </div> -->
        <ul v-if="hasReservations">
          <request-item
            v-for="res in reservationsRecieved.slice().reverse()"
            :key="res.id"
            :seatNumber="res.seatNumber"
            :rideId="res.rideId"
            :userId="res.userId"
            :name="res.name"
            :time="res.time"
            :seatPrice="res.seatPrice"
            :destination="res.destination"
            :departure="res.departure"
            :date="res.date"
          ></request-item>
        </ul>
        <h3 v-else>Rezervasyonunuz yok!</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';
export default {
  components: {
    RequestItem,
  },
  data() {
    return {
      isLoading: false,
      error: null
    };
  },
  computed: {
    reservationsRecieved() {
      return this.$store.getters['requests/requests'];
    },
    hasReservations() {
      return this.$store.getters['requests/hasRequests'];
    }
  },
  created() {
    this.loadRes();
  },
  methods: {
    loadRides() {
      this.$router.go();
    },
    async loadRes() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/fetchRes');
      } catch (error) {
        this.error = error.message || 'Yanlış bir şey var!';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    }
  }
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
