<script setup lang="ts">
import type IResponseUsers from "types/responseUsers.types";

const { usersData, currentPage, totalPage, onNext, onPrev } = defineProps<{
  usersData: IResponseUsers;
  currentPage: number;
  totalPage: number;
  onNext: () => void;
  onPrev: () => void;
}>();

const columnsData = [
  {
    key: "name",
    label: "Name",
    sortable: true,
  },
  {
    key: "email",
    label: "Email",
    sortable: true,
  },
  {
    key: "role",
    label: "Role",
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
      click: () => navigateTo(`/orders/${row.id}`),
    },
  ],
];
</script>

<template>
  <div class="w-full bg-white rounded-xl p-5 mt-10">
    <h1 class="text-[20px] text-[#383E49] font-medium">Users</h1>

    <div class="w-[500px]">
      <UInput
        icon="i-heroicons-magnifying-glass-20-solid"
        size="md"
        color="gray"
        :trailing="false"
        placeholder="Search By Name"
        class="mt-5"
      />
    </div>

    <UTable
      :rows="usersData.items"
      :columns="columnsData"
      :sort="{ column: 'name', direction: 'asc' }"
      :loading="false"
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
