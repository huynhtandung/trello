import Message from '@components/message'
import { SERVER_API } from '@environments'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import store from '@stores/index'
import { loading } from '@stores/loading'

class AxiosService {
  public readonly instance: AxiosInstance
  constructor() {
    const instance = axios.create({
      baseURL: SERVER_API.includes('http') ? SERVER_API : `http://${SERVER_API}`,
      headers: {
        'Content-Type': 'application/json'
      },
    })
    instance.interceptors.request.use(this.beforeRequest)
    instance.interceptors.response.use(this.handleSuccess, this.handleError)
    this.instance = instance
  }

  beforeRequest(config: AxiosRequestConfig){
    config.headers = {
      ...config.headers,
      access_token: localStorage.getItem('access_token'),
    }
    store.dispatch(loading())
    return config
  }

  handleSuccess(response: AxiosResponse){
    store.dispatch(loading())
    return response || ({} as any)
  }

  handleError(err: AxiosError){
    store.dispatch(loading())
    const errMsgs = err?.response?.data?.errors
    if(typeof errMsgs === 'string'){
      Message.error(errMsgs)
      return {}
    }

    errMsgs?.forEach((msg: string) => Message.error(msg))
    return {}
  }
}

const serverInstance = new AxiosService().instance

export { serverInstance }
