import _axios from 'axios';
import { jwtAccessKey, jwtRefreshKey } from "@/constant/jwt";
import { ResRenew } from "@/api/auth.js";

const createAxiosInstance = (baseURL: string) => {
  const instance = _axios.create({
    baseURL,
    timeout: 10000,
    withCredentials: false,
  });

  return instance;
};

const api = createAxiosInstance(process.env.NEXT_PUBLIC_API_URL);

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const config = err.config;
    if (err.response.status === 401) {
      const accessToken = localStorage.getItem(jwtAccessKey);
      const refreshToken = localStorage.getItem(jwtRefreshKey);
      if (!accessToken) {
        return err;
      }
      try {
        const {data}: { data: ResRenew } = await api.post<ResRenew>('/renew', {accessToken, refreshToken});
        if (data.accessToken) {
          localStorage.setItem(jwtAccessKey, data.accessToken);
          try {
            return await api.request(config);
          } catch (err) {
            return Promise.reject(err);
          }
        }
      } catch (e) {
        localStorage.removeItem(jwtAccessKey);
        localStorage.removeItem(jwtRefreshKey);
      }
    }
    return err;
  }
)
api.interceptors.request.use(
  (req) => {
    if (typeof window === 'undefined') return req;
    const token = localStorage.getItem(jwtAccessKey);
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  },
  (err) => Promise.reject(err),
);

export default api;
