<template>
  <el-card class="container">
    <el-form ref="SkuForm" label-width="100px" :model="sku" :rules="rules">
      <el-form-item label="SPU名称">
        <span>{{ info.name }}</span>
      </el-form-item>
      <el-form-item label="SKU名称" prop="skuName">
        <el-input v-model="sku.skuName" placeholder="请输入SKU名称" />
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input-number
          v-model="sku.price"
          controls-position="right"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="重量" prop="weight">
        <el-input-number
          v-model="sku.weight"
          controls-position="right"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="SKU描述" prop="skuDesc">
        <el-input
          v-model="sku.skuDesc"
          type="textarea"
          :row="2"
          placeholder="请输入SKU描述"
        />
      </el-form-item>
      <el-form-item label="平台属性" prop="skuAttrValueList">
        <el-row>
          <el-col
            v-for="item,index in AttrValueList"
            :key="item.id"
            :xs="24"
            :md="12"
            :lg="8"
          >
            <el-form-item>
              <el-select v-model="sku.skuAttrValueList[index]" :placeholder="`选择${item.attrName}`">
                <el-option
                  v-for="value in item.attrValueList"
                  :key="value.id"
                  :label="value.valueName"
                  :value="{
                    attrId: item.id,
                    attrName: item.attrName,
                    valueId: value.id,
                    valueName: value.valueName
                  }"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="销售属性" prop="skuSaleAttrValueList">
        <el-row>
          <el-col
            v-for="item,index in spuSaleAttrList"
            :key="item.id"
            :xs="24"
            :md="12"
            :lg="8"
          >
            <el-form-item>
              <el-select v-model="sku.skuSaleAttrValueList[index]" :placeholder="`请选择${item.saleAttrName}`">
                <el-option
                  v-for="attr in item.spuSaleAttrValueList"
                  :key="attr.id"
                  :label="attr.saleAttrValueName"
                  :value="{
                    saleAttrId: item.id,
                    saleAttrName: item.saleAttrName,
                    saleAttrValueId: attr.id,
                    saleAttrValueName: attr.saleAttrValueName,
                    spuId: item.spuId
                  }"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="SKU图片" prop="skuImageList">
        <el-table border class="table" :data="spuImageList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="图片">
            <template v-slot="{ row }">
              <img
                :src="row.imgUrl"
                :alt="row.imgName"
                style="width: 200px;height: 200px"
              >
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" />
          <el-table-column label="操作">
            <template v-slot="{ row }">
              <el-button v-show="row.isDefault==='0'" type="primary" size="mini" @click="setDefault(row)">设置默认图片 </el-button>
              <el-button v-show="row.isDefault==='1'" type="success" size="mini" disabled>默认图片 </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('SkuForm')">确认</el-button>
        <el-button @click="$emit('update:show', 1)">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { mapState } from 'vuex'
import { reqgetAttrList } from '@/api/attr'
import { reqGetSpuSaleAttrList, reqGetSpuImageList, reqSaveSkuInfo } from '@/api/spu'
export default {
  name: 'AddSku',
  props: {
    info: {
      type: Object,
      default: () => ({
        id: NaN,
        name: ''
      })
    }
  },
  data() {
    const priceAndWeight = (rule, value, callback) => {
      if (value <= 0) {
        callback(new Error('请设置合法的数值'))
      } else {
        callback()
      }
    }
    const checkAttrList = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('请至少选择一项属性'))
      } else {
        callback()
      }
    }
    const checkImgList = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('请至少选择一张图片'))
      }
      if (value.every(item => item.isDefault === '0')) {
        callback(new Error('请设置默认图片'))
      }
      callback()
    }
    return {
      spuId: this.info.id,
      AttrValueList: [],
      spuSaleAttrList: [],
      spuImageList: [],
      skuDefaultImg: '',
      sku: {
        skuAttrValueList: [],
        skuSaleAttrValueList: [],
        skuImageList: [],
        skuName: '',
        price: 0,
        weight: 0,
        skuDesc: ''
      },
      rules: {
        skuName: [
          { required: true, message: '请输入SKU名称', trigger: 'blur' }
        ],
        skuDesc: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        price: [
          { required: true, validator: priceAndWeight }
        ],
        weight: [
          { required: true, validator: priceAndWeight }
        ],
        skuAttrValueList: [
          { required: true, validator: checkAttrList }
        ],
        skuSaleAttrValueList: [
          { required: true, validator: checkAttrList }
        ],
        skuImageList: [
          { required: true, validator: checkImgList }
        ]
      }
    }
  },
  computed: {
    ...mapState('category', ['category3Id', 'category1Id', 'category2Id'])
  },
  async mounted() {
    const [AttrValueList, spuSaleAttrList, spuImageList] = await Promise.allSettled([reqgetAttrList(this.category1Id, this.category2Id, this.category3Id), reqGetSpuSaleAttrList(this.spuId), reqGetSpuImageList(this.spuId)])
    if (AttrValueList.status === 'fulfilled') {
      this.AttrValueList = AttrValueList.value.data
    }
    if (spuSaleAttrList.status === 'fulfilled') {
      this.spuSaleAttrList = spuSaleAttrList.value.data
    }
    if (spuImageList.status === 'fulfilled') {
      this.spuImageList = spuImageList.value.data.map(item => ({
        ...item,
        isDefault: '0'
      }))
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.sku.skuImageList = val
    },
    setDefault(row) {
      this.spuImageList.forEach(item => { item.isDefault = '0' })
      row.isDefault = '1'
      this.skuDefaultImg = row.imgUrl
    },
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          const data = {
            category3Id: this.category3Id,
            price: this.sku.price,
            skuAttrValueList: this.sku.skuAttrValueList.filter(Boolean),
            skuDefaultImg: this.skuDefaultImg,
            skuDesc: this.sku.skuDesc,
            skuImageList: this.sku.skuImageList,
            skuName: this.sku.skuName,
            skuSaleAttrValueList: this.sku.skuSaleAttrValueList.filter(Boolean),
            spuId: this.spuId,
            weight: this.sku.weight
          }
          try {
            await reqSaveSkuInfo(data)
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.$emit('update:show', 1)
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
