import request from '@/utils/request'

// 查询积分充值/提现记录列表
export function listDraw(query) {
  return request({
    url: '/system/draw/list',
    method: 'get',
    params: query
  })
}

// 查询积分充值/提现记录详细
export function getDraw(id) {
  return request({
    url: '/system/draw/' + id,
    method: 'get'
  })
}

// 新增积分充值/提现记录
export function addDraw(data) {
  return request({
    url: '/system/draw',
    method: 'post',
    data: data
  })
}

// 修改积分充值/提现记录
export function updateDraw(data) {
  return request({
    url: '/system/draw',
    method: 'put',
    data: data
  })
}

// 删除积分充值/提现记录
export function delDraw(id) {
  return request({
    url: '/system/draw/' + id,
    method: 'delete'
  })
}
