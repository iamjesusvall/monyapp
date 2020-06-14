<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <b-form-group class="d-flex justify-content-center">

        <b-form-radio-group
        v-model="$v.newData.type.$model"
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
        v-model="$v.newData.category.$model"
        :options="categories(newData.type)"
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
        v-model="$v.newData.date.$model"
        :state="validateState('date')"
        placeholder="Choose a date"
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
        v-model.number="$v.newData.value.$model"
        :state="validateState('value')"
        placeholder="Enter the amount"
        aria-describedby="input-amount-feedback"
        ></b-form-input>
        <b-form-invalid-feedback
          id="input-amount-feedback" v-if="!$v.newData.value.required"
        >Amount is Required</b-form-invalid-feedback>
        <b-form-invalid-feedback
          id="input-amount-feedback" v-else-if="!$v.newData.value.numeric"
        >Must be numeric.</b-form-invalid-feedback>
        <b-form-invalid-feedback
          id="input-amount-feedback" v-else-if="!$v.newData.value.minValue"
        >Must be greater than zero.</b-form-invalid-feedback>
      </b-form-group>

      <div class="d-flex justify-content-center mt-4">
        <b-button @click="goPrevious" type="reset" variant="primary" class="mr-3">Previous</b-button>
        <b-button type="submit" variant="success">Submit</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { v1 as uuidv1 } from 'uuid'
import { validationMixin } from "vuelidate"
import { required, numeric, minValue } from "vuelidate/lib/validators"


export default {
  name: 'add-form',
  mixins: [validationMixin],
  data() {
    return {
      newData: {
        id: null,
        type: null,
        category: null,
        date: null,
        value: null,
      },
      type: [
        {text: 'Income', value: 'income'},
        {text: 'Expense', value: 'expense'}
      ]
    }
  },
  computed: {
    ...mapGetters(['categories'])
  },
  validations: {
    newData: {
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
    ...mapMutations(['addTransaction']),
    onSubmit() {
      this.newData.id = uuidv1()
      this.$v.newData.$touch();
      if (this.$v.newData.$anyError) {
        return;
      }
      else {
        this.newData.date = new Date(this.newData.date)
        this.addTransaction(this.newData)
        this.$router.push({name: 'Home'})
      }
    },
    goPrevious() {
      this.$router.go(-1)
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.newData[name];
      return $dirty ? !$error : null;
    }
  }
}
</script>