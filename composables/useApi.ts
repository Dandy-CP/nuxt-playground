interface IOptions {
  endpoint: string;
  method: "GET" | "POST" | "PUT";
  payload: any;
}

export default async function useApi({ endpoint, method, payload }: IOptions) {
  const token = useCookie("token");

  const { data, error, status, pending } = await useFetch<any>(
    `https://fine-plum-python.cyclic.app/${endpoint}`,
    {
      method: `${method}`,
      headers: {
        Authorization: `Bearer ${token.value}`,
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
  };
}
