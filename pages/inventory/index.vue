<script setup lang="ts">
import type IResponseProducts from "types/responseProducts.types";
import type IInputProduct from "../../types/inputProduct.types";

const page = ref<number>(1);
const limit = ref<number>(10);
const nameValue = ref<string>("");
const modalState = ref<boolean>(false);
const isSendData = ref<boolean>(false);
const loadingState = ref<boolean>(false);
const inputProducts = ref<IInputProduct>({
  productName: "",
  category: "",
  price: 0,
  stock: 0,
});
const valueSearch = refDebounced(nameValue, 1000);
const toast = useToast();

const {
  data: productsData,
  pending,
  refresh,
} = await useRequestApi.get<IResponseProducts>({
  endpoint: "products",
  query: {
    page: page,
    limit: limit,
    productName: valueSearch,
  },
});

const handleAddProduct = async () => {
  if (
    inputProducts.value.productName.length === 0 &&
    inputProducts.value.category.length === 0 &&
    inputProducts.value.price === 0 &&
    inputProducts.value.stock === 0
  ) {
    toast.add({
      title: "All Input Must Be Filled",
      icon: "i-heroicons-information-circle",
      color: "red",
    });
    return;
  }

  isSendData.value = true;

  const { status, error } = await useRequestApi.request({
    endpoint: "products",
    method: "POST",
    payload: inputProducts.value,
  });

  if (status.value === "error") {
    console.log(error.value);
    toast.add({
      title: "Failed Add Products",
      description: error.value?.message,
      icon: "i-heroicons-information-circle",
      color: "red",
    });
    isSendData.value = false;
  }

  if (status.value === "success") {
    refresh();
    modalState.value = false;
    isSendData.value = false;
    toast.add({
      title: "Success Add Products",
      icon: "i-heroicons-check-badge",
      color: "green",
    });
  }
};

const onNext = () => {
  if (page.value + 1 <= productsData?.value!.meta?.totalPages) {
    page.value = page.value + 1;
  }
};

const onPrev = () => {
  if (page.value != 1) {
    page.value = page.value - 1;
  }
};

watch(modalState, (status) => {
  if (!status) {
    inputProducts.value.category = "";
    inputProducts.value.productName = "";
    inputProducts.value.price = 0;
    inputProducts.value.stock = 0;
  }
});

watch(pending, (status) => {
  if (status) {
    loadingState.value = true;
  }

  if (!status) {
    loadingState.value = false;
  }
});

useHead({
  title: "Inventory",
});
</script>

<template>
  <div class="p-5">
    <InventoryOverall :totalProducts="productsData!.meta.totalItems" />

    <InventoryTableProducts
      :rowsData="productsData?.items"
      v-model:modalState="modalState"
      v-model:nameValue="nameValue"
      :currentPage="productsData!.meta.currentPage"
      :totalPage="productsData!.meta.totalPages"
      :onNext="onNext"
      :onPrev="onPrev"
      :refetch="refresh"
      :loadingState="loadingState"
    />

    <UModal v-model="modalState">
      <InventoryModalAddContent
        v-model:inputProductName="inputProducts.productName"
        v-model:inputCategory="inputProducts.category"
        v-model:inputPrice="inputProducts.price"
        v-model:inputStock="inputProducts.stock"
        :handleAddProduct="handleAddProduct"
        v-model:modalState="modalState"
        :isSendData="isSendData"
      />
    </UModal>
  </div>
</template>
