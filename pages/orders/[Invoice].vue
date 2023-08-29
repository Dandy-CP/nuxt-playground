<script setup lang="ts">
import type IResponseOrder from "types/responseOrders.type";

const route = useRoute();
const toast = useToast();
const modalState = ref<boolean>(false);
const loadingState = ref<boolean>(false);

const {
  data: ordersData,
  pending,
  refresh,
} = await useRequestApi.get<IResponseOrder>({
  endpoint: "transaction",
  query: {
    invoice: route.params.Invoice,
  },
});

const handleUnpaidToPaid = async () => {
  loadingState.value = true;
  const { status, error } = await useRequestApi.request({
    endpoint: "transaction/unpaid-to-paid",
    method: "POST",
    payload: {
      id_transaction: ordersData?.value!.items[0].id,
      invoice: ordersData?.value!.items[0].invoice,
    },
  });

  if (status.value === "error") {
    console.log(error.value);
    toast.add({
      title: "Failed To Paid Orders",
      description: error.value?.message,
      icon: "i-heroicons-information-circle",
      color: "red",
    });
    loadingState.value = false;
  }

  if (status.value === "success") {
    refresh();
    toast.add({
      title: "Success Paid Orders",
      icon: "i-heroicons-check-badge",
      color: "green",
    });
    modalState.value = false;
    loadingState.value = false;
  }
};
</script>

<template>
  <div class="p-5">
    <div class="w-full bg-white rounded-xl p-5">
      <h1 class="font-bold text-2xl">Order Details</h1>

      <hr class="mt-3 mb-3" />

      <div class="mt-3 mb-5 p-2">
        <h1 class="font-bold text-lg">Details</h1>

        <div class="flex flex-row justify-between">
          <div class="flex flex-col gap-5 mt-5 w-1/2">
            <div class="flex flex-row justify-between">
              <p class="text-gray-400">Buyer Name</p>
              <p>{{ ordersData?.items[0].buyerName }}</p>
            </div>

            <div class="flex flex-row justify-between">
              <p class="text-gray-400">Address Shipping</p>
              <p>{{ ordersData?.items[0].addressBuyer }}</p>
            </div>

            <div class="flex flex-row justify-between">
              <p class="text-gray-400">Shipping</p>
              <p>{{ ordersData?.items[0].shippingMethode }}</p>
            </div>

            <div class="flex flex-row justify-between">
              <p class="text-gray-400">Invoice</p>
              <p>{{ ordersData?.items[0].invoice }}</p>
            </div>

            <div class="flex flex-row justify-between">
              <p class="text-gray-400">Buy Date</p>
              <p>
                {{ new Date(ordersData!.items[0].buyDate).toLocaleString() }}
              </p>
            </div>

            <div class="flex flex-row justify-between">
              <p class="text-gray-400">Payment Methode</p>
              <p>
                {{ ordersData?.items[0].paymentMethode }}
              </p>
            </div>
          </div>

          <div class="mt-5 w-[500px]">
            <h1 class="font-bold text-lg mb-3">Ordered Items</h1>
            <div
              class="bg-[#F0F1F3] w-full h-[40px] p-2 rounded-md flex flex-row justify-between"
            >
              <p class="font-medium">Items</p>
              <p class="font-medium">Quantity</p>
            </div>

            <div v-for="items in ordersData?.items[0].items" class="p-2">
              <div :key="items.idProduct" class="flex flex-row justify-between">
                <p>{{ items.productName }}</p>
                <p>{{ items.quantity }}x</p>
              </div>
              <hr class="mt-2" />
            </div>

            <div class="flex flex-row justify-between mb-3">
              <p>Total:</p>
              <p class="text-[18px] font-bold">
                Rp{{ ordersData?.items[0].totalPrice.toLocaleString() }}
              </p>
            </div>

            <div class="flex flex-row justify-end">
              <UBadge
                :color="ordersData?.items[0].isPaid ? 'green' : 'red'"
                variant="solid"
                :label="ordersData?.items[0].isPaid ? 'PAID' : 'UNPAID'"
                size="lg"
                class="flex justify-center w-[200px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-5 mt-10">
        <UButton
          v-if="!ordersData?.items[0].isPaid"
          label="Mark As Paid"
          color="gray"
          variant="outline"
          icon="i-heroicons-check-circle"
          size="md"
          @click="modalState = true"
        />

        <UButton
          label="Print Invoice"
          color="blue"
          icon="i-heroicons-document"
          class="h-[40px]"
        />
      </div>
    </div>
  </div>

  <UModal v-model="modalState">
    <UCard>
      <h1 class="text-[20px] font-bold text-center">
        Mark This Order As Paid?
      </h1>

      <div class="flex flex-row justify-center gap-10 mt-10">
        <UButton
          label="Yes"
          color="green"
          class="flex justify-center h-[40px] w-[100px]"
          @click="handleUnpaidToPaid()"
          :loading="loadingState"
        />
        <UButton
          label="Discard"
          color="gray"
          variant="outline"
          class="flex justify-center h-[40px] w-[100px]"
          @click="modalState = false"
          :loading="loadingState"
        />
      </div>
    </UCard>
  </UModal>
</template>
