<template>
  <el-card class="container">
    <el-table
      v-loading="loading"
      :data="skuList"
      border
      class="container-table"
    >
      <el-table-column label="序号" width="50" type="index" align="center" />
      <el-table-column label="名称" prop="skuName" />
      <el-table-column label="描述" prop="skuDesc" />
      <el-table-column label="默认图片">
        <template v-slot="{ row }">
          <!-- eslint-disable-next-line -->
          <img
            :src="row.skuDefaultImg"
            :alt="row.skuName"
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column label="重量(KG)" prop="weight" />
      <el-table-column label="价格(元)" prop="price" />
      <el-table-column label="操作" width="300">
        <template v-slot="{ row }">
          <el-button
            :type="row.isSale?'primary':'success'"
            :icon="`el-icon-${row.isSale?'download':'upload2'}`"
            size="mini"
            @click="changeStatus(row)"
          >
            {{ row.isSale ? '下架' : '上架' }}
          </el-button>
          <el-button type="warning" icon="el-icon-edit" size="mini">
            修改
          </el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="delSku(row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="prev, pager, next, jumper, total, sizes"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script>
import { reqGetSkuList, reqDelSku, reqOnSale, reqCancellSale } from '@/api/sku'
export default {
  name: 'Sku',
  data() {
    return {
      loading: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      skuList: []
    }
  },
  mounted() {
    this.getSkuList(this.currentPage, this.pageSize)
  },
  methods: {
    handleSizeChange(size) {
      this.getSkuList(this.currentPage, size)
    },
    handleCurrentChange(current) {
      this.getSkuList(current, this.pageSize)
    },
    async getSkuList(page, limit) {
      this.loading = true
      const { data } = await reqGetSkuList(page, limit)
      this.loading = false
      this.currentPage = data.current
      this.pageSize = data.size
      this.skuList = data.records
      this.total = data.total
    },
    async delSku(id) {
      try {
        await reqDelSku(id)
        this.$message({
          message: `删除成功`,
          type: 'success'
        })
        this.getSkuList(this.currentPage, this.pageSize)
      } catch (error) {
        this.$message({
          message: `删除失败`,
          type: 'error'
        })
      }
    },
    async changeStatus(row) {
      try {
        row.isSale === 0 ? await reqOnSale(row.id) : await reqCancellSale(row.id)
        this.getSkuList(this.currentPage, this.pageSize)
        this.$message({
          message: row.isSale === 0 ? `上架成功` : '下架成功',
          type: 'success'
        })
      } catch (error) {
        this.$message({
          message: row.isSale === 0 ? `上架失败` : '下架失败',
          type: 'error'
        })
      }
    }
  }
}
</script>

<style></style>
