<template>
  <section>
    <div id="selec" style="text-align: center;">
      <label for="selec">Lütfen bilet sayısı seçin:</label>
      <base-button mode="outline" @click="selecChange(1)">1</base-button>
      <base-button mode="outline" @click="selecChange(2)">2</base-button>
      <base-button mode="outline" @click="selecChange(3)">3</base-button>
      <label v-if="errorMessage != null" style="color: red;"
        ><hr class="rounded" style="background-color: #00b3b3; height: 5px;" />
        {{ errorMessage }}</label
      >
    </div>
    <form @submit.prevent="submitForm" v-if="showSeat">
      <!-- <select id="selec" v-model="selected" style="width:100px;" @select="console.log(selected)"> -->
      <!-- <option disabled value="">Lütfen bilet sayısı seçin.</option> -->
      <!-- <option v-for="val in vals" :value="val" :key="val" :selected="selected == val">{{ val }}</option> -->
      <!-- <option value="1" :selected="selected == 1" >1</option>
        <option value="2" :selected="selected == 2" >2</option>
        <option value="3" :selected="selected == 3" >3</option> -->
      <!-- </select> -->

      <div class="form-control" v-if="numOfSeatShown()">
        <label for="seatNumber">Lütfen bir koltuk numarası girin</label>
        <div v-if="vals == 1">
          <input type="number" id="seatNumber" v-model="seatNumber" /><br />
          <input
            type="text"
            id="gen"
            v-model="gen"
            placeholder="Lütfen cinsiyetinizi girin. (kadın, erkek şeklinde)"
          />
        </div>
        <div v-if="vals == 2">
          <input type="number" id="seatNumber" v-model="seatNumber" />
          <!-- <br /><input type="text" id="gen" v-model="gen" placeholder="Lütfen cinsiyetinizi girin. (kadın, erkek şeklinde)" /> -->
          <br /><input type="number" id="seatNumber2" v-model="seatNumber2" />
          <!-- <br /><input type="text" id="gen2" v-model="gen2" placeholder="Lütfen cinsiyetinizi girin. (kadın, erkek şeklinde)" /> -->
        </div>
        <div v-if="vals == 3">
          <input
            type="number"
            id="seatNumber"
            v-model="seatNumber"
          /><br /><input
            type="number"
            id="seatNumber2"
            v-model="seatNumber2"
          /><br /><input type="number" id="seatNumber3" v-model="seatNumber3" />
        </div>
        <!-- <input type="number" id="seatNumber" v-model="seatNumber" /> -->
      </div>
      <p class="errors" v-if="!formIsValid">Lütfen geçerli bir sayı girin!</p>
      <div class="actions">
        <base-button>Rezerve Et</base-button>
      </div>
    </form>
    <h2 style="text-align: center;" v-if="selected != null">
      {{ showPrice() }}₺
    </h2>
  </section>
</template>

<script>
import BaseButton from '../../components/ui/BaseButton.vue';
export default {
  components: { BaseButton },
  data() {
    return {
      selected: null,
      vals: null,
      selectedRide: null,
      seatNumber: null,
      seatNumber2: null,
      seatNumber3: null,
      seatNums: [],
      formIsValid: true,
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
      gen: null,
      // gen2: null,
      // gen3: null,
      genderError: false,
      error: false,
      errorMessage: null,
      seatError: false,
      seatError2: false,
      seatError3: false,
      err: false
    };
  },
  created() {
    this.selectedRide = this.$store.getters['rides/rides'].find(
      ride => ride.id === this.$route.params.id
    );
    this.selected = null;
    this.genderError = false;
    this.error = false;
    this.seatError = false;
    this.seatError2 = false;
    this.seatError3 = false;
    this.errorMessage = null;
    this.getRidesSeats();
  },
  methods: {
    showPrice() {
      if (this.selected === 1) {
        return this.seatPrice;
      } else if (this.selected === 2) {
        return this.seatPrice * 2;
      } else if (this.selected === 3) {
        return this.seatPrice * 3;
      } else {
        return null;
      }
    },
    selecChange(val) {
      this.selected = val;
      console.log(this.selected);
    },
    numOfSeatShown() {
      if (this.selected === 1) {
        this.vals = 1;
      }
      if (this.selected === 2) {
        this.vals = 2;
      }
      if (this.selected === 3) {
        this.vals = 3;
      }
      return this.vals;
    },
    stateOfSeat() {
      var n;
      if (this.seatNumber === 1) {
        n = 0;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n + 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        // console.log('selected != 1');
        // this.seatState[n].gender = this.gen;
        // this.seatState[n].isActive = !this.seatState[n].isActive;
        //this.seatState[n].gender = this.gen;
        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 2) {
        n = 1;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n - 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              // if (this.seatState[n].isActive !== true) {                              /////////////// IMPORTENT!!!!!!!!!!!!!!!
              //   this.seatState[n].isActive = !this.seatState[n].isActive;
              //   this.seatState[n].gender = this.gen;
              // }else if (this.seatState[n].isActive === true) {
              //   this.genderError = true;
              // }
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        // if (this.seatState[n-1].gender === 'kadın' && this.gen === 'erkek' && this.selected === 1) {
        //   if (this.seatState[n+1].gender === 'kadın') {
        //     console.log('geçersiz sonra');
        //   return;
        //   }
        //   console.log('geçersiz önce');
        //   return;
        // }
        // this.seatState[n].gender = this.gen;
        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 3) {
        n = 2;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n + 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////

        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 4) {
        n = 3;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n - 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 5) {
        n = 4;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n + 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 6) {
        n = 5;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n - 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.seatError2 = true;
          this.seatError3 = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 7) {
        n = 6;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n + 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 8) {
        n = 7;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n - 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 9) {
        n = 8;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n + 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 10) {
        n = 9;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n - 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      //////////////////////////////////////////////////////////////
      if (this.seatNumber === 11) {
        n = 10;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n + 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            ///this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 12) {
        n = 11;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n - 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 13) {
        n = 12;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n + 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 14) {
        n = 13;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n - 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 15) {
        n = 14;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n + 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 16) {
        n = 15;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n - 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 17) {
        n = 16;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n + 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 18) {
        n = 17;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n - 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 19) {
        n = 18;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n + 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 20) {
        n = 19;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n - 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      /////////////////////////////////////////////////////////////////
      if (this.seatNumber === 21) {
        n = 20;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n + 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 22) {
        n = 21;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n - 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 23) {
        n = 22;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n + 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 24) {
        n = 23;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n - 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 25) {
        n = 24;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n + 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 26) {
        n = 25;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n - 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 27) {
        n = 26;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n + 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 28) {
        n = 27;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n - 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 29) {
        n = 28;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n + 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 30) {
        n = 29;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n - 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      /////////////////////////////////////////////////////////////////////
      if (this.seatNumber === 31) {
        n = 30;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n + 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 32) {
        n = 31;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n - 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 33) {
        n = 32;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n + 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 34) {
        n = 33;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n - 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 35) {
        n = 34;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n + 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 36) {
        n = 35;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n - 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 37) {
        n = 36;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true &&
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n + 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 38) {
        n = 37;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true && 
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n - 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 39) {
        n = 38;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true &&
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n + 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }
      if (this.seatNumber === 40) {
        n = 39;
        //////////////////////////////////////////
        if (
          this.seatState[n].isActive !== true &&
          !this.seatError2 &&
          !this.seatError3
        ) {
          if (
            this.seatNumber !== null &&
            this.seatNumber2 === null &&
            this.seatNumber3 === null
          ) {
            if (
              this.seatState[n - 1].gender === 'kadın' &&
              this.gen === 'erkek'
            ) {
              this.genderError = true;
              this.error = true;
              console.log('geçersiz');
              return;
            } else {
              this.seatState[n].isActive = !this.seatState[n].isActive;
              this.seatState[n].gender = this.gen;
              //this.seatState[n].isActive = !this.seatState[n].isActive;
            }
          } else if (
            this.seatNumber !== null &&
            (this.seatNumber2 !== null || this.seatNumber3 !== null)
          ) {
            console.log('selected != 1');
            //this.seatState[n].gender = this.gen;
            this.seatState[n].isActive = !this.seatState[n].isActive;
          }
        } else {
          this.seatError = true;
          this.error = true;
        }

        //////////////////////////////////////////
        //this.seatState[n].isActive = !this.seatState[n].isActive;
        console.log(this.seatState);
      }

      ////////////////////////////////////////////////////////////////////////////////////////////

      var m;
      if (this.seatNumber2 === 1) {
        m = 0;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 2) {
        m = 1;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 3) {
        m = 2;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 4) {
        m = 3;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 5) {
        m = 4;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 6) {
        m = 5;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 7) {
        m = 6;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.seatError = true;
          this.seatError3 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 8) {
        m = 7;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 9) {
        m = 8;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 10) {
        m = 9;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      //////////////////////////////////////////////////////////////
      if (this.seatNumber2 === 11) {
        m = 10;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 12) {
        m = 11;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 13) {
        m = 12;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 14) {
        m = 13;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 15) {
        m = 14;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 16) {
        m = 15;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 17) {
        m = 16;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 18) {
        m = 17;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 19) {
        m = 18;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 20) {
        m = 19;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      /////////////////////////////////////////////////////////////////
      if (this.seatNumber2 === 21) {
        m = 20;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 22) {
        m = 21;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 23) {
        m = 22;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 24) {
        m = 23;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 25) {
        m = 24;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 26) {
        m = 25;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 27) {
        m = 26;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 28) {
        m = 27;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 29) {
        m = 28;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 30) {
        m = 29;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      /////////////////////////////////////////////////////////////////////
      if (this.seatNumber2 === 31) {
        m = 30;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 32) {
        m = 31;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 33) {
        m = 32;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 34) {
        m = 33;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 35) {
        m = 34;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 36) {
        m = 35;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 37) {
        m = 36;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 38) {
        m = 37;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 39) {
        m = 38;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }
      if (this.seatNumber2 === 40) {
        m = 39;
        if (
          this.seatState[m].isActive !== true &&
          !this.seatError &&
          !this.seatError3
        ) {
          this.seatState[m].isActive = !this.seatState[m].isActive;
        } else {
          this.seatError2 = true;
          this.error = true;
        }

        console.log(this.seatState);
      }

      //////////////////////////////////////////////////////////////////////////////////////////////////////
      var k;
      if (this.seatNumber3 === 1) {
        k = 0;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 2) {
        k = 1;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 3) {
        k = 2;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 4) {
        k = 3;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 5) {
        k = 4;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 6) {
        k = 5;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 7) {
        k = 6;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 8) {
        k = 7;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 9) {
        k = 8;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 10) {
        k = 9;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      //////////////////////////////////////////////////////////////
      if (this.seatNumber3 === 11) {
        k = 10;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 12) {
        k = 11;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 13) {
        k = 12;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 14) {
        k = 13;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 15) {
        k = 14;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 16) {
        k = 15;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 17) {
        k = 16;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 18) {
        k = 17;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 19) {
        k = 18;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 20) {
        k = 19;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      /////////////////////////////////////////////////////////////////
      if (this.seatNumber3 === 21) {
        k = 20;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 22) {
        k = 21;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 23) {
        k = 22;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 24) {
        k = 23;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 25) {
        k = 24;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 26) {
        k = 25;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 27) {
        k = 26;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 28) {
        k = 27;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 29) {
        k = 28;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 30) {
        k = 29;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      /////////////////////////////////////////////////////////////////////
      if (this.seatNumber3 === 31) {
        k = 30;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 32) {
        k = 31;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 33) {
        k = 32;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 34) {
        k = 33;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 35) {
        k = 34;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 36) {
        k = 35;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 37) {
        k = 36;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 38) {
        k = 37;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 39) {
        k = 38;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }
      if (this.seatNumber3 === 40) {
        k = 39;
        if (
          this.seatState[k].isActive !== true &&
          !this.seatError &&
          !this.seatError2
        ) {
          this.seatState[k].isActive = !this.seatState[k].isActive;
        } else {
          this.seatError3 = true;
          this.error = true;
        }
        console.log(this.seatState);
      }

      if (!this.seatError && this.seatError2) {
        this.seatState[n].isActive = !this.seatState[n].isActive;
      }
      if (!this.seatError && !this.seatError2 && this.seatError3) {
        this.seatState[n].isActive = false;
        this.seatState[m].isActive = false;
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
      const rideId = this.selectedRide.id;
      const response = await fetch(
        `https://z-tourism-web-default-rtdb.europe-west1.firebasedatabase.app/rides/${rideId}/seatStatus.json`
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
      // if (!this.seatError && !this.seatError2 && !this.seatError3) {
      //   this.stateOfSeat();
      // }
      this.stateOfSeat();
      const rideId = this.selectedRide.id;
      const rideData = {
        seatStatus: this.seatState
      };
      const response = await fetch(
        `https://z-tourism-web-default-rtdb.europe-west1.firebasedatabase.app/rides/${rideId}.json`,
        {
          method: 'PATCH',
          body: JSON.stringify(rideData)
        }
      );
      if (!response.ok) {
        //
      }
      //console.log(token);
      this.getRidesSeats();
    },
    submitForm() {
      this.formIsValid = true;
      if (this.seatNumber < 0 || this.seatNumber === '') {
        this.formIsValid = false;
        return;
      }
      this.addSeatToDatabase();

      if (
        this.seatNumber !== null &&
        this.seatNumber2 === null &&
        this.seatNumber3 === null
      ) {
        this.seatNums = [this.seatNumber];
      }
      if (
        this.seatNumber !== null &&
        this.seatNumber2 !== null &&
        this.seatNumber3 === null
      ) {
        this.seatNums = [this.seatNumber, this.seatNumber2];
      }
      if (
        this.seatNumber !== null &&
        this.seatNumber2 !== null &&
        this.seatNumber3 !== null
      ) {
        this.seatNums = [this.seatNumber, this.seatNumber2, this.seatNumber3];
      }

      if (this.seatError === false && this.seatError2 === false && this.seatError3 === false) {
        console.log(this.seatError);
        console.log(this.seatError2);
        console.log(this.seatError3);
        if (!this.genderError) {
          //this.stateOfSeat();
          this.$store.dispatch('requests/reserveRide', {
            seatNumber: this.seatNums,
            userId: this.$route.params.id, //ride id = user id
            rideId: this.$route.params.id,
            time: this.timeOfRide,
            destination: this.destOfRide,
            date: this.dateOfRide,
            departure: this.depOfRide,
            name: this.name,
            seatPrice: this.seatPrice
          });

          this.genderError = false;
          this.seatError = false;
          this.seatError2 = false;
          this.seatError3 = false;
          console.log('whyyyyyyyyyyyyyyyyyyyy');
          //this.addSeatToDatabase();
          //this.seatError = false;
          //this.$router.replace('/rides');
        }
        //this.seatError = false;
      }

      if (this.genderError) {
        this.errorMessage = 'Bekar erkek ve bekar kadın yanyana oturamaz.';
        this.genderError = false;
        throw new Error('Bekar erkek ve kadın yanyana oturamaz.');
      } else if (this.seatError || this.seatError2 || this.seatError3) {
        var mes;
        if (this.seatError) {
          mes = this.seatNumber;
        } else if (this.seatError2) {
          mes = this.seatNumber2;
        } else if (this.seatError3) {
          mes = this.seatNumber3;
        } else {
          mes = null;
        }
        this.errorMessage = `Koltuk ${mes} zaten seçili!`;
        this.seatError = false;
        this.seatError2 = false;
        this.seatError3 = false;
        throw new Error('Koltuk zaten seçili!');
      }
      //throw new Error('Bekar erkek ve kadın yanyana oturamaz.');

      this.seatNumber = null;
      this.seatNumber2 = null;
      this.seatNumber3 = null;

      // console.log(this.seatNumber + ' : seat num');
      console.log(this.selectedRide.id + ' : local id');
      // console.log(this.timeOfRide + ' : time');
      // console.log(this.destOfRide + ' : dest');
      // console.log(this.dateOfRide + ' : date');
      // console.log(this.depOfRide + ' : dep');
      // console.log(this.name + ' : name');
      // console.log(this.seatPrice + ' : price');
      // console.log(this.$route.params.id + ' : user id');

      // if (!this.error) {
      //   this.$router.replace('/rides');
      // }

      this.error = false;
      this.errorMessage = null;

      this.$router.replace('/rides');
    }
  },
  computed: {
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
    showSeat() {
      if (this.selected === null) {
        return false;
      }
      return true;
    }
  }
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #00b3b3;
  background-color: #b3ffff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
