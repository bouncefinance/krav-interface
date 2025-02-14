// import { toast } from 'react-toastify'
import { BTC_PRICE_API } from '../../../../constant/chain'
import { IResponse } from './type'
// import store from 'state'
// import { removeLoginInfo, removeUserInfo } from 'state/users/reducer'

const request = (url: string, options?: any) => {
  // TODO: add request/response interceptors
  return fetch(url, options).then(async (response) => {
    if (response.status === 401) {
      // toast.error('Login has expired, please login again.', {
      //   toastId: 'loginHasExpired'
      // })
      // store.dispatch(removeLoginInfo())
      // store.dispatch(removeUserInfo())
      // location.href = '/login'
      // setTimeout(() => {
      //   window.location.reload()
      // }, 1000)
    }
    const json = await response?.json()
    if (response.status !== 200) {
      return Promise.reject(json)
    }
    return json
  })
}

// const initSignature = () => {
// }

const instance = (baseuri: string) => ({
  get<TData = any>(url: string, params: any, headers?: any): Promise<IResponse<TData>> {
    return request(`${baseuri}${url}?${new URLSearchParams(params).toString()}`, {
      headers: {
        ...headers,
        // ...initSignature(),
      },
    })
  },
  post<TData = any>(url: string, body: any, headers?: any): Promise<IResponse<TData>> {
    const _headers = headers || { 'Content-Type': 'application/json' }

    return request(`${baseuri}${url}`, {
      headers: {
        ..._headers,
        // ...initSignature()
      },
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body),
    })
  },
  put<TData = any>(url: string, body: any, headers?: any): Promise<IResponse<TData>> {
    const _headers = headers || { 'Content-Type': 'application/json' }

    return request(`${baseuri}${url}`, {
      headers: {
        ..._headers,
        // ...initSignature()
      },
      method: 'PUT',
      body: body instanceof FormData ? body : JSON.stringify(body),
    })
  },
  delete<TData = any>(url: string, body: any, headers?: any): Promise<IResponse<TData>> {
    const _headers = headers || { 'Content-Type': 'application/json' }

    return request(`${baseuri}${url}`, {
      headers: {
        ..._headers,
        // ...initSignature()
      },
      method: 'DELETE',
      body: body instanceof FormData ? body : JSON.stringify(body),
    })
  },
  postForward<TData = any>(url: string, body: any, headers?: any): Promise<IResponse<TData>> | any {
    const _headers = headers || { 'Content-Type': 'application/json' }

    return request(`${baseuri}${url}`, {
      headers: {
        ..._headers,
      },
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body),
    })
  },
})

export const ApiInstance = instance(BTC_PRICE_API)
