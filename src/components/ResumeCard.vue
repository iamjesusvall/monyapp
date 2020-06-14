<template>
  <b-card header-tag="header" header-bg-variant="warning" header-class="py-2" body-class="d-flex flex-column justify-content-between py-3"  class="my-2 mx-0">
      <template v-slot:header>
          <div class="d-flex justify-content-between">
            <small>{{ getFormattedDate }}</small>
            <div class="d-flex">
              <small class="mr-3">Incomes: <span class="font-weight-bold">{{totalIncomesDay(date) | toCurrency}}</span></small>
              <small>Expenses: <span class="font-weight-bold">{{totalExpensesDay(date) | toCurrency}}</span></small>
            </div>
          </div>
      </template>
    <b-card-text text-tag="div" v-for="(transaction, index) in totalTransactionsDay(date)" :key="index" class="d-flex justify-content-between">
      <span>{{transaction.category}}</span>
      <span>{{transaction.value | toCurrency}}</span>
    </b-card-text>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ResumeCard',
  props: ['date'],
  computed: {
    ...mapGetters(['totalIncomesDay', 'totalExpensesDay', 'totalTransactionsDay']),
    getFormattedDate() {
      let day = this.date.getUTCDate()
      let month = this.date.getUTCMonth() + 1
      let year = this.date.getUTCFullYear()
      if (month < 10) {
        month = '0' + String(month)
      }
      if (day < 10) {
        day = '0' + String(day)
      }
      return day + '-' + month + '-' + year
    }
  },
}
</script>


