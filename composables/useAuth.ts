import ISession from "types/session.types";

interface IOptions {
  payload?: any;
}

export default async function useAuth({ payload }: IOptions) {
  const config = useRuntimeConfig();
  const { data, error, status, pending, refresh } = await useFetch<any>(
    `${config.public.apiBase}/auth/login`,
    {
      method: "POST",
      body: {
        ...payload,
      },
    }
  );

  if (status.value !== "error") {
    const sessionData = useCookie<ISession>("session");
    sessionData.value = data.value;
  }

  return {
    data,
    error,
    status,
    pending,
    refresh,
  };
}
