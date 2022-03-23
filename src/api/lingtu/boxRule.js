import request from '@/utils/request'

// 查询费用规则配置列表
export function listRule(query) {
  return request({
    url: '/box/rule/list',
    method: 'get',
    params: query
  })
}

// 查询费用规则配置详细
export function getRule(id) {
  return request({
    url: '/box/rule/' + id,
    method: 'get'
  })
}

// 新增费用规则配置
export function addRule(data) {
  return request({
    url: '/box/rule',
    method: 'post',
    data: data
  })
}

// 修改费用规则配置
export function updateRule(data) {
  return request({
    url: '/box/rule',
    method: 'put',
    data: data
  })
}

// 删除费用规则配置
export function delRule(id) {
  return request({
    url: '/box/rule/' + id,
    method: 'delete'
  })
}
