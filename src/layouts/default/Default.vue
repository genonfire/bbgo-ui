<template>
  <default-bar />
  <default-view />
</template>

<script setup>
import DefaultBar from './AppBar.vue'
import DefaultView from './View.vue'
</script>

<style>
  a {
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }

  .v-theme--light a {
    color: #000;
  }
  .v-theme--dark a {
    color: #fff;
  }
</style>
