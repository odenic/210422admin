import request from '@/utils/request'

function reqgetSpuList(page, limit, category3Id) {
  return request({
    url: `/admin/product/${page}/${limit}`,
    method: 'get',
    params: {
      category3Id
    }
  })
}

function getBaseSaleAttrList() {
  return request({
    url: `/admin/product/baseSaleAttrList`,
    method: 'get'
  })
}

function uploadSpuInfo(data) {
  return request({
    url: `/admin/product/saveSpuInfo`,
    method: 'post',
    data
  })
}

function reqDelSpu(spuId) {
  return request({
    url: `/admin/product/deleteSpu/${spuId}`,
    method: 'delete'
  })
}

function reqGetSpuImageList(spuId) {
  return request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get'
  })
}

function reqGetSpuSaleAttrList(spuId) {
  return request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: 'get'
  })
}

function reqSaveSkuInfo(data) {
  return request({
    url: `/admin/product/saveSkuInfo`,
    method: 'post',
    data
  })
}

export {
  reqgetSpuList,
  getBaseSaleAttrList,
  uploadSpuInfo,
  reqDelSpu,
  reqGetSpuImageList,
  reqGetSpuSaleAttrList,
  reqSaveSkuInfo
}
