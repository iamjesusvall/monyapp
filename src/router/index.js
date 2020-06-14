import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

  const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
  },
  {
    path: '/transactions',
    name: 'Transactions',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "transactions" */ '@/views/Transactions.vue')
  },
  {
    path: '/transaction/add',
    name: 'add-transaction',
    component: () => import(/* webpackChunkName: "add_transaction" */ '@/views/Add_Transaction.vue')
  },
  {
    path: '/transaction/:id',
    name: 'transaction',
    component: () => import(/* webpackChunkName: "transaction" */ '@/views/Transaction.vue'),
    children: [
      {
        path: '',
        name: 'details',
        component: () => import(/* webpackChunkName: "details" */ '@/components/DetailsCard.vue')
      },
      {
        path: 'edit',
        name: 'edit-transaction',
        component: () => import(/* webpackChunkName: "edit_transaction" */ '@/components/EditTransaction.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
