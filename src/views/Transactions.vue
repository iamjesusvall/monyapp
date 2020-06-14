<template>
  <b-container>
    <b-pagination
    pills
    align="center"
    hide-goto-end-buttons
    v-model="currentPage"
    :total-rows="totalRows"
    :per-page="perPage"
    first-text="First"
    prev-text="Prev"
    next-text="Next"
    last-text="Last"
    aria-controls="table-transactions"
    ></b-pagination>
    <b-table
    id="table-transactions"
    show-empty
    stacked="md"
    @row-clicked="plop"
    :items="transactions"
    :fields="fields"
    :current-page="currentPage"
    :per-page="perPage"
    hover
    >
    <template v-slot:cell(date)="row">
      {{formattedDate(row.value)}}
    </template>
    <template v-slot:cell(value)="row">
      {{row.value | toCurrency}}
    </template>
    </b-table>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      fields: [

        {key: "category", label: "Category", sortable: true},
        {key: "date", label: "Date", sortable: true},
        {key:"value", label:"Amount", sortable: true},
        //{key:"actions", label:"Actions"}
      ],
      currentPage: 1,
      perPage: 5,
    }
  },
  computed: {
    ...mapState(['transactions']),
    totalRows() {return this.transactions.length}
  },
  methods: {
    plop(item, index, event) {
      this.$router.push({ name: 'details', params: { id: item.id } })
    },
    formattedDate(date) {
      let day = date.getUTCDate()
      let month = date.getUTCMonth() + 1
      let year = date.getUTCFullYear()

      if ( day < 10 ) {
        day = '0' + day.toString()
      }
      if ( month < 10 ) {
        month = '0' + month.toString()
      }
      return day + '-' + month + '-' + year
    }
  }
}
</script>
