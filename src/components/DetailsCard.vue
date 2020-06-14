<template>
  <div>
    <b-card header-tag="header" header-bg-variant="warning">
      <template v-slot:header>
          <div class="d-flex justify-content-between align-items-center">
            <div class="h4 m-0">{{ transaction.category }}</div>
              <div>
                <b-button
                pill
                @click="toEdit()"
                variant="secondary"
                class="mr-3"
                style="height: 50px; width: 50px;"
                ><b-icon icon="pencil-square"></b-icon></b-button>
                <b-button
                pill
                v-b-modal.remove-transaction
                variant="danger"
                style="height: 50px; width: 50px;"
                ><b-icon icon="trash" ></b-icon></b-button>
              </div>
          </div>
      </template>
      <b-card-text>Type: {{transaction.type | capitalize}}</b-card-text>
      <b-card-text>Date: {{getFormattedDate}}</b-card-text>
      <b-card-text>Amount: {{transaction.value | toCurrency}}</b-card-text>
    </b-card>
    <b-modal
    id="remove-transaction"
    ok-variant="success"
    cancel-variant="danger"
    centered
    title="Delete"
    @ok="toDelete($route.params.id)"
    >
      <p class="text-danger">Are you sure you wan't to delete this Transaction?</p>
    </b-modal>
    <div class="d-flex justify-content-center mt-4">
      <b-button @click="goPrevious" variant="primary" class="mr-3">Go Back</b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'details-card',
  data() {
    return {
      transaction: null
    }
  },
  computed: {
    ...mapGetters(['getTransaction']),
    getFormattedDate() {
      if(this.transaction !== null) {
        let day = this.transaction.date.getUTCDate()
        let month = this.transaction.date.getUTCMonth() + 1
        let year = this.transaction.date.getUTCFullYear()
        if (month < 10) {
          month = '0' + String(month)
        }
        if (day < 10) {
          day = '0' + String(day)
        }
        return day + '-' + month + '-' + year
      }
    }
  },
  created() {
    this.transaction = this.getTransaction(this.$route.params.id)
  },
  methods: {
    ...mapMutations(['deleteTransaction']),
    toEdit() {
      this.$router.push({
        name: 'edit-transaction'
      })
    },
    toDelete(id) {
      this.deleteTransaction(id)
      this.$router.push({
        name: 'Transactions'
      })
    },
    goPrevious() {
      this.$router.go(-1)
    }
  }
}
</script>