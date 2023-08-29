<script setup lang="ts">
import type IResponseUsers from "types/responseUsers.types";

const page = ref<number>(1);
const limit = ref<number>(10);
const valueSearch = ref<string>("");
const toast = useToast();

const { data: usersData } = await useRequestApi.get<IResponseUsers>({
  endpoint: "user",
  query: {
    page: page,
    limit: limit,
    name: valueSearch,
  },
});

const onNext = () => {
  if (page.value + 1 <= usersData?.value!.meta.totalPages) {
    page.value = page.value + 1;
  }
};

const onPrev = () => {
  if (page.value != 1) {
    page.value = page.value - 1;
  }
};

onBeforeMount(async () => {
  const isAdmin = await useCheckRole();
  if (!isAdmin) {
    clearError({ redirect: "/" });
    toast.add({
      title: "Only Admin Can Access Users Page",
      icon: "i-heroicons-information-circle",
      color: "red",
    });
  }
});

useHead({
  title: "Users",
});
</script>

<template>
  <div class="p-5">
    <UsersTableUsers
      :usersData="(usersData as IResponseUsers)"
      :currentPage="usersData!.meta.currentPage"
      :totalPage="usersData!.meta.totalPages"
      :onNext="onNext"
      :onPrev="onPrev"
    />
  </div>
</template>
