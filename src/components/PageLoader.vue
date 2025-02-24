<script setup lang="ts">
  import useStore from '@/stores/store';
  import { storeToRefs } from 'pinia';
  const store = useStore();
  const { loading } = storeToRefs(store);
</script>

<template>
  <div class="page-loader" v-if="loading">
    <div class="spinner-border text-primary" style="width: 3rem; height: 3rem" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
