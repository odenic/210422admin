const chartData = require('./data.json')

module.exports = [
  {
    url: '/admin/dashboard/charts',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          chartData
        }
      }
    }
  }
]
