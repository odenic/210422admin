<template>
  <el-card class="container">
    <el-form label-width="80px" :model="ruleForm" :rules="rules">
      <el-form-item label="属性名" prop="attrName">
        <el-input v-model="ruleForm.attrName" class="add-input long" placeholder="请输入属性名" />
      </el-form-item>
    </el-form>

    <el-button
      type="primary"
      icon="el-icon-plus"
      class="btn"
      :disabled="!ruleForm.attrName"
      @click="addAttrValue"
    >添加属性值</el-button>

    <el-table border class="table" :data="attrValueList">
      <el-table-column type="index" align="center" label="序号" width="50" />
      <el-table-column label="属性值名称">
        <template v-slot="{ row, $index }">
          <el-input v-show="row.isShow" :ref="`inp${$index}`" v-model="row.valueName" placeholder="请输入属性名称" size="small" @blur="changeIsShow(row)" />
          <div v-show="!row.isShow" @click="change(row, $index)">{{ row.valueName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ $index }">
          <el-popconfirm
            confirm-button-text="好的"
            cancel-button-text="不用了"
            icon="el-icon-info"
            icon-color="red"
            title="确定删除？"
            @onConfirm="delAttrValue($index)"
          >
            <el-tooltip slot="reference" class="item" effect="dark" content="删除属性" placement="top">
              <el-button icon="el-icon-delete-solid" type="danger" size="small" />
            </el-tooltip>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-button type="primary" class="btnsmall" @click="addAttr">确定</el-button>
    <el-button
      class="btnsmall"
      @click="cancel"
    >取消</el-button>
  </el-card>
</template>
<script>
import { reqAddAttr } from '@/api/attr'
import { mapState } from 'vuex'
export default {
  name: 'AddandUpdate',
  props: {
    attr: {
      type: Object,
      default: () => ({
        id: '',
        attrName: '',
        attrValueList: []
      })
    }
  },
  data() {
    return {
      ruleForm: {
        attrName: this.attr.attrName
      },
      rules: {
        attrName: [
          { required: true, message: '请输入属性名称', trigger: 'blur' }
        ]
      },
      attrValueList: this.attr.attrValueList,
      id: this.attr.id
    }
  },
  computed: {
    ...mapState('category', ['category3Id'])
  },
  methods: {
    addAttrValue() {
      this.attrValueList.push({ 'valueName': '', 'isShow': true })
      this.$nextTick(() => {
        this.$refs[`inp${this.attrValueList.length - 1}`].focus()
      })
    },
    delAttrValue(index) {
      this.attrValueList.splice(index, 1)
    },
    changeIsShow(item) {
      if (item.valueName) {
        item.isShow = false
      }
    },
    change(item, index) {
      item.isShow = true
      this.$nextTick(() => {
        this.$refs[`inp${index}`].focus()
      })
    },
    cancel() {
      this.$emit('setAttr', {
        id: '',
        attrName: '',
        attrValueList: []
      })
      this.$emit('update:show', false)
    },
    async addAttr() {
      const { attrValueList, ruleForm: { attrName }} = this
      if (!attrName) {
        this.$message.error('请输入属性名')
        return
      }
      if (!attrValueList.length) {
        this.$message.error('请至少添加一个属性值')
        return
      }
      const data = {
        attrName,
        attrValueList,
        'categoryId': this.category3Id,
        'categoryLevel': 3,
        id: this.id ? this.id : ''
      }
      try {
        await reqAddAttr(data)
        this.$message({
          message: !this.id ? '添加成功' : '修改成功',
          type: 'success'
        })
        this.$emit('setAttr', {
          id: '',
          attrName: '',
          attrValueList: []
        })
        this.$emit('update:show', false)
      } catch (error) {
        this.$message.error('添加失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.long {
  width: 250px;
}
.btn {
  margin-bottom: 20px;
}
.btnsmall {
  margin-top: 20px;
}
</style>
