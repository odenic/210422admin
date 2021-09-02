import request from '@/utils/request'

function reqSaveSkuInfo(data) {
  return request({
    url: `/admin/product/saveSkuInfo`,
    method: 'post',
    data
  })
}

export { reqSaveSkuInfo }
