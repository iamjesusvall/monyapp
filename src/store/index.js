import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    transactions: [],
    categories: [
      {type: 'income', value: 'Salary', text: 'Salary'},
      {type: 'income', value: 'Sell', text: 'Sales'},
      {type: 'income', value: 'Salary', text: 'Prices'},
      {type: 'income', value: 'Salary', text: 'Subsidies'},
      {type: 'income', value: 'Salary', text: 'Rent'},
      {type: 'income', value: 'Salary', text: 'Refund'},
      {type: 'income', value: 'Salary', text: 'Coupons'},
      {type: 'income', value: 'Salary', text: 'Lotery'},
      {type: 'income', value: 'Salary', text: 'Dividends'},
      {type: 'income', value: 'Salary', text: 'Investments'},
      {type: 'income', value: 'Salary', text: 'Others'},
      {type: 'expense', value: 'Transport', text: 'Transportation'},
      {type: 'expense', value: 'Food', text: 'Utilities'},
      {type: 'expense', value: 'Food', text: 'Food'},
      {type: 'expense', value: 'Food', text: 'House'},
      {type: 'expense', value: 'Food', text: 'Car'},
      {type: 'expense', value: 'Food', text: 'Entertainment'},
      {type: 'expense', value: 'Food', text: 'Shopping'},
      {type: 'expense', value: 'Food', text: 'Clothing'},
      {type: 'expense', value: 'Food', text: 'Insurance'},
      {type: 'expense', value: 'Food', text: 'Tax'},
      {type: 'expense', value: 'Food', text: 'Health'},
      {type: 'expense', value: 'Food', text: 'Telephone'},
      {type: 'expense', value: 'Food', text: 'Cigarette'},
      {type: 'expense', value: 'Food', text: 'Sport'},
      {type: 'expense', value: 'Food', text: 'Baby'},
      {type: 'expense', value: 'Food', text: 'Pet'},
      {type: 'expense', value: 'Food', text: 'Beauty'},
      {type: 'expense', value: 'Food', text: 'Electronics'},
      {type: 'expense', value: 'Food', text: 'Hamburguer'},
      {type: 'expense', value: 'Food', text: 'Wine'},
      {type: 'expense', value: 'Food', text: 'Vegetables'},
      {type: 'expense', value: 'Food', text: 'Snacks'},
      {type: 'expense', value: 'Food', text: 'Gift'},
      {type: 'expense', value: 'Food', text: 'Social'},
      {type: 'expense', value: 'Food', text: 'Travel'},
      {type: 'expense', value: 'Food', text: 'Education'},
      {type: 'expense', value: 'Food', text: 'Fruits'},
      {type: 'expense', value: 'Food', text: 'Book'},
      {type: 'expense', value: 'Food', text: 'Office'},
      {type: 'expense', value: 'Food', text: 'Others'},
    ]
  },
  getters: {
    transactionsDates(state) {
      return state.transactions.reduce((sum, transaction) => {
        if (!sum.some(date => date.getTime() === transaction.date.getTime())) {
          sum.push(transaction.date)
        }
        return sum
      }, []).sort((a, b) => b-a).slice(0, 5)
    },
    totalIncomesDay: (state) => (date) => {
      return state.transactions.filter(transaction => transaction.date.getTime() === date.getTime()).reduce((sum, transaction) => {
        if(transaction.type === 'income') {
          return sum += transaction.value
        }
        return sum
      }, 0)
    },
    totalExpensesDay: (state) => (date) => {
      return state.transactions.filter(transaction => transaction.date.getTime() === date.getTime()).reduce((sum, transaction) => {
        if(transaction.type === 'expense') {
          return sum += transaction.value
        }
        return sum
      }, 0)
    },
    totalTransactionsDay: (state) => (date) => {
      return state.transactions.filter(transaction => transaction.date.getTime() === date.getTime())
    },
    totalIncomes(state) {
      return state.transactions.reduce((sum, transaction) => (transaction.type === 'income') ? sum += transaction.value : sum, 0)
    },
    totalExpenses(state) {
      return state.transactions.reduce((sum, transaction) => (transaction.type === 'expense') ? sum += transaction.value : sum, 0)
    },
    balance(state) {
      return state.transactions.reduce((sum, transaction) => (transaction.type === 'income') ? sum += transaction.value : sum, 0) - state.transactions.reduce((sum, transaction) => (transaction.type === 'expense') ? sum += transaction.value : sum, 0)
    },
    categories: (state) => (type) => {
      return state.categories.filter(cat => cat.type === type);
    },
    getTransaction: (state) => (id) => {
      return state.transactions.find(transaction => transaction.id === id)
    }
  },
  mutations: {
    addTransaction(state, data) {
      state.transactions.push(data)
      localStorage.setItem('money-app', JSON.stringify(state.transactions.map(transaction => {
        let item = Object.assign({}, transaction)
        item.date = item.date.getTime()
        return item
      })))
    },
    editTransaction(state, data) {
      let index = state.transactions.findIndex(transaction => transaction.id === data.id)
      state.transactions[index] = data
      localStorage.setItem('money-app', JSON.stringify(state.transactions.map(transaction => {
        let item = Object.assign({}, transaction)
        item.date = item.date.getTime()
        return item
      })))
    },
    deleteTransaction(state, id) {
      let newArr = state.transactions.reduce((sum, transaction) => {
        if(transaction.id !== id) {
          sum.push(transaction)
        }
          return sum
      }, [])
      state.transactions = newArr
      localStorage.setItem('money-app', JSON.stringify(state.transactions.map(transaction => {
        let item = Object.assign({}, transaction)
        item.date = item.date.getTime()
        return item
      })))
    },
    initStore(state) {
      let data = JSON.parse(localStorage.getItem('money-app'))
      data = data.map(transaction => {
        let item = Object.assign({}, transaction)
        item.date = new Date(item.date)
        return item
      })
      if (data) {
        state.transactions = data
      }
    }
  },
  actions: {},
  modules: {}
})
