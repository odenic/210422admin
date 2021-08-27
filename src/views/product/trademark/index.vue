<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-button icon="el-icon-plus" type="primary">添加品牌</el-button>
      <el-table
        ref="singleTable"
        v-loading="loading"
        :data="list.records"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column type="index" width="50" align="center" />
        <el-table-column
          property="tmName"
          label="品牌名称"
          width="140"
          align="center"
        />
        <el-table-column
          property="logoUrl"
          label="品牌Logo"
          width="250"
          align="center"
        >
          <template v-slot="{ row }">
            <!-- eslint-disable-next-line -->
            <img :src="row.logoUrl" :alt="row.tmName" class="logo" />
          </template>
        </el-table-column>
        <el-table-column property="address" label="操作" align="center">
          <el-button icon="el-icon-edit" type="warning" size="small">修改</el-button>
          <el-button icon="el-icon-delete-solid" type="danger" size="small">删除</el-button>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="list.current"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="list.size"
        layout="prev, pager, next, jumper, total, sizes "
        :total="list.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
</template>

<script>
import { reqGetTrademark } from '@/api/product.js'

export default {
  name: 'Trademark',
  data() {
    return {
      list: {},
      loading: false
    }
  },
  mounted() {
    this.getSpu('1', '5')
  },
  methods: {
    async getSpu(page, limit) {
      try {
        this.loading = true
        const res = await reqGetTrademark(page, limit)
        this.list = res.data
        this.loading = false
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },
    handleCurrentChange(current) {
      this.getSpu(current + '', this.list.size + '')
    },
    handleSizeChange(size) {
      this.getSpu(this.list.current + '', size + '')
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 50px;
  height: 50px;
}
</style>
