<script setup lang="ts">
import type IResponseProducts from "../../types/responseProducts.types";

const props = defineProps<{
  rowsData?: IResponseProducts[];
  nameValue: string;
}>();

defineEmits(["update:nameValue"]);

const { rowsData, nameValue } = props;

const columnsData = [
  {
    key: "productName",
    label: "PRODUCT NAME",
  },
  {
    key: "category",
    label: "CATEGORY",
  },
  {
    key: "price",
    label: "PRICE",
  },
  {
    key: "stock",
    label: "STOCK",
  },
  {
    key: "actions",
  },
];

const itemsDropdown = (row: any) => [
  [
    {
      label: "Details",
      icon: "i-heroicons-eye-20-solid",
      click: () => navigateTo(`/inventory/${row.id}`),
    },
  ],
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("Edit", row.id),
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
    },
  ],
];
</script>

<template>
  <div class="w-full bg-white rounded-xl p-5 mt-10">
    <div class="flex flex-row justify-between items-center">
      <h1 class="text-[20px] text-[#383E49] font-medium">Products</h1>

      <div class="flex flex-row gap-5">
        <UButton
          color="blue"
          variant="solid"
          class="h-[40px]"
          icon="i-heroicons-plus-circle"
          >Add Product</UButton
        >
        <UButton
          color="white"
          variant="outline"
          icon="i-heroicons-funnel"
          class="h-[40px] hover:bg-[#D0D3D9]"
          >Fillter</UButton
        >
      </div>
    </div>

    <UInput
      :value="nameValue"
      @input="$emit('update:nameValue', $event.target.value)"
      icon="i-heroicons-magnifying-glass-20-solid"
      size="md"
      color="gray"
      :trailing="false"
      placeholder="Search Products"
      class="mt-5 w-[350px]"
    />

    <UTable
      :rows="rowsData"
      :columns="columnsData"
      @select=""
      class="mt-5 mb-10"
    >
      <template #actions-data="{ row }">
        <UDropdown :items="itemsDropdown(row)">
          <UButton
            color="gray"
            variant="soft"
            icon="i-heroicons-ellipsis-horizontal-20-solid"
          />
        </UDropdown>
      </template>
    </UTable>
  </div>
</template>
