import { postRenew, ResRenew } from "@/api/auth";
import { jwtAccessKey, jwtRefreshKey } from "@/constant/jwt";
import { useRouter } from "next/router";

export const useRenew = () => {
  const router = useRouter();
  const renewSuccess = (data: ResRenew) => {
    localStorage.setItem(jwtAccessKey, data.accessToken);
    localStorage.setItem(jwtRefreshKey, data.refreshToken);
  }
  const renewFail = async (data) => {
    console.error(data.response.data.message);
    await router.replace('/login');
  }

  return postRenew({
    onError: renewFail,
    onSuccess: renewSuccess,
  });
}
