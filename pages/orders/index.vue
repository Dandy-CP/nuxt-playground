<script setup lang="ts">
import type IResponseOrder from "types/responseOrders.type";

const page = ref<number>(1);
const limit = ref<number>(10);
const valueSearch = ref<string>("");
const loadingState = ref<boolean>(false);

const {
  data: ordersData,
  pending,
  refresh,
} = await useRequestApi.get<IResponseOrder>({
  endpoint: "transaction",
  query: {
    page: page,
    limit: limit,
    productName: valueSearch,
  },
});

const onNext = () => {
  if (page.value + 1 <= ordersData?.value!.meta.totalPages) {
    page.value = page.value + 1;
  }
};

const onPrev = () => {
  if (page.value != 1) {
    page.value = page.value - 1;
  }
};

watch(pending, (status) => {
  if (status) {
    loadingState.value = true;
  }

  if (!status) {
    loadingState.value = false;
  }
});

useHead({
  title: "Orders",
});
</script>

<template>
  <div class="p-5">
    <OrdersOverall />

    <OrdersTableOrders
      :ordersData="(ordersData as IResponseOrder)"
      :currentPage="ordersData!.meta.currentPage"
      :totalPage="ordersData!.meta.totalPages"
      :loadingState="loadingState"
      :onNext="onNext"
      :onPrev="onPrev"
    />
  </div>
</template>
