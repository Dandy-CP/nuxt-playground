<script setup lang="ts">
import type IResponseOrder from "types/responseOrders.type";

const { ordersData, currentPage, totalPage, onNext, onPrev } = defineProps<{
  ordersData: IResponseOrder;
  currentPage: number;
  totalPage: number;
  onNext: () => void;
  onPrev: () => void;
}>();

const columnsData = [
  {
    key: "buyerName",
    label: "Buyer Name",
    sortable: true,
  },
  {
    key: "buyDate",
    label: "Buy Date",
    sortable: true,
  },
  {
    key: "invoice",
    label: "Invoice",
    sortable: true,
  },
  {
    key: "shippingMethode",
    label: "Shipping",
    sortable: true,
  },
  {
    key: "paymentMethode",
    label: "Payment",
    sortable: true,
  },
  {
    key: "items",
    label: "Ordered Products",
    sortable: true,
  },
  {
    key: "totalPrice",
    label: "Total Price",
    sortable: true,
  },
  {
    key: "isPaid",
    label: "Is Paid",
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
      click: () => navigateTo(`/orders/${row.invoice}`),
    },
  ],
];
</script>

<template>
  <div class="w-full bg-white rounded-xl p-5 mt-10">
    <h1 class="text-[20px] text-[#383E49] font-medium">Orders Transaction</h1>

    <div class="w-[500px]">
      <UInput
        icon="i-heroicons-magnifying-glass-20-solid"
        size="md"
        color="gray"
        :trailing="false"
        placeholder="Search"
        class="mt-5"
      />
    </div>

    <UTable
      :rows="ordersData.items"
      :columns="columnsData"
      :sort="{ column: 'buyerName', direction: 'asc' }"
      :loading="false"
      @select=""
      class="mt-5 mb-10"
    >
      <template #buyDate-data="{ row }">
        <p>{{ new Date(row.buyDate).toLocaleString() }}</p>
      </template>

      <template #items-data="{ row }">
        <UPopover mode="hover">
          <p>{{ row.items.length }}</p>
          <template #panel>
            <p class="font-semibold pl-3 mt-3">Ordered Items:</p>
            <div
              v-for="items in row.items"
              class="flex flex-row justify-between w-[200px] p-3"
            >
              <p class="font-medium">{{ items.productName }}</p>
              <p class="font-medium">{{ items.quantity }}x</p>
            </div>
          </template>
        </UPopover>
      </template>

      <template #totalPrice-data="{ row }">
        <p>Rp{{ row.totalPrice?.toLocaleString() }}</p>
      </template>

      <template #isPaid-data="{ row }">
        <UBadge
          :key="row.isPaid"
          :color="row.isPaid ? 'green' : 'red'"
          variant="solid"
          :label="row.isPaid ? 'PAID' : 'UNPAID'"
          size="md"
        />
      </template>

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
        @click="onNext()"
      />
      <p class="font-medium">{{ currentPage }} / {{ totalPage }}</p>
      <UButton
        icon="i-heroicons-arrow-small-right-20-solid"
        color="blue"
        variant="soft"
        @click="onPrev()"
      />
    </div>
  </div>
</template>
