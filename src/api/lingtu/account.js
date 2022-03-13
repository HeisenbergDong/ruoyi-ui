import request from '@/utils/request'

// 查询用户账户余额列表
export function listAccount(query) {
  return request({
    url: '/system/account/list',
    method: 'get',
    params: query
  })
}

// 查询用户账户余额详细
export function getAccount(id) {
  return request({
    url: '/system/account/' + id,
    method: 'get'
  })
}

// 新增用户账户余额
export function addAccount(data) {
  return request({
    url: '/system/account',
    method: 'post',
    data: data
  })
}

// 修改用户账户余额
export function updateAccount(data) {
  return request({
    url: '/system/account',
    method: 'put',
    data: data
  })
}

// 删除用户账户余额
export function delAccount(id) {
  return request({
    url: '/system/account/' + id,
    method: 'delete'
  })
}
