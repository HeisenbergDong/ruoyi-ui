import request from '@/utils/request'

// 查询盲盒日志列表
export function listLog(query) {
  return request({
    url: '/box/log/list',
    method: 'get',
    params: query
  })
}

// 查询盲盒日志详细
export function getLog(id) {
  return request({
    url: '/box/log/' + id,
    method: 'get'
  })
}

// 新增盲盒日志
export function addLog(data) {
  return request({
    url: '/box/log',
    method: 'post',
    data: data
  })
}

// 修改盲盒日志
export function updateLog(data) {
  return request({
    url: '/box/log',
    method: 'put',
    data: data
  })
}

// 删除盲盒日志
export function delLog(id) {
  return request({
    url: '/box/log/' + id,
    method: 'delete'
  })
}
