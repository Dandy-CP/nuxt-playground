<script setup lang="ts">
const loadingSignIn = ref<boolean>(false);
const formView = ref<string>("SignIn");
const formState = ref<{ email: string; password: string }>({
  email: "",
  password: "",
});
const errorMessage = ref<string>("");

const validate = (state: any) => {
  const errors = [];
  if (!state.email)
    errors.push({ path: "email", message: "Email Cannot Be Empty" });
  if (!state.password)
    errors.push({ path: "password", message: "Password Cannot Be Empty" });
  return errors;
};

async function HandleLogin() {
  loadingSignIn.value = true;

  const { error, status } = await useAuth({
    payload: {
      email: formState.value.email,
      password: formState.value.password,
    },
  });

  if (status.value !== "error") {
    loadingSignIn.value = false;
    navigateTo("/");
  } else {
    errorMessage.value = error.value?.data?.message;
    loadingSignIn.value = false;
  }
}

function changeView() {
  if (formView.value === "SignIn") {
    formView.value = "SignUp";
  } else if (formView.value === "SignUp") {
    formView.value = "SignIn";
  }
}

definePageMeta({
  layout: "custom",
});
</script>

<template>
  <div class="h-screen w-screen flex flex-row justify-evenly items-center">
    <img src="../assets/Logo.png" alt="" draggable="false" />

    <div class="flex flex-col justify-center items-center">
      <img
        src="../assets/LogoOnly.png"
        alt=""
        draggable="false"
        class="w-[48px] h-[48px]"
      />

      <p class="font-medium text-[30px] mb-2 mt-2">Login to your account</p>

      <h1 class="font-normal text-[16px] text-[#667085]">
        Welcome Back! Please login to your account.
      </h1>

      <UForm :validate="validate" :state="formState" class="mt-5 w-[360px]">
        <UFormGroup label="Email" name="email" required>
          <UInput
            size="xl"
            placeholder="Enter Your Email"
            v-model="formState.email"
            :loading="loadingSignIn"
          />
        </UFormGroup>

        <UFormGroup label="Password" name="password" class="mt-5" required>
          <UInput
            size="xl"
            placeholder="Password"
            v-model="formState.password"
            type="password"
            :loading="loadingSignIn"
          />
        </UFormGroup>
      </UForm>

      <p
        class="ml-auto text-[14px] text-[#1366D9] font-medium mt-3 hover:cursor-pointer hover:underline"
      >
        Forgot Password ?
      </p>

      <p v-if="errorMessage" class="text-red-400 text-center font-medium mt-3">
        {{ errorMessage }}
      </p>

      <UButton
        @click="HandleLogin"
        class="mt-5 w-[150px] h-[46px] mr-auto ml-auto"
        color="blue"
        variant="solid"
        :loading="loadingSignIn"
        label="Sign In"
        block
      />

      <div
        v-if="formView === 'SignIn'"
        class="flex flex-row items-center justify-center gap-1 mt-5"
      >
        <p class="text-[#667085] text-[16px]">Don't have account?</p>
        <p
          class="text-[#1366D9] text-[16px] font-medium hover:cursor-pointer hover:underline"
          @click="changeView()"
        >
          Sign Up
        </p>
      </div>
    </div>
  </div>
</template>
