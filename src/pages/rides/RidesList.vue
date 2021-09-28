<template>
  <div>
    <base-dialog :show="!!error" title="Bir hata oluştu!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <!-- Filter -->
      <!-- Seferler -->
      <base-card>
        <div>
          <h2 class="rides-heading">SEFERLER</h2>
        </div>
        <!-- <span class="rides-heading">Seferler</span> -->
      </base-card>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadRides(true)"
            >Yenile
            <!-- <span class="material-icons">
              refresh
            </span> -->
            </base-button
          >
          <!-- <base-button link to="/register">Üye Ol</base-button> -->
        </div>
        <!-- <ul v-if="hasReservation">
            <li v-for="ride in filteredRides" :key="ride.id">
                {{ ride.name }}
            </li>
        </ul>
        <h2 v-else>Sefer bulunamadı.</h2> -->
        <div v-if="isLoading"><base-spinner></base-spinner></div>
        <ul>
          <ride-item
            v-for="ride in filteredRides.slice().reverse()"
            :key="ride.id"
            :id="ride.id"
            :name="ride.name"
            :seatPrice="ride.seatPrice"
            :listOfEntries="ride.listOfEntries"
            :date="ride.date"
            :time="ride.time"
          >
          </ride-item>
        </ul>
      </base-card>
    </section>
  </div>
</template>

<script>
import RideItem from '../../components/rides/RideItem.vue';

export default {
  components: { RideItem },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    filteredRides() {
      return this.$store.getters['rides/rides'];
    },
    adminUser() {
      return this.$store.getters.userId;
    }

    // hasRides() {
    //     return this.$store.getters['rides/hasReservation'];
    // },
  },
  created() {
    this.loadRides();
  },
  data() {
    return {
      isLoading: false,
      error: null
    };
  },
  methods: {
    async loadRides(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('rides/loadRides', {
          forceRefresh: refresh
        });
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
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}

.rides-heading {
  margin: 0.5rem 0;
  text-align: center;
}
</style>
