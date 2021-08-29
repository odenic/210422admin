import request from '@/utils/request'

function reqgetAttrList(category1Id, category2Id, category3Id) {
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get'
  })
}

function reqAddAttr(data) {
  return request({
    url: `/admin/product/saveAttrInfo`,
    method: 'post',
    data
  })
}

function reqDelAttr(attrId) {
  return request({
    url: `/admin/product/deleteAttr/${attrId}`,
    method: 'delete'
  })
}

export { reqgetAttrList, reqAddAttr, reqDelAttr }
