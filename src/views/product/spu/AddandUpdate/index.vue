<template>
  <el-card class="container">
    <el-form ref="ruleForm" label-width="80px" :model="spu" :rules="rules">
      <el-form-item label="SPU名称" prop="spuName">
        <el-input v-model="spu.spuName" placeholder="请输入SPU名称" />
      </el-form-item>
      <el-form-item label="SPU品牌" prop="tmId">
        <el-select v-model="spu.tmId" placeholder="请选择品牌">
          <el-option
            v-for="item in trademarkList"
            :key="item.id"
            :label="item.tmName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述" prop="description">
        <el-input v-model="spu.description" placeholder="请输入SPU描述" type="textarea" :rows="2" />
      </el-form-item>
      <el-form-item label="SPU图片" prop="spuImageList">
        <el-upload
          :action="`${baseUrl}/admin/product/fileUpload`"
          accept="image/jpg,image/jpeg,image/png"
          list-type="picture-card"
          :limit="limit"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
          :class="spu.spuImageList.length>=limit?'upload':''"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="imgUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性" prop="spuSaleAttrList">
        <el-select v-model="baseSaleAttrId" placeholder="请选择属性">
          <el-option
            v-for="item in AttrList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-button type="primary" :disabled="!baseSaleAttrId" icon="el-icon-plus" @click="addSpuSaleAttr">添加销售属性值</el-button>
        <el-table :data="spu.spuSaleAttrList" border class="table">
          <el-table-column
            label="序号"
            type="index"
            width="50"
            align="center"
          />
          <el-table-column prop="saleAttrName" label="属性名" width="100px" align="center" />
          <el-table-column prop="spuDesc" label="属性值列表">
            <template v-slot="{ row, $index }">
              <el-tag
                v-for="item,index in row.spuSaleAttrValueList"
                :key="index"
                closable
                :disable-transitions="false"
                @close="handleClose($index,index)"
              >
                {{ item.saleAttrValueName }}
              </el-tag>
              <el-button v-if="!row.isShow" class="button-new-tag" size="small" @click="edit(row,$index)">+ 新属性</el-button>
              <el-input v-else :ref="`inp${$index}`" v-model="attrValue" class="inp" size="mini" @blur="addAttrValue(row,$index)" />
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{ $index }">
              <el-tooltip effect="dark" content="删除SPU" placement="top">
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="delSpuSaleAttr($index)" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <el-button @click="$emit('update:show', false)">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { getBaseSaleAttrList, uploadSpuInfo } from '@/api/spu'
import { reqGetTrademarkList } from '@/api/trademark'
import { mapState } from 'vuex'
export default {
  name: 'AddandUpdate',
  data() {
    const checkImg = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('请至少添加一张图片'))
      } else {
        callback()
      }
    }
    const checkAttrList = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('请至少添加一个属性名'))
      }
      if (value[0].spuSaleAttrValueList.length <= 0) {
        callback(new Error('请至少添加一个属性值'))
      }
      callback()
    }
    return {
      baseSaleAttrList: [],
      trademarkList: [],
      baseSaleAttrId: '',
      baseUrl: process.env.VUE_APP_BASE_API,
      imgUrl: '',
      imgName: '',
      dialogVisible: false,
      limit: 3,
      attrValue: '',
      spu: {
        spuName: '',
        tmId: '',
        description: '',
        spuImageList: [],
        spuSaleAttrList: []
      },
      rules: {
        spuName: [
          { required: true, message: '请输入SPU名称', trigger: 'blur' }
        ],
        tmId: [
          { required: true, message: '请输入SPU品牌' }
        ],
        description: [
          { required: true, message: '请输入SPU描述', trigger: 'blur' }
        ],
        spuImageList: [
          { validator: checkImg, required: true }
        ],
        spuSaleAttrList: [
          { validator: checkAttrList, required: true }
        ]
      }
    }
  },
  computed: {
    ...mapState('category', ['category3Id']),
    AttrList() {
      return this.baseSaleAttrList.filter(item => !this.spu.spuSaleAttrList.some(item2 => item2.baseSaleAttrId === item.id))
    }
  },
  async mounted() {
    const [baseSaleAttrList, trademarkList] = await Promise.allSettled([
      getBaseSaleAttrList(),
      reqGetTrademarkList()
    ])
    if (baseSaleAttrList.status === 'fulfilled') {
      this.baseSaleAttrList = baseSaleAttrList.value.data
    }
    if (trademarkList.status === 'fulfilled') {
      this.trademarkList = trademarkList.value.data
    }
  },
  methods: {
    handlePictureCardPreview(file) {
      this.imgUrl = file.url
      this.imgName = file.name
      this.dialogVisible = true
    },
    handleRemove(file) {
      this.spu.spuImageList = this.spu.spuImageList.filter(item => item.imgName !== file.name)
    },
    beforeAvatarUpload(file) {
      const type = ['image/jpeg', 'image/png']
      const isJPG = type.includes(file.type)
      const isLt500kb = file.size / 1024 <= 5
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或 png 格式!')
      }
      if (!isLt500kb) {
        this.$message.error('上传头像图片大小不能超过 500KB!')
      }
      return isJPG && isLt500kb
    },
    handleAvatarSuccess(res, file) {
      this.imgUrl = res.data
      this.imgName = file.name
      this.spu.spuImageList.push({
        imgName: this.imgName,
        imgUrl: this.imgUrl
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          const data = {
            category3Id: this.category3Id,
            description: this.spu.description,
            spuImageList: this.spu.spuImageList,
            spuName: this.spu.spuName,
            spuSaleAttrList: this.spu.spuSaleAttrList,
            tmId: this.spu.tmId
          }
          try {
            await uploadSpuInfo(data)
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.$emit('update:show', false)
          } catch (error) {
            this.$message({
              message: '添加失败',
              type: 'error'
            })
          }
        } else {
          return false
        }
      })
    },
    addSpuSaleAttr() {
      const saleAttrName = this.baseSaleAttrList.find(item => item.id === this.baseSaleAttrId).name
      this.spu.spuSaleAttrList.push({
        baseSaleAttrId: this.baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
        isShow: false
      })
      this.baseSaleAttrId = ''
    },
    delSpuSaleAttr(index) {
      this.spu.spuSaleAttrList.splice(index, 1)
    },
    edit(row, index) {
      row.isShow = true
      this.$nextTick(() => {
        this.$refs[`inp${index}`].focus()
      })
    },
    addAttrValue(row, index) {
      if (this.attrValue) {
        this.spu.spuSaleAttrList[index].spuSaleAttrValueList.push({
          baseSaleAttrId: this.spu.spuSaleAttrList[index].baseSaleAttrId,
          saleAttrName: this.spu.spuSaleAttrList[index].saleAttrName,
          saleAttrValueName: this.attrValue
        })
        this.attrValue = ''
      }
      row.isShow = false
    },
    handleClose(index1, index2) {
      this.spu.spuSaleAttrList[index1].spuSaleAttrValueList.splice(index2, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.inp{
  width: 200px;
}
</style>
