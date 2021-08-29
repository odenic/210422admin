<template>
  <el-card class="box-card cards">
    <el-button icon="el-icon-plus" type="primary" class="btn" :disabled="!category3Id" @click="$emit('update:show', true)">添加属性</el-button>
    <el-table
      v-loading="loading"
      :data="list"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column type="index" width="50" align="center" />
      <el-table-column
        property="attrName"
        label="属性名称"
        width="140"
        align="center"
      />
      <el-table-column
        property="logoUrl"
        label="属性列表"
        width="500"
        align="center"
      >
        <template v-slot="{ row }">
          <el-tag v-for="item in row.attrValueList" :key="item.id" class="tags">{{
            item.valueName
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-tooltip class="item" effect="dark" content="修改属性" placement="top" :open-delay="200">
            <el-button
              icon="el-icon-edit"
              type="warning"
              size="small"
            />
          </el-tooltip>
          <el-popconfirm
            confirm-button-text="好的"
            cancel-button-text="不用了"
            icon="el-icon-info"
            icon-color="red"
            title="确定删除？"
            @onConfirm="delAttr(row.id)"
          >
            <el-tooltip slot="reference" class="item" effect="dark" content="删除属性" placement="top">
              <el-button icon="el-icon-delete-solid" type="danger" size="small" />
            </el-tooltip>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { reqgetAttrList, reqDelAttr } from '@/api/attr'
import { mapState } from 'vuex'
export default {
  name: 'AttrList',
  data() {
    return {
      list: [],
      loading: false
    }
  },
  computed: {
    ...mapState('category', [
      'category1Id',
      'category2Id',
      'category3Id'
    ])
  },
  watch: {
    category3Id: {
      async handler(n) {
        if (n) {
          this.getAttrList(n)
        }
      },
      immediate: true
    }
  },
  methods: {
    async delAttr(id) {
      try {
        await reqDelAttr(id)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getAttrList(this.category3Id)
      } catch (error) {
        this.$message.error('删除失败')
      }
    },
    async getAttrList(id) {
      this.loading = true
      const list = await reqgetAttrList(this.category1Id, this.category2Id, id)
      this.list = list.data
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.tags{
  margin: 0 5px;
}
.btn{
  margin-bottom: 15px;
}
.item{
  margin-right: 10px;
}
</style>
