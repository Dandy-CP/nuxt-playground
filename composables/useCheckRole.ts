import ISession from "types/session.types";
import IResponseUsers from "types/responseUsers.types";

const useCheckRole = async () => {
  const token = useCookie<ISession>("session");

  const { data } = await useRequestApi.get<IResponseUsers>({
    endpoint: "user",
    query: {
      id: token.value.id,
    },
  });

  if (data.value?.items[0].role === "Admin") {
    return true;
  } else {
    return false;
  }
};

export default useCheckRole;
