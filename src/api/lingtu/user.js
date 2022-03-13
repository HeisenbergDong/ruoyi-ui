import request from '@/utils/request'

// 查询APP登录用户列表
export function listUser(query) {
  return request({
    url: '/user/list',
    method: 'get',
    params: query
  })
}

// 查询APP登录用户详细
export function getUser(id) {
  return request({
    url: '/user/' + id,
    method: 'get'
  })
}

// 新增APP登录用户
export function addUser(data) {
  return request({
    url: '/user',
    method: 'post',
    data: data
  })
}

// 修改APP登录用户
export function updateUser(data) {
  return request({
    url: '/user',
    method: 'put',
    data: data
  })
}

// 删除APP登录用户
export function delUser(id) {
  return request({
    url: '/user/' + id,
    method: 'delete'
  })
}
