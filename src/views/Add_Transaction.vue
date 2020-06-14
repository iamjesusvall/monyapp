<template>
  <b-container>
    <b-row class="d-flex justify-content-center">
      <b-col sm="6">
        <add-form/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AddForm from '@/components/AddForm.vue'

export default {
  components: {
    AddForm
  }
}
</script>