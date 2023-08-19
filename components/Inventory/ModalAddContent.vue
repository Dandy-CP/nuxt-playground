<script setup lang="ts">
const {
  inputProductName,
  inputCategory,
  inputPrice,
  inputStock,
  isSendData,
  handleAddProduct,
} = defineProps<{
  inputProductName: string;
  inputCategory: string;
  inputPrice: number;
  inputStock: number;
  isSendData: boolean;
  handleAddProduct: () => void;
}>();

defineEmits([
  "update:inputProductName",
  "update:inputCategory",
  "update:inputPrice",
  "update:inputStock",
  "update:modalState",
]);
</script>

<template>
  <UCard>
    <h1 class="font-bold text-lg">Add New Products</h1>

    <div class="flex flex-col gap-7 mt-5">
      <div class="flex flex-row items-center justify-between">
        <p class="font-medium">Product Name</p>
        <div class="w-[273px]">
          <UInput
            :value="inputProductName"
            @input="$emit('update:inputProductName', $event.target.value)"
            :loading="isSendData"
            placeholder="Enter Product Name"
            class="h-[44px] rounded-[8px]"
          />
        </div>
      </div>

      <div class="flex flex-row items-center justify-between">
        <p class="font-medium">Category</p>
        <div class="w-[273px]">
          <UInput
            :value="inputCategory"
            @input="$emit('update:inputCategory', $event.target.value)"
            :loading="isSendData"
            placeholder="Select Product Category"
            class="h-[44px] rounded-[8px]"
          />
        </div>
      </div>

      <div class="flex flex-row items-center justify-between">
        <p class="font-medium">Price</p>
        <div class="w-[273px]">
          <UInput
            :value="inputPrice"
            @input="$emit('update:inputPrice', Number($event.target.value))"
            :loading="isSendData"
            type="number"
            placeholder="Enter Price"
            class="h-[44px] rounded-[8px]"
          />
        </div>
      </div>

      <div class="flex flex-row items-center justify-between">
        <p class="font-medium">Quantity</p>
        <div class="w-[273px]">
          <UInput
            :value="inputStock"
            @input="$emit('update:inputStock', Number($event.target.value))"
            :loading="isSendData"
            type="number"
            placeholder="Enter Product Quantity"
            class="h-[44px] rounded-[8px]"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-5 mt-10">
      <UButton
        color="blue"
        label="Add Product"
        class="w-[116px] h-[40px]"
        @click="handleAddProduct()"
        :loading="isSendData"
        block
      />

      <UButton
        color="gray"
        variant="outline"
        label="Discard"
        class="w-[116px] h-[40px]"
        block
        @click="
          $emit('update:modalState', false);
          $emit('update:inputProductName', '');
          $emit('update:inputCategory', '');
          $emit('update:inputPrice', 0);
          $emit('update:inputStock', 0);
        "
        :loading="isSendData"
      />
    </div>
  </UCard>
</template>
