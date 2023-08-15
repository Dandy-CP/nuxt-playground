<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <h1>{{ route.params.productID }}</h1>
</template>
