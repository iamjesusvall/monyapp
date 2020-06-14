<template>
  <b-row class="d-flex justify-content-center">

    <b-col sm="6">
      <b-form @submit.prevent="onSubmit">
        <b-form-group class="d-flex justify-content-center">

          <b-form-radio-group
          v-model="$v.transaction.type.$model"
          :options="type"
          buttons
          button-variant="warning"
          :state="validateState('type')"
          aria-describedby="type-radios-feedback"
          class="d-flex justify-content-center"
          ></b-form-radio-group>
          <b-form-invalid-feedback
            id="type-radios-feedback"
          >Required.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
        label="Category:"
        >
          <b-form-select
          v-model="$v.transaction.category.$model"
          :options="categories(transaction.type)"
          :state="validateState('category')"
          aria-describedby="select-category-feedback"
          ></b-form-select>
          <b-form-invalid-feedback
            id="select-category-feedback"
          >Required.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
        label="Date: "
        >
          <b-datepicker
          id="datepicker"
          v-model="$v.transaction.date.$model"
          placeholder="Choose a date"
          :state="validateState('date')"
          aria-describedby="datepicker-feedback"
          ></b-datepicker>
          <b-form-invalid-feedback
            id="datepicker-feedback"
          >Required.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group>
          <label for="input-amount">Amount:</label>
          <b-form-input
          id="input-amount"
          v-model.number="$v.transaction.value.$model"
          :state="validateState('value')"
          placeholder="Enter the amount"
          aria-describedby="input-amount-feedback"
          ></b-form-input>
          <b-form-invalid-feedback
            id="input-amount-feedback" v-if="!$v.transaction.value.required"
          >Amount is Required</b-form-invalid-feedback>
          <b-form-invalid-feedback
            id="input-amount-feedback" v-else-if="!$v.transaction.value.numeric"
          >Must be numeric.</b-form-invalid-feedback>
          <b-form-invalid-feedback
            id="input-amount-feedback" v-else-if="!$v.transaction.value.minValue"
          >Must be greater than zero.</b-form-invalid-feedback>
        </b-form-group>

        <div class="d-flex justify-content-center mt-4">
          <b-button @click="goPrevious" variant="danger" class="mr-3">Cancel</b-button>
          <b-button type="submit" variant="success">Submit</b-button>
        </div>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { validationMixin } from "vuelidate"
import { required, numeric, minValue } from "vuelidate/lib/validators"

export default {
  name: 'edit-transaction',
  mixins: [validationMixin],
  data() {
    return {
      transaction: null,
      type: [
        {text: 'Income', value: 'income'},
        {text: 'Expense', value: 'expense'}
      ]
    }
  },
  computed: {
    ...mapGetters(['getTransaction', 'categories']),
    getFormattedDate() {
      if(this.transaction){
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
  validations: {
    transaction: {
      id: {},
      type: {
        required
      },
      category: {
        required
      },
      date: {
        required
      },
      value: {
        required,
        numeric,
        minValue: minValue(1)
      },
    }
  },
  methods: {
    ...mapMutations(['editTransaction']),
    goPrevious() {
      this.$router.go(-1)
    },
    onSubmit() {
      this.$v.transaction.$touch();
      if (this.$v.transaction.$anyError) {
        return;
      }
      else {
        this.transaction.date = new Date(this.transaction.date)
        this.editTransaction(this.transaction)
        this.$router.go(-1)
      }
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.transaction[name];
      return $dirty ? !$error : null;
    }
  }
}
</script>