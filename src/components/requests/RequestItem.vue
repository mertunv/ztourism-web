<template>
  <section>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />

    <li>
      <div style="display: flex; justify-content: flex-end">
        <base-button @click="deleteReservation"
          ><i class="material-icons">delete</i>
        </base-button>
      </div>
      <div>
        <!-- <a :href="rideLink">{{ name }}</a> -->
        <!-- <a :href="rideLink">{{ userId }}</a> -->
        <a>{{ name }}</a>
      </div>

      <h2>
        Koltuk No:
        <h3 style="display: inline">{{ seatNumber }}</h3>
      </h2>
      <h2>
        Kalkış:
        <h3 style="display: inline">{{ departure }}</h3>
      </h2>
      <h2>
        Varış:
        <h3 style="display: inline">{{ destination }}</h3>
      </h2>
      <h2>
        Fiyat:
        <h3 style="display: inline">{{ priceOfRes() }}₺</h3>
      </h2>
      <h2>
        Tarih:
        <h3 style="display: inline">{{ date }}</h3>
      </h2>
      <h2>
        Saat:
        <h3 style="display: inline">{{ time }}</h3>
      </h2>

      <!-- <h3>Varış: {{ destination }} Fiyat: {{ seatPrice }}</h3>
        <p>{{ seatNumber }} {{ date }} {{ time }} </p> -->
      <!-- <p>{{ seatNumber }}</p>
        <p>{{ rideId }}</p> -->
    </li>
  </section>
</template>

<script>
export default {
  // props: ['name', 'destination', 'date', 'time', 'price'],
  props: [
    'seatNumber',
    'userId',
    'name',
    'rideId',
    'time',
    'destination',
    'date',
    'seatPrice',
    'departure'
  ],
  data() {
    return {
      number: this.seatNumber[0],
      seatNumber2: this.seatNumber[1],
      seatNumber3: this.seatNumber[2],
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
    };
  },
  computed: {
    rideLink() {
      return this.$route.path + '/' + this.rideId;
    }
  },
  methods: {
    priceOfRes() {
      if (this.seatNumber.length === 1) {
        return this.seatPrice;
      }
      if (this.seatNumber.length === 2) {
        return this.seatPrice * 2;
      }
      if (this.seatNumber.length === 3) {
        return this.seatPrice * 3;
      }
    },
    async deleteReservation() {
      this.addSeatToDatabase();

      //console.log(this.userId);
      const response = await fetch(
        `https://z-tourism-web-default-rtdb.europe-west1.firebasedatabase.app/reservations/${this.userId}/${this.name}.json`,
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
      this.$router.go();
    },
    stateOfSeat() {
      var n;
      if (this.number === 1) {
        n = 0;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 2) {
        n = 1;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 3) {
        n = 2;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 4) {
        n = 3;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 5) {
        n = 4;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 6) {
        n = 5;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 7) {
        n = 6;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 8) {
        n = 7;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 9) {
        n = 8;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 10) {
        n = 9;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      //////////////////////////////////////////////////////////////
      if (this.number === 11) {
        n = 10;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 12) {
        n = 11;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 13) {
        n = 12;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 14) {
        n = 13;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 15) {
        n = 14;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 16) {
        n = 15;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 17) {
        n = 16;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 18) {
        n = 17;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 19) {
        n = 18;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 20) {
        n = 19;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      /////////////////////////////////////////////////////////////////
      if (this.number === 21) {
        n = 20;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 22) {
        n = 21;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 23) {
        n = 22;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 24) {
        n = 23;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 25) {
        n = 24;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 26) {
        n = 25;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 27) {
        n = 26;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 28) {
        n = 27;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 29) {
        n = 28;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 30) {
        n = 29;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      /////////////////////////////////////////////////////////////////////
      if (this.number === 31) {
        n = 30;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 32) {
        n = 31;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 33) {
        n = 32;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 34) {
        n = 33;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 35) {
        n = 34;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 36) {
        n = 35;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 37) {
        n = 36;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 38) {
        n = 37;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 39) {
        n = 38;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.number === 40) {
        n = 39;
        this.seatState[n].gender = 'boş';
        this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }

      ////////////////////////////////////////////////////////////////////////////////////////////

      var m;
      if (this.seatNumber2 === 1) {
        m = 0;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 2) {
        m = 1;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 3) {
        m = 2;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 4) {
        m = 3;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 5) {
        m = 4;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 6) {
        m = 5;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 7) {
        m = 6;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 8) {
        m = 7;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 9) {
        m = 8;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 10) {
        m = 9;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      //////////////////////////////////////////////////////////////
      if (this.seatNumber2 === 11) {
        m = 10;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 12) {
        m = 11;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 13) {
        m = 12;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 14) {
        m = 13;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 15) {
        m = 14;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 16) {
        m = 15;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 17) {
        m = 16;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 18) {
        m = 17;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 19) {
        m = 18;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 20) {
        m = 19;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      /////////////////////////////////////////////////////////////////
      if (this.seatNumber2 === 21) {
        m = 20;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 22) {
        m = 21;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 23) {
        m = 22;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 24) {
        m = 23;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 25) {
        m = 24;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 26) {
        m = 25;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 27) {
        m = 26;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 28) {
        m = 27;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 29) {
        m = 28;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 30) {
        m = 29;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      /////////////////////////////////////////////////////////////////////
      if (this.seatNumber2 === 31) {
        m = 30;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 32) {
        m = 31;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 33) {
        m = 32;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 34) {
        m = 33;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 35) {
        m = 34;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 36) {
        m = 35;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 37) {
        m = 36;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 38) {
        m = 37;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 39) {
        m = 38;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber2 === 40) {
        m = 39;
        this.seatState[m].isActive = !this.seatState[m].isActive;
        console.log(this.seatState);
      }

      //////////////////////////////////////////////////////////////////////////////////////////////////////
      var k;
      if (this.seatNumber3 === 1) {
        k = 0;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 2) {
        k = 1;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 3) {
        k = 2;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 4) {
        k = 3;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 5) {
        k = 4;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 6) {
        k = 5;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 7) {
        k = 6;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 8) {
        k = 7;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 9) {
        k = 8;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 10) {
        k = 9;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      //////////////////////////////////////////////////////////////
      if (this.seatNumber3 === 11) {
        k = 10;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 12) {
        k = 11;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 13) {
        k = 12;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 14) {
        k = 13;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 15) {
        k = 14;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 16) {
        k = 15;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 17) {
        k = 16;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 18) {
        k = 17;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 19) {
        k = 18;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 20) {
        k = 19;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      /////////////////////////////////////////////////////////////////
      if (this.seatNumber3 === 21) {
        k = 20;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 22) {
        k = 21;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 23) {
        k = 22;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 24) {
        k = 23;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 25) {
        k = 24;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 26) {
        k = 25;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 27) {
        k = 26;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 28) {
        k = 27;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 29) {
        k = 28;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 30) {
        k = 29;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      /////////////////////////////////////////////////////////////////////
      if (this.seatNumber3 === 31) {
        k = 30;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 32) {
        k = 31;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 33) {
        k = 32;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 34) {
        k = 33;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 35) {
        k = 34;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 36) {
        k = 35;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 37) {
        k = 36;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 38) {
        k = 37;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 39) {
        k = 38;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 40) {
        k = 39;
        this.seatState[k].isActive = !this.seatState[k].isActive;
        console.log(this.seatState);
      }

      //this.seatState[n].isActive = !this.seatState[n].isActive;
      //console.log(this.seatState);
      console.log(this.seatNumber + ' : num1');
      console.log(this.seatNumber2 + ' : num2');
      console.log(this.seatNumber3 + ' : num3');
      console.log(n);
      console.log(m);
      console.log(k);
    },
    async getRidesSeats() {
      const id = this.rideId;
      const response = await fetch(
        `https://z-tourism-web-default-rtdb.europe-west1.firebasedatabase.app/rides/${id}/seatStatus.json`
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
      const id = this.rideId;
      const rideData = {
        seatStatus: this.seatState
      };
      const response = await fetch(
        `https://z-tourism-web-default-rtdb.europe-west1.firebasedatabase.app/rides/${id}.json`,
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
  },
  created() {
    this.getRidesSeats();
  }
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
}

a {
  color: #00b3b3;
  text-decoration: none;
  font-weight: bold;
  font-size: 22px;
}

a:hover,
a:active {
  color: #008080;
}

p {
  margin: 0.5rem 0 0 0;
}

/* h2 {
  font-family: 'Times New Roman', Times, serif;
} */
</style>
