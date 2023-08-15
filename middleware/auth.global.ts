import ISession from "types/session.types";

export default defineNuxtRouteMiddleware((to, from) => {
  const session = useCookie<ISession>("session");

  if (!session.value && to.path === "/") {
    return navigateTo("/login");
  }

  if (session.value && to.path === "/login") {
    return navigateTo("/");
  }
});
