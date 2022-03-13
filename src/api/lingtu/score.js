import request from '@/utils/request'

// 查询用户积分余额列表
export function listScore(query) {
  return request({
    url: '/system/score/list',
    method: 'get',
    params: query
  })
}

// 查询用户积分余额详细
export function getScore(id) {
  return request({
    url: '/system/score/' + id,
    method: 'get'
  })
}

// 新增用户积分余额
export function addScore(data) {
  return request({
    url: '/system/score',
    method: 'post',
    data: data
  })
}

// 修改用户积分余额
export function updateScore(data) {
  return request({
    url: '/system/score',
    method: 'put',
    data: data
  })
}

// 删除用户积分余额
export function delScore(id) {
  return request({
    url: '/system/score/' + id,
    method: 'delete'
  })
}
