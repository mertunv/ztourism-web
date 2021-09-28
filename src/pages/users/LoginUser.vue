<template>
  <!-- <base-card>
    <form @submit.prevent="submitForm">
      <div class="form-control" :class="{ invalid: !user_email.isValid }">
        <label for="user-email">E-mail:</label>
        <input
          type="text"
          id="user-email"
          v-model.trim="user_email.val"
          @blur="clearValidation('user_email')"
        />
        <p v-if="!user_email.isValid">Kod boş bırakılamaz!</p>
      </div>
      <div class="form-control" :class="{ invalid: !pass.isValid }">
        <label for="pass-user">Şifre:</label>
        <input
          type="text"
          id="pass-user"
          v-model.trim="pass.val"
          @blur="clearValidation('pass')"
        />
        <p v-if="!pass.isValid">Kalkış yeri boş bırakılamaz!</p>
      </div>
      <div class="form-control" :class="{ invalid: !pass_re.isValid }">
        <label for="pass-re">Şifre Doğrula:</label>
        <input
          type="text"
          id="pass-re"
          v-model.trim="pass_re.val"
          @blur="clearValidation('pass-re')"
        />
        <p v-if="!pass_re.isValid">Varış yeri boş bırakılamaz!</p>
      </div>
      <base-button>Üye Ol!</base-button>
    </form>
  </base-card> -->
  <base-card>
    <form @submit.prevent="submitForm">
      <div class="form-control" :class="{ invalid: !user_email.isValid }">
        <label for="user-email">E-mail:</label>
        <input
          type="text"
          id="user-email"
          v-model.trim="user_email.val"
        />
        <p v-if="!user_email.isValid">Kod boş bırakılamaz!</p>
      </div>
      <div class="form-control" :class="{ invalid: !pass.isValid }">
        <label for="pass-user">Şifre:</label>
        <input
          type="text"
          id="pass-user"
          v-model.trim="pass.val"
        />
        <p v-if="!pass.isValid">Kalkış yeri boş bırakılamaz!</p>
      </div>
      <!-- <div class="form-control" :class="{ invalid: !pass_re.isValid }">
        <label for="pass-re">Şifre Doğrula:</label>
        <input
          type="text"
          id="pass-re"
          v-model.trim="pass_re.val"
        />
        <p v-if="!pass_re.isValid">Varış yeri boş bırakılamaz!</p>
      </div> -->
      <base-button>Üye Ol!</base-button>
    </form>
  </base-card>
</template>

<script>
import BaseButton from '../../components/ui/BaseButton.vue';
export default {
  emits: ['save-data'],
  components: { BaseButton },
  data() {
    return {
      user_email: {
        val: '',
        isValid: true
      },
      pass: {
        val: '',
        isValid: true
      },
    //   pass_re: {
    //     val: '',
    //     isValid: true
    //   },
      formIsValid: true
    };
  },
  methods: {
    clearValidation(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.user_email.val === '') {
        this.user_email.isValid = false;
        //this.formIsValid = false;
      }
      if (this.pass.val === '') {
        this.pass.isValid = false;
        //this.formIsValid = false;
      }
    //   if (this.pass_re.val === '') {
    //     this.pass_re.isValid = false;
    //     //this.formIsValid = false;
    //   }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const formData = {
        user_email: this.user_email.val,
        pass: this.pass.val,
        // pass_re: this.pass_re.val,
      };
      console.log(formData);
    //   this.$emit('save-data', formData);
    
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
