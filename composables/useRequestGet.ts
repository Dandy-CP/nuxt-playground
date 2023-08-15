import type ISession from "types/session.types";

interface IOptions {
  endpoint: string;
  payload?: any;
  query?: any;
}

export default async function useRequestGet({ endpoint, query }: IOptions) {
  const token = useCookie<ISession>("session");
  const { data, error, status, pending, refresh } = await useFetch<any>(
    `https://fine-plum-python.cyclic.app/${endpoint}`,
    {
      method: "GET",
      query: {
        ...query,
      },
      headers: {
        Authorization: `Bearer ${token.value.access_token}`,
      },
    }
  );

  return {
    data,
    status,
    error,
    pending,
    refresh,
  };
}
