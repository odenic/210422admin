<template>
  <el-card class="box-card cards">
    <div slot="header" class="clearfix">
      <span>属性管理</span>
    </div>
    <el-form :disabled="disabled">
      <el-select
        :value="category1Id"
        placeholder="一级分类"
        @change="getCategory2"
      >
        <el-option
          v-for="item in category1List"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-select
        :value="category2Id"
        placeholder="二级分类"
        class="sele"
        @change="getCategory3"
      >
        <el-option
          v-for="item in category2List"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-select
        :value="category3Id"
        placeholder="三级分类"
        class="sele"
        @change="SET_CATEGORY3ID"
      >
        <el-option
          v-for="item in category3List"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form>
  </el-card>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'CategorySelector',
  props: {
    disabled: Boolean
  },
  computed: {
    ...mapState('category', [
      'category1Id',
      'category2Id',
      'category3Id',
      'category1List',
      'category2List',
      'category3List'
    ])
  },
  mounted() {
    this.getCategory1()
  },
  beforeDestroy() {
    this.RESET()
  },
  methods: {
    ...mapActions('category', ['getCategory1', 'getCategory2', 'getCategory3']),
    ...mapMutations('category', ['SET_CATEGORY3ID', 'RESET'])
  }
}
</script>

<style lang="scss" scoped>
.sele {
  margin-left: 100px;
}
.cards {
  margin-bottom: 10px;
}
</style>
