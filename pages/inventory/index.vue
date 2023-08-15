<script setup lang="ts">
const page = ref<number>(1);
const limit = ref<number>(10);
const nameValue = ref<string>("");

const { data: productsData } = await useRequestGet({
  endpoint: "products",
  query: {
    page: page,
    limit: limit,
    productName: nameValue,
  },
});

async function onNext() {
  if (page.value + 1 <= productsData.value.meta.totalPages) {
    page.value = page.value + 1;
  }
}

async function onPrev() {
  if (page.value != 1) {
    page.value = page.value - 1;
  }
}
</script>

<template>
  <div class="p-5">
    <InventoryOverall :totalProducts="productsData.meta.totalItems" />

    <InventoryTableProducts
      :key="productsData.items || nameValue"
      :rowsData="productsData.items"
      v-model:nameValue="nameValue"
    />

    <Pagination
      :key="page || productsData.items"
      :page="page"
      :totalData="productsData.meta.totalItems"
      :onNext="onNext"
      :onPrev="onPrev"
    />
  </div>
</template>
