import request from '@/utils/request'

function reqgetCategory1() {
  return request({
    url: `/admin/product/getCategory1`,
    method: 'get'
  })
}

function reqgetCategory2(category1Id) {
  return request({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: 'get'
  })
}

function reqgetCategory3(category2Id) {
  return request({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: 'get'
  })
}

export { reqgetCategory1, reqgetCategory2, reqgetCategory3 }
