<script setup lang="ts">
const props = defineProps<{
  page: number;
  totalData: number;
  onNext: () => {};
  onPrev: () => {};
}>();

const { page, totalData, onNext, onPrev } = props;
</script>

<template>
  <UPagination
    v-model="page"
    :max="20"
    :page-count="5"
    :total="totalData"
    :ui="{ rounded: 'first-of-type:rounded-s-md last-of-type:rounded-e-md' }"
    :active-button="{ color: 'blue' }"
    :inactive-button="{ color: 'gray' }"
    size="xl"
    class="mt-5 mb-5 flex flex-row justify-center"
  >
    <template #prev>
      <UTooltip text="Previous page">
        <UButton
          icon="i-heroicons-arrow-small-left-20-solid"
          color="blue"
          :ui="{ rounded: 'rounded-full' }"
          class="rtl:[&_span:first-child]:rotate-180 me-2"
          @click="onPrev()"
        />
      </UTooltip>
    </template>

    <template #next>
      <UTooltip text="Next page">
        <UButton
          icon="i-heroicons-arrow-small-right-20-solid"
          color="blue"
          :ui="{ rounded: 'rounded-full' }"
          class="rtl:[&_span:last-child]:rotate-180 ms-2"
          @click="onNext()"
        />
      </UTooltip>
    </template>
  </UPagination>
</template>
