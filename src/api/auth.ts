import { useMutation } from "@tanstack/react-query";
import api from "@/api/index";
import { QUERY_KEY } from "@/constant/queryKey";

type PostLogin = {
  email: string;
  password: string;
}
export type ResLogin = {
  accessToken: string;
  refreshToken: string;
};
export const postLogin = ({
                            onError = () => {
                            },
                            onSuccess = () => {
                            },
                          }) => {
  return useMutation([QUERY_KEY.postLogin], {
    mutationFn: async ({email, password}: PostLogin) => {
      const {data} = await api.post<ResLogin>('/login', {email, password});
      return data;
    },
    onError,
    onSuccess
  })
};

export type PostRenew = {
  accessToken: string;
  refreshToken: string;
}
export type ResRenew = {
  accessToken: string;
  refreshToken: string;
};
export const postRenew = ({
                            onError = () => {
                            },
                            onSuccess = () => {
                            },
                          }) => {
  return useMutation([QUERY_KEY.posetRenew], {
    mutationFn: async ({accessToken, refreshToken}: PostRenew) => {
      try {
        const {data} = await api.post<ResRenew>('/renew', {accessToken, refreshToken});
        return data;
      } catch (e) {
        console.error(e);
      }
    },
    onError,
    onSuccess
  })
};