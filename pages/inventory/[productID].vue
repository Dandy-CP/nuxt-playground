<script setup lang="ts">
import type IInputProduct from "../../types/inputProduct.types";
import type { IResponseItems } from "types/responseProducts.types";

const route = useRoute();
const toast = useToast();
const loadingState = ref<boolean>(false);
const modalState = ref<boolean>(false);
const isSendData = ref<boolean>(false);
const inputProducts = ref<IInputProduct>({
  productName: "",
  category: "",
  price: 0,
  stock: 0,
});

const items = [
  {
    slot: "overview",
    label: "Overview",
  },
  {
    slot: "purchases",
    label: "Purchases",
  },
  {
    slot: "history",
    label: "History",
  },
];

const {
  data: detailProducts,
  pending,
  error,
  refresh,
} = await useRequestApi.get<IResponseItems>({
  endpoint: `products/${route.params.productID}`,
});

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const handleEditProducts = async () => {
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
    endpoint: `products/${route.params.productID}`,
    method: "PUT",
    payload: inputProducts.value,
  });

  if (status.value === "error") {
    console.log(error.value);
    toast.add({
      title: "Failed Update Products",
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
      title: "Success Update Products",
      icon: "i-heroicons-check-badge",
      color: "green",
    });
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

watch(modalState, (status) => {
  if (status) {
    inputProducts.value.productName = detailProducts.value!.productName;
    inputProducts.value.category = detailProducts.value!.category;
    inputProducts.value.price = detailProducts.value!.price;
    inputProducts.value.stock = detailProducts.value!.stock;
  }
});

useHead({
  title: `Inventory | ${detailProducts.value!.productName}`,
});
</script>

<template>
  <div class="p-5">
    <div class="w-full bg-white rounded-xl p-5">
      <div class="flex flex-row items-center justify-between">
        <h1 class="font-bold text-2xl">
          {{ detailProducts?.productName }}
        </h1>
        <UButton
          label="Edit"
          color="gray"
          variant="outline"
          icon="i-heroicons-pencil-square"
          size="md"
          @click="modalState = true"
        />
      </div>

      <UTabs :items="items" class="w-full mt-5">
        <template #overview>
          <InventoryOverview
            :detailProducts="(detailProducts as IResponseItems)"
            :loadingState="loadingState"
          />
        </template>

        <template #purchases>
          <h1>Purchases</h1>
        </template>

        <template #history>
          <h1>History</h1>
        </template>
      </UTabs>
    </div>

    <UModal v-model="modalState">
      <InventoryModalAddContent
        v-model:inputProductName="inputProducts.productName"
        v-model:inputCategory="inputProducts.category"
        v-model:inputPrice="inputProducts.price"
        v-model:inputStock="inputProducts.stock"
        :handleAddProduct="handleEditProducts"
        v-model:modalState="modalState"
        :isSendData="isSendData"
      />
    </UModal>
  </div>
</template>
