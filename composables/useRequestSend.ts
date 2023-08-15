import type ISession from "types/session.types";

interface IOptions {
  method: "POST" | "PUT" | "DELETE";
  endpoint: string;
  payload?: any;
}

export default async function useRequestSend({
  endpoint,
  payload,
  method,
}: IOptions) {
  const token = useCookie<ISession>("session");
  const { data, error, status, pending, refresh } = await useFetch<any>(
    `https://fine-plum-python.cyclic.app/${endpoint}`,
    {
      method: `${method}`,
      headers: {
        Authorization: `Bearer ${token.value.access_token}`,
      },
      body: {
        ...payload,
      },
    }
  );

  return {
    data,
    error,
    status,
    pending,
    refresh,
  };
}
