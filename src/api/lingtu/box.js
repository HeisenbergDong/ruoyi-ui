import request from '@/utils/request'

// 查询盲盒列表
export function listBox(query) {
  return request({
    url: '/box/list',
    method: 'get',
    params: query
  })
}

// 查询盲盒详细
export function getBox(id) {
  return request({
    url: '/box/' + id,
    method: 'get'
  })
}

// 新增盲盒
export function addBox(data) {
  return request({
    url: '/box',
    method: 'post',
    data: data
  })
}

// 修改盲盒
export function updateBox(data) {
  return request({
    url: '/box',
    method: 'put',
    data: data
  })
}

// 删除盲盒
export function delBox(id) {
  return request({
    url: '/box/' + id,
    method: 'delete'
  })
}
