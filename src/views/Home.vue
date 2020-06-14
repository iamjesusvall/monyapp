<template>
  <b-container class="d-flex flex-column align-items-center">
    <Balance/>
    <h2 class="align-self-start mt-4">Last transactions</h2>
    <Resume class="w-100 mt-2"/>
  </b-container>
</template>

<script>
import Balance from '@/components/Balance.vue'
import Resume from '@/components/Resume.vue'


export default {
  name: 'app',
  components: {
    Balance,
    Resume
  }
}
</script>