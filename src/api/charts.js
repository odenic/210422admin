import request from '@/utils/mockRequest'

function reqgetChartsData() {
  return request({
    url: `/admin/dashboard/charts`,
    method: 'get'
  })
}

export { reqgetChartsData }
