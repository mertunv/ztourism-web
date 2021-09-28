<template>
  <div>
    <base-dialog title="Bir hata oluştu!" :show="!!error" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <!-- ----------------------------------------------------------- -->
    <base-dialog title="Doğrulanıyor..." :show="isLoading" fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <!-- ----------------------------------------------------------- -->
    <base-card>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">E-Mail</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="password">Şifre</label>
        <input type="password" id="password" v-model.trim="password" />
      </div>
      <p v-if="!formIsValid">Lütfen geçerli bir email ve şifre(en az 6 karakter) girin!</p>
      <base-button> {{ submitButton }} </base-button>
      <base-button type="button" mode="flat" @click="switchAuthMode"
        > {{ switchModeButton }} </base-button
      >
    </form>
  </base-card>
  </div>
</template>

<script>
import BaseDialog from '../../components/ui/BaseDialog.vue';
import BaseSpinner from '../../components/ui/BaseSpinner.vue';
export default {
  components: { BaseDialog, BaseSpinner },
  data() {
    return {
      email: '',
      password: '',
      isLoading: false,
      formIsValid: true,
      mode: 'login',
      error: null
    };
  },
  computed: {
      submitButton() {
          if (this.mode === 'login') {
            return 'Giriş';
        } else {
            return 'Üye Ol!';
        }
      },
      switchModeButton() {
          if (this.mode === 'login') {
            return 'Üye Ol!';
        } else {
            return 'Giriş';
        }
      }
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        !this.email.includes('@') ||
        this.password.length < 6 ||
        this.email === ''
      ) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;

      const payload = {
              email: this.email,
              password: this.password
            };

      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', payload);
        } else {
            await this.$store.dispatch('signup', payload);
        }
        this.$router.replace('/rides');
      } catch (err) {
        this.error = err.message || 'Kimlik doğrulama başarısız! Lütfen tekrar deneyiniz.';
      }
      
      this.isLoading = false;
    },
    switchAuthMode() {
        if (this.mode === 'login') {
            this.mode = 'signup';
        } else {
            this.mode = 'login';
        }
    },
    handleError() {
      this.error = null;
    }
  }
};
</script>

<style scoped>
form {
  margin: 1rem;
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
  height: 40px;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
  border-radius: 10px;
}

input:focus,
textarea:focus {
  border-color: #00b3b3;
  background-color: #b3ffff;
  outline: none;
}
</style>
