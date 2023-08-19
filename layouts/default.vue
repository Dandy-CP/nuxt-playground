<template>
  <div class="flex flex-row w-full">
    <SideBar />

    <div class="w-full bg-slate-100">
      <HeaderContent />
      <slot />
    </div>
  </div>
</template>
