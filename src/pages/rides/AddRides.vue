<template>
  <section>
    <base-card>
      <h2>Sefer Ekle!</h2>
      <ride-form @save-data="saveData"></ride-form>
    </base-card>
  </section>
</template>

<script>
import RideForm from '../../components/rides/AddRide.vue';

export default {
  components: {
    RideForm,
  },
  computed: {
    // isRide() {
    //   return this.$store.getters['rides/isRide']
    // }
  },
  methods: {
      saveData(data){
          this.$store.dispatch('rides/addRide', data);
          this.$router.replace('/rides');
      }
  },
};
</script>
