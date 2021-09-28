<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{invalid: !name.isValid}">
      <label for="name">Kod:</label>
      <input type="text" id="name" v-model.trim="name.val" @blur="clearValidation('name')"/>
      <p v-if="!name.isValid">Kod boş bırakılamaz!</p>
    </div>
    <div class="form-control" :class="{invalid: !departure.isValid}">
      <label for="departure">Kalkış Yeri:</label>
      <input type="text" id="departure" v-model.trim="departure.val" @blur="clearValidation('departure')"/>
      <p v-if="!departure.isValid">Kalkış yeri boş bırakılamaz!</p>
    </div>
    <div class="form-control" :class="{invalid: !destination.isValid}">
      <label for="destination">Varış Yeri:</label>
      <input type="text" id="destination" v-model.trim="destination.val" @blur="clearValidation('destination')"/>
      <p v-if="!destination.isValid">Varış yeri boş bırakılamaz!</p>
    </div>
    <!-- <div class="form-control"> -->
    <!-- <label for="description">Açıklama:</label> -->
    <!-- <textarea id="description" rows="5"></textarea> -->
    <!-- <input type="text" id="description" /> -->
    <!-- </div> -->
    <div class="form-control" :class="{invalid: !price.isValid}">
      <label for="price">Fiyat:</label>
      <input type="number" id="price" v-model.number="price.val" @blur="clearValidation('price')"/>
      <p v-if="!price.isValid">Fiyat sıfırdan küçük olamaz ve boş bırakılamaz!</p>
    </div>
    <div class="form-control" :class="{invalid: !dateOfDeparture.isValid}">
      <label for="dateOfDeparture">Tarih:</label>
      <input type="text" id="dateOfDeparture" v-model.trim="dateOfDeparture.val" @blur="clearValidation('dateOfDeparture')"/>
      <p v-if="!dateOfDeparture.isValid">Tarih boş bırakılamaz!</p>
    </div>
    <div class="form-control" :class="{invalid: !timeOfDeparture.isValid}">
      <label for="timeOfDeparture">Saat:</label>
      <input type="text" id="timeOfDeparture" v-model.trim="timeOfDeparture.val" @blur="clearValidation('timeOfDeparture')"/>
      <p v-if="!timeOfDeparture.isValid">Saat boş bırakılamaz!</p>
    </div>
    <p v-if="!formIsValid">Lütfen hataları düzeltip tekrar deneyin!</p>
    <base-button>Ekle</base-button>
  </form>
</template>

<script>
import BaseButton from '../ui/BaseButton.vue';
export default {
  emits: ['save-data'],
  components: { BaseButton },
  data() {
    return {
      name: {
        val: '',
        isValid: true
      },
      departure: {
        val: '',
        isValid: true
      },
      destination: {
        val: '',
        isValid: true
      },
      price: {
        val: null,
        isValid: true
      },
      dateOfDeparture: {
        val: '',
        isValid: true
      },
      timeOfDeparture: {
        val: '',
        isValid: true
      },
      formIsValid: true
    };
  },
  methods: {
    clearValidation(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.name.val === '') {
        this.name.isValid =false;
        this.formIsValid = false;
      }
      if (this.departure.val === '') {
        this.departure.isValid =false;
        this.formIsValid = false;
      }
      if (this.destination.val === '') {
        this.destination.isValid =false;
        this.formIsValid = false;
      }
      if (!this.price.val || this.price.val < 0) {
        this.price.isValid =false;
        this.formIsValid = false;
      }
      if (this.dateOfDeparture.val === '') {
        this.dateOfDeparture.isValid =false;
        this.formIsValid = false;
      }
      if (this.timeOfDeparture.val === '') {
        this.timeOfDeparture.isValid =false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      } 

      const formData = {
        name: this.name.val,
        departure: this.departure.val,
        destination: this.destination.val,
        price: this.price.val,
        dateOfDeparture: this.dateOfDeparture.val,
        timeOfDeparture: this.timeOfDeparture.val,
        rideId: this.$route.params.id
      };
      this.$emit('save-data', formData);
    }
  }
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  font: inherit;
  border-radius: 10px;
}

input:focus,
textarea:focus {
  background-color: #b3ffff;
  outline: none;
  border-color: #00b3b3;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #00b3b3 solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
