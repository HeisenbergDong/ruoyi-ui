import request from '@/utils/request'

// 查询积分规则配置列表
export function listRule(query) {
  return request({
    url: '/system/rule/list',
    method: 'get',
    params: query
  })
}

// 查询积分规则配置详细
export function getRule(id) {
  return request({
    url: '/system/rule/' + id,
    method: 'get'
  })
}

// 新增积分规则配置
export function addRule(data) {
  return request({
    url: '/system/rule',
    method: 'post',
    data: data
  })
}

// 修改积分规则配置
export function updateRule(data) {
  return request({
    url: '/system/rule',
    method: 'put',
    data: data
  })
}

// 删除积分规则配置
export function delRule(id) {
  return request({
    url: '/system/rule/' + id,
    method: 'delete'
  })
}
