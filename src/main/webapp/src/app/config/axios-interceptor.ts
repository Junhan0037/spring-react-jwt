import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import {jwtExceptionSlice, jwtReIssueAsync} from "../components/exception/jwtExceptionSlice";
import {RootState} from "./store";
import {memberSlice} from "../components/member/memberSlice";

const http: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: '/',
})

http.defaults.headers.post['Content-Type'] = 'application/json'
http.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'

http.interceptors.request.use(
  (config) => {
    // 요청을 보내기 전 수행할 작업
    return config;
  },
  (error) => {
    // 오류 요청 가공
    return Promise.reject(error);
  }
)

export const axiosInterceptorSetup = (store: any) => {
  http.interceptors.response.use(
    async (response: AxiosResponse): Promise<any> => {
      if (response.status >= 200 && response.status < 300) {
        return response.data
      }
    },
    async (error: AxiosError) => {
      const {response, request}: { response?: any; request?: XMLHttpRequest } = error
      const originalRequest: any = error.config;

      if (response) {

        if (response.status === 401 && response.data.message === 'TokenExpiredError' && originalRequest.url !== '/auth/re-issue') { // JWT 만료시

          const {member} = store.getState() as RootState;
          const {accessToken, refreshToken} = member;
          const params = {accessToken, refreshToken};

          const data: any = await http.post('/auth/re-issue', params);
          const {accessToken: newAccessToken, refreshToken: newRefreshToken} = data;

          store.dispatch(memberSlice.actions.setJwt({newAccessToken, newRefreshToken}));
          http.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return http(originalRequest);

        } else if (response.status >= 400 && response.status < 500) {
          console.log('error', response.status, response.data?.message);
          store.dispatch(jwtExceptionSlice.actions.setError(response.data));
          throw error
        }

      } else if (request) {
        console.log('Request failed. Please try again.', 'error')
        throw error
      }
      return Promise.reject(error)
    }
  )
}

export default http
