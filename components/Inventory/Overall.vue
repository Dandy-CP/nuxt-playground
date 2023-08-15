<script setup lang="ts">
const props = defineProps<{
  totalProducts: number;
}>();

const { totalProducts } = props;
</script>

<template>
  <div class="w-full h-[188px] bg-white rounded-lg p-5">
    <h1 class="text-[20px] font-medium">Overall Inventory</h1>

    <div class="flex flex-row justify-evenly mt-5">
      <div class="flex flex-col items-center gap-3">
        <h1 class="text-[16px] text-[#1570EF] font-semibold">Categories</h1>
        <p class="text-[30px] text-[#5D6679] font-bold">4</p>
      </div>

      <div class="w-[1px] h-auto bg-[#F0F1F3]" />

      <div class="flex flex-col items-center gap-3">
        <h1 class="text-[16px] text-[#E19133] font-semibold">Total Products</h1>
        <p class="text-[30px] text-[#5D6679] font-bold">{{ totalProducts }}</p>
      </div>

      <div class="w-[1px] h-auto bg-[#F0F1F3]" />

      <div class="flex flex-col items-center gap-3">
        <h1 class="text-[16px] text-[#F36960] font-semibold">Low Stocks</h1>
        <p class="text-[30px] text-[#5D6679] font-bold">0</p>
      </div>
    </div>
  </div>
</template>
