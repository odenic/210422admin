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

export { reqgetSpuList, getBaseSaleAttrList, uploadSpuInfo, reqDelSpu }
