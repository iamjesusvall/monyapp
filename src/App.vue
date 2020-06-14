<template>
  <div>
    <b-navbar type="light" variant="warning">
      <b-container>
        <b-navbar-nav class="w-100" fill align="center">
          <b-nav-item :to="{name: 'Home'}" exact="">Home</b-nav-item>
          <b-nav-item :to="{name: 'Transactions'}">Transactions</b-nav-item>
        </b-navbar-nav>
      </b-container>
    </b-navbar>
    <router-view class="pt-5"></router-view>
  </div>
</template>
