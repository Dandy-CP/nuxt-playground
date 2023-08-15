<template>
  <div
    class="flex flex-row items-center justify-between p-8 w-full h-[100px] bg-white"
  >
    <UInput
      icon="i-heroicons-magnifying-glass-20-solid"
      size="md"
      color="white"
      placeholder="Search product, supplier, order"
      :trailing="false"
      class="w-[430px]"
    />

    <div class="flex flex-row items-center gap-5">
      <p class="text-[16px] font-medium">Dandy CP</p>
      <img
        src="../assets/avatar.jpg"
        alt=""
        class="w-[40px] h-[40px] rounded-full"
      />
    </div>
  </div>
</template>
