import request from '@/utils/request'

function reqGetTrademark(page, limit) {
  return request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get'
  })
}

export { reqGetTrademark }
