<template>
  <div class="flex flex-row h-full w-full bg-slate-100">
    <SideBar />

    <div class="flex flex-col w-full">
      <HeaderContent />
      <slot />
    </div>
  </div>
</template>
