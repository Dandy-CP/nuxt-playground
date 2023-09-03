<script setup lang="ts">
import IResponseUsers from "types/responseUsers.types";
import ISession from "types/session.types";

const route = useRoute();
const toast = useToast();

const modalState = ref<boolean>(false);
const loadingState = ref<boolean>(false);

const { data: userData } = await useRequestApi.get<IResponseUsers>({
  endpoint: "user",
  query: {
    id: route.params.IDUsers,
  },
});

const checkSelfID = () => {
  const token = useCookie<ISession>("session");

  if (token.value.id === route.params.IDUsers) {
    return true;
  } else {
    return false;
  }
};

const handleDeleteUser = async () => {
  loadingState.value = true;

  const { status, error } = await useRequestApi.request({
    endpoint: `user/${route.params.IDUsers}`,
    method: "DELETE",
  });

  if (status.value === "error") {
    console.log(error.value);
    toast.add({
      title: "Failed To Delete Users",
      description: error.value?.message,
      icon: "i-heroicons-information-circle",
      color: "red",
    });
    loadingState.value = false;
  }

  if (status.value === "success") {
    toast.add({
      title: "Success Delete Users",
      icon: "i-heroicons-check-badge",
      color: "green",
    });
    navigateTo(`/users`);
    loadingState.value = false;
    modalState.value = false;
  }
};
</script>

<template>
  <div class="p-5">
    <div class="w-full bg-white rounded-xl p-5">
      <div class="flex flex-row justify-between">
        <h1 class="font-bold text-2xl">{{ userData?.items[0].name }}</h1>

        <UButton
          label="Delete Users"
          color="red"
          size="md"
          icon="i-heroicons-trash"
          @click="modalState = true"
          :disabled="checkSelfID()"
        />
      </div>

      <div class="flex flex-col gap-3 mt-5">
        <p>Email: {{ userData?.items[0].email }}</p>
        <p>Role: {{ userData?.items[0].role }}</p>
        <p>
          Email Status:
          {{
            userData?.items[0].isVerified === false
              ? "Not Verified"
              : "Verified"
          }}
        </p>
      </div>
    </div>
  </div>

  <UModal v-model="modalState">
    <UCard>
      <h1 class="text-[20px] font-bold text-center">
        Are You Sure Delete this users?
      </h1>

      <div class="flex flex-row justify-center gap-10 mt-10">
        <UButton
          label="Yes"
          color="green"
          class="flex justify-center h-[40px] w-[100px]"
          @click="handleDeleteUser()"
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
