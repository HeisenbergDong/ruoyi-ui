import request from '@/utils/request'

// 查询商品sku和hash关系列表
export function listHash(query) {
  return request({
    url: '/system/hash/list',
    method: 'get',
    params: query
  })
}

// 查询商品sku和hash关系详细
export function getHash(id) {
  return request({
    url: '/system/hash/' + id,
    method: 'get'
  })
}

// 新增商品sku和hash关系
export function addHash(data) {
  return request({
    url: '/system/hash',
    method: 'post',
    data: data
  })
}

// 修改商品sku和hash关系
export function updateHash(data) {
  return request({
    url: '/system/hash',
    method: 'put',
    data: data
  })
}

// 删除商品sku和hash关系
export function delHash(id) {
  return request({
    url: '/system/hash/' + id,
    method: 'delete'
  })
}
