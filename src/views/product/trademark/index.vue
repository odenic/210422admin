<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-button icon="el-icon-plus" type="primary" @click="dialogVisible = true">添加品牌</el-button>
      <el-dialog
        :title="ruleForm.id?'修改品牌':'添加品牌'"
        :visible="dialogVisible"
        width="30%"
        :before-close="close"
      >
        <el-form ref="ruleForm" :model="ruleForm" label-width="80px" :rules="rules">
          <el-form-item label="品牌名称" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="图片上传" prop="imageUrl">
            <el-upload
              class="avatar-uploader"
              :action="`${baseUrl}/admin/product/fileUpload`"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="submitForm()">确 定</el-button>
        </span>
      </el-dialog>
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
          <template v-slot="{ row }">
            <el-button icon="el-icon-edit" type="warning" size="small" @click="revise(row.id,row.tmName,row.logoUrl)">修改</el-button>
            <el-button icon="el-icon-delete-solid" type="danger" size="small" @click="deleteTrademark(row.id,row.tmName)">删除</el-button>
          </template>
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
import { reqGetTrademark, delTardemark, postTardemark, reviseTardemark } from '@/api/trademark.js'

export default {
  name: 'Trademark',
  data() {
    return {
      list: {},
      loading: false,
      dialogVisible: false,
      baseUrl: process.env.VUE_APP_BASE_API,
      ruleForm: {
        name: '',
        imageUrl: '',
        id: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        imageUrl: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getTrademarkList('1', '5')
  },
  methods: {
    async getTrademarkList(page, limit) {
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
      this.getTrademarkList(current + '', this.list.size + '')
    },
    handleSizeChange(size) {
      this.getTrademarkList(this.list.current + '', size + '')
    },
    deleteTrademark(id, name) {
      this.$confirm(`是否删除<strong style="color:red">${name}</strong>?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }).then(async() => {
        try {
          this.loading = true
          await delTardemark(id)
          this.loading = false
          this.getTrademarkList(this.list.current + '', this.list.size + '')
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        } catch (error) {
          console.log(error)
          this.loading = false
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleAvatarSuccess(res) {
      this.ruleForm.imageUrl = res.data
      this.$refs['ruleForm'].clearValidate()
    },
    beforeAvatarUpload(file) {
      const type = ['image/jpeg', 'image/png']
      const isJPG = type.includes(file.type)
      const isLt500kb = file.size / 1024 <= 5
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 或 png 格式!')
      }
      if (!isLt500kb) {
        this.$message.error('上传图片大小不能超过 500KB!')
      }
      return isJPG && isLt500kb
    },
    submitForm() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (valid) {
          if (this.ruleForm.id) {
            try {
              await reviseTardemark(this.ruleForm.id, this.ruleForm.imageUrl, this.ruleForm.name)
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.reset()
            } catch (error) {
              this.$message({
                message: '修改失败',
                type: 'error'
              })
            }
          } else {
            try {
              await postTardemark(this.ruleForm.imageUrl, this.ruleForm.name)
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.reset()
            } catch (error) {
              this.$message({
                message: '添加失败',
                type: 'error'
              })
            }
          }
        } else {
          return false
        }
      })
    },
    close() {
      this.dialogVisible = false
      this.ruleForm.name = ''
      this.ruleForm.imageUrl = ''
      setTimeout(() => {
        this.ruleForm.id = ''
      }, 500)
      this.$message('已取消')
    },
    revise(id, name, url) {
      this.dialogVisible = true
      this.ruleForm.id = id
      this.ruleForm.name = name
      this.ruleForm.imageUrl = url
    },
    reset() {
      this.dialogVisible = false
      this.$refs['ruleForm'].resetFields()
      setTimeout(() => {
        this.ruleForm.id = ''
      }, 500)
      this.getTrademarkList(this.list.current + '', this.list.size + '')
    }
  }
}
</script>

<style lang="scss" >
.logo {
  width: 50px;
  height: 50px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
