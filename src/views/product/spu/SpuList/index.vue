<template>
  <el-card class="box-card cards">
    <el-button icon="el-icon-plus" type="primary" class="btn" :disabled="!category3Id" @click="$emit('update:show', 2)">添加SPU</el-button>
    <el-table
      v-loading="loading"
      :data="list"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column type="index" width="50" align="center" label="序号" />
      <el-table-column
        property="spuName"
        label="SPU名称"
        width="140"
        align="center"
      />
      <el-table-column
        property="description"
        label="SPU描述"
        width="500"
        align="center"
      >
        <!-- <template v-slot="{ row }">
          <el-tag v-for="item in row.attrValueList" :key="item.id" class="tags">{{
            item.valueName
          }}</el-tag>
        </template> -->
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-tooltip
            effect="dark"
            content="增加SKU"
            placement="top"
            :open-delay="200"
          >
            <el-button icon="el-icon-plus" type="primary" size="small" @click="editSpu(row.id,row.spuName)" />
          </el-tooltip>
          <el-tooltip
            effect="dark"
            content="修改SPU"
            placement="top"
            :open-delay="200"
          >
            <el-button icon="el-icon-edit" type="warning" size="small" />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="查看SKU列表"
            placement="top"
            :open-delay="200"
          >
            <el-button icon="el-icon-info" type="info" size="small" />
          </el-tooltip>
          <el-popconfirm
            confirm-button-text="好的"
            cancel-button-text="不用了"
            icon="el-icon-info"
            icon-color="red"
            title="确定删除？"
            @onConfirm="delSpu(row.id)"
          >
            <el-tooltip
              slot="reference"
              class="item"
              effect="dark"
              content="删除SPU"
              placement="top"
            >
              <el-button icon="el-icon-delete-solid" type="danger" size="small" />
            </el-tooltip>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="current"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="size"
      layout="prev, pager, next, jumper, total, sizes "
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script>
import { reqgetSpuList, reqDelSpu } from '@/api/spu'
import { mapState } from 'vuex'
export default {
  name: 'SpuList',
  data() {
    return {
      loading: false,
      list: [],
      current: 1,
      size: 5,
      total: 0
    }
  },
  computed: {
    ...mapState('category', ['category3Id'])
  },
  watch: {
    category3Id: {
      async handler(n) {
        if (n) {
          this.getSpuList(this.current, this.size, n)
        }
      },
      immediate: true
    }
  },
  methods: {
    handleSizeChange(size) {
      this.getSpuList(this.current, size, this.category3Id)
    },
    handleCurrentChange(current) {
      this.getSpuList(current, this.size, this.category3Id)
    },
    async getSpuList(page, limit, category3Id) {
      try {
        this.loading = true
        const { data: { current, records, size, total }} = await reqgetSpuList(page, limit, category3Id)
        this.current = current
        this.list = records
        this.size = size
        this.total = total
        this.loading = false
      } catch (error) {
        this.loading = false
        this.$message.error(error)
      }
    },
    async delSpu(id) {
      try {
        await reqDelSpu(id)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getSpuList(this.current, this.size, this.category3Id)
      } catch (error) {
        this.$message({
          message: '删除失败',
          type: 'error'
        })
      }
    },
    editSpu(id, name) {
      this.$emit('update:show', 3)
      this.$emit('setSpuInfo', { id, name })
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  margin: 0 5px;
}
.btn {
  margin-bottom: 15px;
}
.item {
  margin-right: 10px;
}
</style>
