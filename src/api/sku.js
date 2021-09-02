import request from '@/utils/request'

function reqSaveSkuInfo(data) {
  return request({
    url: `/admin/product/saveSkuInfo`,
    method: 'post',
    data
  })
}

function reqGetSkuList(page, limit) {
  return request({
    url: `/admin/product/list/${page}/${limit}`,
    method: 'get'
  })
}

function reqDelSku(skuId) {
  return request({
    url: `/admin/product/deleteSku/${skuId}`,
    method: 'delete'
  })
}

function reqOnSale(skuId) {
  return request({
    url: `/admin/product/onSale/${skuId}`,
    method: 'get'
  })
}

function reqCancellSale(skuId) {
  return request({
    url: `/admin/product/cancelSale/${skuId}`,
    method: 'get'
  })
}

export { reqSaveSkuInfo, reqGetSkuList, reqDelSku, reqOnSale, reqCancellSale }
