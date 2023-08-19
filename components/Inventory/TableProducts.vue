<script setup lang="ts">
import type IResponseProducts from "../../types/responseProducts.types";

const toast = useToast();
const { rowsData, nameValue, currentPage, totalPage, onNext, onPrev, refetch } =
  defineProps<{
    rowsData?: IResponseProducts[];
    nameValue: string;
    currentPage: number;
    totalPage: number;
    onNext: () => void;
    onPrev: () => void;
    refetch: () => void;
  }>();

defineEmits(["update:nameValue", "update:modalState"]);

const handleDeleteProducts = async (id: string) => {
  const { status, error } = await useRequestSend({
    endpoint: `products/${id}`,
    method: "DELETE",
  });

  if (status.value === "error") {
    console.log(error.value);
    toast.add({
      title: "Failed Delete Products",
      description: error.value?.message,
      icon: "i-heroicons-information-circle",
      color: "red",
    });
  }

  if (status.value === "success") {
    toast.add({
      title: "Success Delete Products",
      icon: "i-heroicons-check-badge",
      color: "green",
    });
    refetch();
  }
};

const columnsData = [
  {
    key: "productName",
    label: "PRODUCT NAME",
    sortable: true,
  },
  {
    key: "category",
    label: "CATEGORY",
    sortable: true,
  },
  {
    key: "price",
    label: "PRICE",
    sortable: true,
  },
  {
    key: "stock",
    label: "STOCK",
    sortable: true,
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
      click: () => console.log(row.id),
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => handleDeleteProducts(row.id),
    },
  ],
];
</script>

<template>
  <div class="w-full bg-white rounded-xl p-5 mt-10">
    <div class="flex flex-row justify-between items-center">
      <h1 class="text-[20px] text-[#383E49] font-medium">Products</h1>

      <UButton
        color="blue"
        variant="solid"
        class="h-[40px]"
        icon="i-heroicons-plus-circle"
        @click="$emit('update:modalState', true)"
        >Add Product</UButton
      >
    </div>

    <div class="w-[500px]">
      <UInput
        :value="nameValue"
        @input="$emit('update:nameValue', $event.target.value)"
        icon="i-heroicons-magnifying-glass-20-solid"
        size="md"
        color="gray"
        :trailing="false"
        placeholder="Search Products"
        class="mt-5"
      />
    </div>

    <UTable
      :rows="rowsData"
      :columns="columnsData"
      :sort="{ column: 'productName', direction: 'asc' }"
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

    <div class="flex flex-row justify-center items-center gap-5">
      <UButton
        icon="i-heroicons-arrow-small-left-20-solid"
        color="blue"
        variant="soft"
        @click="onPrev"
      />
      <p class="font-medium">{{ currentPage }} / {{ totalPage }}</p>
      <UButton
        icon="i-heroicons-arrow-small-right-20-solid"
        color="blue"
        variant="soft"
        @click="onNext"
      />
    </div>
  </div>
</template>
