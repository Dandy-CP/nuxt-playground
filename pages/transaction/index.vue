<script setup lang="ts">
import type IResponseProducts from "types/responseProducts.types";
import type ICart from "types/cart.types";

const inputData = ref({
  buyerName: "",
  addressBuyer: "",
  shippingMethode: "",
  isPaid: false,
  paymentMethode: "",
});
const shipping = ["JNE", "JNT", "SI CEPAT", "OUTLET"];
const payment = [
  "Cash",
  "Transfer Bank",
  "Kredit",
  "Debit",
  "QR",
  "E-commerce",
];
const modalProducts = ref<boolean>(false);
const page = ref<number>(1);
const inputSearch = ref<string>("");
const ordersData = ref<ICart[]>([]);
const totalPrice = ref<number>(0);
const isPaid = ref<boolean>(false);
const showOverlay = ref<boolean>(false);
const valueSearch = refDebounced(inputSearch, 1000);
const toast = useToast();

const { data: products } = await useRequestApi.get<IResponseProducts>({
  endpoint: "products",
  query: {
    page: page,
    limit: 5,
    productName: valueSearch,
  },
});

const handleMakeTransaction = async () => {
  showOverlay.value = true;

  if (
    inputData.value.buyerName === "" &&
    inputData.value.shippingMethode === "" &&
    inputData.value.paymentMethode === ""
  ) {
    toast.add({
      title: "All Input Must Be Filled",
      icon: "i-heroicons-information-circle",
      color: "red",
    });
    showOverlay.value = false;
    return;
  }

  if (ordersData.value.length === 0) {
    toast.add({
      title: "Ordered Items must at least 1 Item",
      icon: "i-heroicons-information-circle",
      color: "red",
    });
    showOverlay.value = false;
    return;
  }

  const { status, error } = await useRequestApi.request({
    endpoint: "transaction",
    method: "POST",
    payload: {
      buyerName: inputData.value.buyerName,
      addressBuyer: inputData.value.addressBuyer,
      shippingMethode: inputData.value.shippingMethode,
      items: ordersData.value,
      isPaid: isPaid.value,
      paymentMethode: inputData.value.paymentMethode,
    },
  });

  if (status.value === "error") {
    console.log(error.value);
    showOverlay.value = false;
    toast.add({
      title: "Failed Add Products",
      description: error.value?.message,
      icon: "i-heroicons-information-circle",
      color: "red",
    });
  }

  if (status.value === "success") {
    navigateTo(`/orders`);
    showOverlay.value = false;
    toast.add({
      title: "Transaction Success",
      icon: "i-heroicons-check-badge",
      color: "green",
    });
  }
};

const addProductToCart = (items: ICart) => {
  const checkDuplicate = ordersData.value.filter(
    (value) => value.idProduct === items.idProduct
  ).length;

  if (checkDuplicate !== 0) {
    toast.add({
      title: "Product has been added to cart",
      icon: "i-heroicons-information-circle",
      color: "red",
    });
    return;
  } else {
    ordersData.value = [...ordersData.value, { ...items }];
    toast.add({
      title: "Success Add To Cart",
      icon: "i-heroicons-check-badge",
      color: "green",
    });
  }
};

const sumTotalPrice = () => {
  const pricePerItems = ordersData.value.map((data) => {
    return data.price * data.quantity;
  });

  if (pricePerItems.length === 0) {
    return (totalPrice.value = 0);
  }

  const valueTotalPrice = pricePerItems.reduce((currentValue, currentIndex) => {
    return currentValue + currentIndex;
  });

  return (totalPrice.value = valueTotalPrice);
};

const incrementQuantity = (indexProduct: number) => {
  ordersData.value[indexProduct].quantity =
    ordersData.value[indexProduct].quantity + 1;
  sumTotalPrice();
};

const decrementQuantity = (indexProduct: number) => {
  const quantityItems = ordersData.value[indexProduct].quantity;
  if (quantityItems != 1) {
    ordersData.value[indexProduct].quantity =
      ordersData.value[indexProduct].quantity - 1;
    sumTotalPrice();
  }
};

const handleRemoveFromCart = (indexProduct: number) => {
  ordersData.value.splice(indexProduct, 1);
  sumTotalPrice();
  toast.add({
    title: "Success Removed From Cart",
    icon: "i-heroicons-check-badge",
    color: "green",
  });
};

const onNext = () => {
  if (page.value + 1 <= products?.value!.meta?.totalPages) {
    page.value = page.value + 1;
  }
};

const onPrev = () => {
  if (page.value != 1) {
    page.value = page.value - 1;
  }
};

watch(ordersData, () => {
  sumTotalPrice();
});

useHead({
  title: "Transaction",
});
</script>

<template>
  <div class="p-5">
    <Overlay :isShow="showOverlay" />

    <div class="w-full bg-white rounded-xl p-5">
      <h1 class="text-xl font-bold">Transaction</h1>

      <div class="flex flex-row gap-10 mt-5">
        <UFormGroup
          name="Buyer Name"
          label="Buyer Name"
          size="md"
          class="w-[300px]"
        >
          <UInput
            placeholder="Buyer Name"
            class="h-[40px]"
            v-model="inputData.buyerName"
          />
        </UFormGroup>

        <UFormGroup name="Shiping" label="Shiping" size="md" class="w-[300px]">
          <USelectMenu
            placeholder="Select Shipping"
            v-model="inputData.shippingMethode"
            :options="shipping"
            class="w-[300px] h-[40px]"
          />
        </UFormGroup>

        <UFormGroup name="Payment" label="Payment" size="md" class="w-[300px]">
          <USelectMenu
            placeholder="Select Payment"
            v-model="inputData.paymentMethode"
            :options="payment"
            class="w-[300px] h-[40px]"
          />
        </UFormGroup>
      </div>

      <UFormGroup name="Address" label="Address" size="md" class="w-full mt-5">
        <UTextarea resize v-model="inputData.addressBuyer" />
      </UFormGroup>

      <div class="mt-10">
        <div class="flex flex-row justify-between content-center mb-7">
          <h1 class="font-bold text-lg mb-3">Ordered Items</h1>
          <UButton
            label="Add Products"
            color="blue"
            icon="i-heroicons-plus-circle"
            @click="modalProducts = true"
          />
        </div>

        <div
          class="bg-[#F0F1F3] w-full p-5 pr-[90px] rounded-md flex flex-row justify-between"
        >
          <p class="font-semibold text-xl">Items</p>
          <p class="font-semibold text-xl">Quantity</p>
        </div>

        <div v-for="(value, index) in ordersData" class="p-5">
          <div class="flex flex-row justify-between mt-2">
            <div class="flex flex-col">
              <p>{{ value?.productName }}</p>
              <p class="font-medium">Rp{{ value?.price.toLocaleString() }}</p>
              <div class="flex flex-row items-center gap-3 mt-3">
                <p>Notes:</p>
                <UInput
                  placeholder="Notes"
                  @input="ordersData[index].notes = $event.target.value"
                />
              </div>
            </div>

            <div class="flex flex-row items-center gap-5">
              <UButton
                variant="soft"
                color="gray"
                icon="i-heroicons-plus-small"
                @click="incrementQuantity(index)"
              />
              <p>{{ value?.quantity }}</p>
              <UButton
                variant="soft"
                color="gray"
                icon="i-heroicons-minus-small"
                @click="decrementQuantity(index)"
              />

              <UButton
                variant="soft"
                color="red"
                icon="i-heroicons-trash"
                @click="handleRemoveFromCart(index)"
              />
            </div>
          </div>
          <hr class="mt-3" />
        </div>

        <div v-if="ordersData.length === 0">
          <p class="text-center font-bold text-lg mt-10 mb-10">Empty Cart</p>
        </div>

        <div class="flex flex-row justify-between mb-3 mt-3 p-2">
          <p>Total:</p>
          <p class="text-xl font-bold">Rp {{ totalPrice.toLocaleString() }}</p>
        </div>

        <div class="flex flex-row justify-end items-center gap-10">
          <UCheckbox v-model="isPaid" name="paid" label="Mark As Paid" />

          <UBadge
            :color="isPaid ? 'green' : 'red'"
            variant="solid"
            :label="isPaid ? 'PAID' : 'UNPAID'"
            size="lg"
            class="flex justify-center w-[200px]"
          />
        </div>
      </div>

      <hr class="mt-5 mb-5" />

      <div class="flex justify-end">
        <UButton
          label="Make Transaction"
          icon="i-heroicons-shopping-cart"
          class="h-[50px]"
          @click="handleMakeTransaction()"
        />
      </div>
    </div>
  </div>

  <UModal v-model="modalProducts">
    <UCard>
      <h1 class="font-semibold text-center text-lg mb-3">
        Add Product To Cart
      </h1>

      <div>
        <UInput
          placeholder="Search Items"
          class="h-[40px]"
          @input="inputSearch = $event.target.value"
        />

        <hr class="mt-5 mb-5" />

        <div>
          <div
            class="bg-[#F0F1F3] w-full p-2 rounded-md flex flex-row justify-between"
          >
            <p class="font-semibold">Items</p>
          </div>

          <div v-for="value in products?.items" class="p-2">
            <div class="flex flex-row justify-between p-2 rounded-md">
              <p>{{ value.productName }}</p>

              <UPopover mode="hover">
                <UButton
                  icon="i-heroicons-plus-circle"
                  variant="solid"
                  :disabled="value.stock === 0"
                  @click="
                    addProductToCart({
                      idProduct: value.id,
                      productName: value.productName,
                      quantity: 1,
                      price: value.price,
                      notes: '',
                    })
                  "
                />

                <template #panel>
                  <div class="p-5">
                    <p>Price: Rp{{ value.price.toLocaleString() }}</p>
                    <p>Stock In Inventory: {{ value.stock }}</p>
                  </div>
                </template>
              </UPopover>
            </div>

            <hr class="mt-3" />
          </div>

          <div class="flex flex-row justify-center items-center gap-5 mt-3">
            <UButton
              icon="i-heroicons-arrow-small-left-20-solid"
              color="blue"
              variant="soft"
              @click="onPrev"
            />
            <p class="font-medium">
              {{ products?.meta.currentPage }} / {{ products?.meta.totalPages }}
            </p>
            <UButton
              icon="i-heroicons-arrow-small-right-20-solid"
              color="blue"
              variant="soft"
              @click="onNext"
            />
          </div>
        </div>

        <div class="flex flex-row justify-end mt-7">
          <UButton
            color="gray"
            variant="outline"
            label="Discard"
            class="w-[116px] h-[40px] flex justify-center"
            @click="modalProducts = false"
          />
        </div>
      </div>
    </UCard>
  </UModal>
</template>
