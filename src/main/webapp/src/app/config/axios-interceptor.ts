import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";

const http: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: '/',
})

http.defaults.headers.post['Content-Type'] = 'application/json'
http.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'

const onRequestSuccess = (config: any) => {
  return config
}

http.interceptors.request.use(onRequestSuccess)

http.interceptors.response.use(
  async (response: AxiosResponse): Promise<any> => {
    if (response.status >= 200 && response.status < 300) {
      return response.data
    }
  },
  (error: AxiosError) => {
    const {response, request}: { response?: any; request?: XMLHttpRequest } = error

    if (response) {
      if (response.status >= 400 && response.status < 500) {
        console.log('error', response.status, response.data?.errorCode)
        console.log('error', response.status, response.data?.errorMessage)

        // store.dispatch(userSlice.actions.clearAuthentication)
        // store.dispatch(globalDialogSlice.actions.setError(true))
        // store.dispatch(globalDialogSlice.actions.toggle(true))
        // store.dispatch(globalDialogSlice.actions.error(response.data))
        throw error
        // return null
      }
    } else if (request) {
      console.log('Request failed. Please try again.', 'error')
      throw error
      // return null
    }
    return Promise.reject(error)
  }
)

export default http
