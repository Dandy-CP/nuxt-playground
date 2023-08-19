<script setup lang="ts">
import ISession from "types/session.types";

const route = useRoute();

const menu = [
  {
    label: "Dashboard",
    icon: "i-heroicons-home",
    to: "/",
    valuePath: "/",
  },
  {
    label: "Inventory",
    icon: "i-heroicons-archive-box-arrow-down",
    to: "/inventory",
    valuePath: "/inventory",
  },
  {
    label: "Orders",
    icon: "i-heroicons-shopping-cart",
    to: "/orders",
    valuePath: "/orders",
  },
];

const handleLogOut = async () => {
  const token = useCookie<ISession | null>("session");
  token.value = null;
  navigateTo("/login");
};
</script>

<template>
  <div
    class="h-screen sticky top-0 flex flex-col gap-10 w-[250px] p-7 bg-white"
  >
    <img src="../assets/LogoVertical.png" alt="" class="w-[145px] h-[48px]" />

    <div v-for="(item, index) in menu" :key="index">
      <NuxtLink
        :to="item.to"
        class="flex flex-row items-center gap-5 cursor-pointer"
      >
        <UIcon
          :name="item.icon"
          class="w-[24px] h-[24px]"
          :class="
            route.fullPath === item.valuePath
              ? 'text-[#1570EF]'
              : 'text-[#5D6679]'
          "
        />

        <p
          class="text-[17px] font-medium"
          :class="
            route.fullPath === item.valuePath
              ? 'text-[#1570EF]'
              : 'text-[#5D6679]'
          "
        >
          {{ item.label }}
        </p>
      </NuxtLink>
    </div>

    <div class="flex flex-col gap-10 mt-auto">
      <div class="flex flex-row items-center gap-5 cursor-pointer">
        <UIcon
          name="i-heroicons-cog-6-tooth"
          class="w-[24px] h-[24px] text-[#5D6679]"
        />
        <p class="text-[17px] font-medium text-[#5D6679]">Setting</p>
      </div>

      <div
        class="flex flex-row items-center gap-5 cursor-pointer"
        @click="handleLogOut()"
      >
        <UIcon
          name="i-heroicons-arrow-right-on-rectangle"
          class="w-[24px] h-[24px] text-[#5D6679]"
        />
        <p class="text-[17px] font-medium text-[#5D6679]">Log Out</p>
      </div>
    </div>
  </div>
</template>
