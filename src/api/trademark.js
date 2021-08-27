import request from '@/utils/request'

function reqGetTrademark(page, limit) {
  return request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get'
  })
}

function postTardemark(logoUrl, tmName) {
  return request({
    url: `/admin/product/baseTrademark/save`,
    method: 'post',
    data: {
      id: Date.now(),
      logoUrl,
      tmName
    }
  })
}

function delTardemark(id) {
  return request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: 'delete'
  })
}

function reviseTardemark(id, logoUrl, tmName) {
  return request({
    url: `/admin/product/baseTrademark/update`,
    method: 'put',
    data: {
      id,
      logoUrl,
      tmName
    }
  })
}

export { reqGetTrademark, postTardemark, delTardemark, reviseTardemark }
