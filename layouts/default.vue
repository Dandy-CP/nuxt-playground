<template>
  <div class="flex flex-row w-full h-auto">
    <SideBar />

    <div class="w-full h-auto bg-slate-100">
      <HeaderContent />
      <slot />
    </div>
  </div>
</template>
