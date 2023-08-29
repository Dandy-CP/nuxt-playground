import type ISession from "types/session.types";

interface IOptionsGet {
  endpoint: string;
  payload?: any;
  query?: any;
}

interface IOptionsRequest {
  method: "POST" | "PUT" | "DELETE";
  endpoint: string;
  payload?: any;
}

const useRequestApi = {
  get: async <Type>({ endpoint, query }: IOptionsGet) => {
    const token = useCookie<ISession>("session");
    const config = useRuntimeConfig();
    const { data, error, status, pending, refresh } = await useFetch<Type>(
      `${config.public.apiBase}/${endpoint}`,
      {
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
  },
  request: async ({ endpoint, payload, method }: IOptionsRequest) => {
    const token = useCookie<ISession>("session");
    const config = useRuntimeConfig();
    const { data, error, status, pending, refresh } = await useFetch<any>(
      `${config.public.apiBase}/${endpoint}`,
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
      status,
      error,
      pending,
      refresh,
    };
  },
};

export default useRequestApi;
