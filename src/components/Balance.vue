<template>
  <div class="w-100">
    <b-card bg-variant="light" text-variant="dark" class="w-100">
      <b-card-text class="d-flex justify-content-around align-items-center">
        <div class="py-4 text-success h4">{{totalIncomes | toCurrency}}</div>
        <div class="py-4 text-warning h3">|</div>
        <div class="py-4 text-danger h4">{{totalExpenses | toCurrency}}</div>
        <div class="py-4 text-warning h3">|</div>
        <div class="py-4 text-info h4">{{balance | toCurrency}}</div>
      </b-card-text>
    </b-card>
    <b-button :to="{name: 'add-transaction'}" block variant="warning" class="mt-2 py-2"><p class="h4 m-0"><b-icon icon="plus"></b-icon></p></b-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Balance',
  data() {
      return {}
  },
  computed: {
    ...mapGetters(['totalIncomes', 'totalExpenses', 'balance'])
  },
  methods: {}
}
</script>