import request from '@/utils/request'

// 查询商品图片列表
export function listImage(query) {
  return request({
    url: '/system/image/list',
    method: 'get',
    params: query
  })
}

// 查询商品图片详细
export function getImage(id) {
  return request({
    url: '/system/image/' + id,
    method: 'get'
  })
}

// 新增商品图片
export function addImage(data) {
  return request({
    url: '/system/image',
    method: 'post',
    data: data
  })
}

// 修改商品图片
export function updateImage(data) {
  return request({
    url: '/system/image',
    method: 'put',
    data: data
  })
}

// 删除商品图片
export function delImage(id) {
  return request({
    url: '/system/image/' + id,
    method: 'delete'
  })
}
