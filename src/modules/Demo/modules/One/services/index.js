import request from '@/utils/request'

export function getSomething(params) {
  return request(`/api/test`, {
    method: 'GET',
    data: params
  })
}

export function postSomething(params) {
  return request(`/api/test`, {
    method: 'POST',
    data: params
  })
}
