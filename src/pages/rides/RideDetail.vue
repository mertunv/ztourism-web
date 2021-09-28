<template>
  <div>
    <!-- <section>
      <base-card>
        <img src="https://pngimg.com/uploads/bus/bus_PNG8615.png" alt="Otobüs" style="width: 600px; height: 450px">
      </base-card>
    </section> -->
    <section>
      <base-card>
        <h2>{{ name }}</h2>
        <h3>{{ seatPrice }}₺</h3>
        <h3>{{ dateOfRide }} - {{ timeOfRide }}</h3>
        <h3>{{ depOfRide }} --> {{ destOfRide }}</h3>
      </base-card>
    </section>
    <section>
      <header>
        <base-card>
          <h2>Hemen Rezerve Et!</h2>

          <base-button link @click="reserveLink" v-if="!isLoggedIn"
            >Rezerve Et</base-button
          >

          <reserve-ride v-if="isLoggedIn"></reserve-ride>
        </base-card>
      </header>
    </section>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />

    <section v-if="isLoggedIn">
      <div class="deneme" align="center">
        <!-- <input id="number" type="number" v-model="number" />
        <base-button link @click="addSeatToDatabase()">Dene</base-button> -->
        <!-- <base-button link @click="getRidesSeats()">Dene</base-button> -->
        <h3 style="display:inline">Koltuklar:</h3>
        <button
          style="background-color:white; border-radius: 20px;
          color:#00b3b3;
          border: 1px solid #00b3b3;
          margin-right: 0.5rem;
          margin: 0.5rem;
          height: 50px;
          width: 50px;"
        >
          Boş
        </button>

        <button
          style="background-color:#00b3b3; color:white; border-radius: 20px;
          border: 1px solid #00b3b3;
          margin-right: 0.5rem;
          margin: 0.5rem;
          height: 50px;
          width: 50px;"
        >
          Dolu
        </button>

        <button
          style="background-color:violet; color:white; border-radius: 20px;
          border: 1px solid violet;
          margin-right: 0.5rem;
          margin: 0.5rem;
          height: 50px;
          width: 50px;"
        >
          Kadın
        </button>
      </div>
      <seat-card>
        <!-- <base-badge
          v-for="list in listOfEntries"
          :key="list"
          :type="list"
          :title="list"
        ></base-badge> -->

        <seat-button
          v-for="item in seatState"
          :key="item"
          :mode="seatSelColor(item)"
          >{{ item.number
          }}<!--{{ item.gender.toUpperCase() }}--><br /><small class="gender">{{
            genderTag(item)
          }}</small></seat-button
        >
      </seat-card>
    </section>
  </div>
</template>

<script>
import SeatButton from '../../components/ui/SeatButton.vue';
import ReserveRide from '../requests/ReserveRide.vue';
export default {
  components: { ReserveRide, SeatButton },
  props: ['id'],
  data() {
    return {
      selectedRide: null,
      seatState: [
        { number: 1, isActive: false, gender: 'boş' },
        { number: 2, isActive: false, gender: 'boş' },
        { number: 3, isActive: false, gender: 'boş' },
        { number: 4, isActive: false, gender: 'boş' },
        { number: 5, isActive: false, gender: 'boş' },
        { number: 6, isActive: false, gender: 'boş' },
        { number: 7, isActive: false, gender: 'boş' },
        { number: 8, isActive: false, gender: 'boş' },
        { number: 9, isActive: false, gender: 'boş' },
        { number: 10, isActive: false, gender: 'boş' },

        { number: 11, isActive: false, gender: 'boş' },
        { number: 12, isActive: false, gender: 'boş' },
        { number: 13, isActive: false, gender: 'boş' },
        { number: 14, isActive: false, gender: 'boş' },
        { number: 15, isActive: false, gender: 'boş' },
        { number: 16, isActive: false, gender: 'boş' },
        { number: 17, isActive: false, gender: 'boş' },
        { number: 18, isActive: false, gender: 'boş' },
        { number: 19, isActive: false, gender: 'boş' },
        { number: 20, isActive: false, gender: 'boş' },

        { number: 21, isActive: false, gender: 'boş' },
        { number: 22, isActive: false, gender: 'boş' },
        { number: 23, isActive: false, gender: 'boş' },
        { number: 24, isActive: false, gender: 'boş' },
        { number: 25, isActive: false, gender: 'boş' },
        { number: 26, isActive: false, gender: 'boş' },
        { number: 27, isActive: false, gender: 'boş' },
        { number: 28, isActive: false, gender: 'boş' },
        { number: 29, isActive: false, gender: 'boş' },
        { number: 30, isActive: false, gender: 'boş' },

        { number: 31, isActive: false, gender: 'boş' },
        { number: 32, isActive: false, gender: 'boş' },
        { number: 33, isActive: false, gender: 'boş' },
        { number: 34, isActive: false, gender: 'boş' },
        { number: 35, isActive: false, gender: 'boş' },
        { number: 36, isActive: false, gender: 'boş' },
        { number: 37, isActive: false, gender: 'boş' },
        { number: 38, isActive: false, gender: 'boş' },
        { number: 39, isActive: false, gender: 'boş' },
        { number: 40, isActive: false, gender: 'boş' }
      ],
      number: null,
      selected: 'outline',
      gen: null
    };
  },
  created() {
    this.selectedRide = this.$store.getters['rides/rides'].find(
      ride => ride.id === this.id
    );

    this.getRidesSeats();
  },
  computed: {
    listOfEntries() {
      return this.selectedRide.listOfEntries;
    },
    seatPrice() {
      return this.selectedRide.seatPrice;
    },
    seatPrdescriptionice() {
      return this.selectedRide.description;
    },
    name() {
      return this.selectedRide.name;
    },
    timeOfRide() {
      return this.selectedRide.time;
    },
    destOfRide() {
      return this.selectedRide.destination;
    },
    depOfRide() {
      return this.selectedRide.departure;
    },
    dateOfRide() {
      return this.selectedRide.date;
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    switchSeatStatus() {
      if (this.selected === true) {
        return this.seatState.number;
      }
      return this.seatState.number;
    }
  },
  methods: {
    reserveLink() {
      //this.$router.path + '/auth';
      this.$router.replace('/auth');
    },
    genderTag(item) {
      if (item.gender !== 'boş') {
        return item.gender.toUpperCase();
      } else {
        return;
      }
    },
    stateOfSeat() {
      var n;
      if (this.number === 1) {
        n = 0;
        // if (this.seatState[n].gender === 'kadın' && this.gen === 'erkek') {
        //   console.log('geçersiz');
        //   return;
        // }
        // this.seatState[n].isActive = !this.seatState[n].isActive;
        // this.seatState[n].gender = this.gen;
        console.log(this.seatState);
      }
      if (this.number === 2) {
        n = 1;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 3) {
        n = 2;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 4) {
        n = 3;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 5) {
        n = 4;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 6) {
        n = 5;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 7) {
        n = 6;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 8) {
        n = 7;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 9) {
        n = 8;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 10) {
        n = 9;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      //////////////////////////////////////////////////////////////
      if (this.number === 11) {
        n = 10;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 12) {
        n = 11;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 13) {
        n = 12;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 14) {
        n = 13;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 15) {
        n = 14;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 16) {
        n = 15;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 17) {
        n = 16;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 18) {
        n = 17;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 19) {
        n = 18;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 20) {
        n = 19;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      /////////////////////////////////////////////////////////////////
      if (this.number === 21) {
        n = 20;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 22) {
        n = 21;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 23) {
        n = 22;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 24) {
        n = 23;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 25) {
        n = 24;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 26) {
        n = 25;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 27) {
        n = 26;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 28) {
        n = 27;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 29) {
        n = 28;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 30) {
        n = 29;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      /////////////////////////////////////////////////////////////////////
      if (this.number === 31) {
        n = 30;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 32) {
        n = 31;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 33) {
        n = 32;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 34) {
        n = 33;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 35) {
        n = 34;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 36) {
        n = 35;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 37) {
        n = 36;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 38) {
        n = 37;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 39) {
        n = 38;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 40) {
        n = 39;
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }

      //this.seatState[n].isActive = !this.seatState[n].isActive;
      //console.log(this.seatState);
      console.log(this.number);
      console.log(n);
    },
    async getRidesSeats() {
      const response = await fetch(
        `https://z-tourism-web-default-rtdb.europe-west1.firebasedatabase.app/rides/${this.id}/seatStatus.json`
      );
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || 'Listeleyemedik!');
        throw error;
      }

      console.log(responseData);

      this.seatState = responseData;
    },
    async addSeatToDatabase() {
      this.stateOfSeat();
      const token = this.$store.getters.token;
      const rideData = {
        seatStatus: this.seatState
      };
      const response = await fetch(
        `https://z-tourism-web-default-rtdb.europe-west1.firebasedatabase.app/rides/${this.id}.json`,
        {
          method: 'PATCH',
          body: JSON.stringify(rideData)
        }
      );
      if (!response.ok) {
        //
      }
      console.log(token);
      this.getRidesSeats();
    },

    seatSelColor(a) {
      if (a.isActive) {
        if (a.gender === 'kadın') {
          return 'outline female';
        } else if (a.gender === 'erkek') {
          return '.outline:active';
        } else {
          return '.outline:active';
        }
      } else {
        return 'outline';
      }
    }
  }
};
</script>

<style scoped>
div .deneme {
  height: 100%;
  width: 100%;
  height: 40px;
  font: inherit;
  border-radius: 10px;
}

/* div .gender{
  text-align-last: auto;
} */
</style>
