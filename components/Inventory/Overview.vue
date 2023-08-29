<script setup lang="ts">
import { IResponseItems } from "types/responseProducts.types";

const { detailProducts, loadingState } = defineProps<{
  detailProducts: IResponseItems;
  loadingState: boolean;
}>();
</script>

<template>
  <div class="mt-5 mb-5 p-2">
    <h1 class="font-medium text-lg">Primary Details</h1>

    <div class="flex flex-row justify-between">
      <div class="flex flex-col gap-5 mt-5 w-1/2">
        <div class="flex flex-row justify-between">
          <p class="text-gray-400">Product Name</p>
          <USkeleton class="h-5 w-1/2" v-if="loadingState" />
          <p v-if="!loadingState">{{ detailProducts?.productName }}</p>
        </div>

        <div class="flex flex-row justify-between">
          <p class="text-gray-400">Product ID</p>
          <USkeleton class="h-5 w-1/2" v-if="loadingState" />
          <p v-if="!loadingState">{{ detailProducts?.id }}</p>
        </div>

        <div class="flex flex-row justify-between">
          <p class="text-gray-400">Product Category</p>
          <USkeleton class="h-5 w-1/2" v-if="loadingState" />
          <p v-if="!loadingState">{{ detailProducts?.category }}</p>
        </div>

        <div class="flex flex-row justify-between">
          <p class="text-gray-400">Price</p>
          <USkeleton class="h-5 w-1/2" v-if="loadingState" />
          <p v-if="!loadingState">
            Rp{{ detailProducts?.price?.toLocaleString() }}
          </p>
        </div>

        <div class="flex flex-row justify-between">
          <p class="text-gray-400">Stock</p>
          <USkeleton class="h-5 w-1/2" v-if="loadingState" />
          <p v-if="!loadingState">{{ detailProducts.stock }} Unit</p>
        </div>
      </div>

      <div class="w-[350px] h-[300px] border-dashed border-2">
        <h1 class="text-center text-xl font-semibold">Image</h1>
      </div>
    </div>
  </div>
</template>
