<template>
    <span class="badge" :class="type">
        {{ text }}
    </span>
</template>

<script>
export default {
    props: ['type', 'title'],
    computed: {
        text() {
            return this.title.toUpperCase();
        },
    },
}
</script>

<style scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}
/* ['tarih', 'saat', 'varış-yeri'], */
.tarih {
  background-color: #00b3b3;
  color: white;
}

.saat {
  background-color: #008080;
  color: white;
}

.varış-yeri {
  background-color: #004d4d;
  color: white;
}
</style>