<template>
    <b-card-group deck class="flex-column">
        <ResumeCard v-for="(date, index) of transactionsDates" :key="index" :date="date"/>
    </b-card-group>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import ResumeCard from '@/components/ResumeCard.vue'

export default {
    name: 'Resume',
    components: {
        ResumeCard
    },
    computed: {
        ...mapState(['transactions']),
        ...mapGetters(['transactionsDates'])
    },
    methods: {}
}
</script>