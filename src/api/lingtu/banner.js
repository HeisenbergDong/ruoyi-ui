import request from '@/utils/request'

// 查询首页banner列表
export function listBanner(query) {
  return request({
    url: '/banner/list',
    method: 'get',
    params: query
  })
}

// 查询首页banner详细
export function getBanner(id) {
  return request({
    url: '/banner/' + id,
    method: 'get'
  })
}

// 新增首页banner
export function addBanner(data) {
  return request({
    url: '/banner',
    method: 'post',
    data: data
  })
}

// 修改首页banner
export function updateBanner(data) {
  return request({
    url: '/banner',
    method: 'put',
    data: data
  })
}

// 删除首页banner
export function delBanner(id) {
  return request({
    url: '/banner/' + id,
    method: 'delete'
  })
}
