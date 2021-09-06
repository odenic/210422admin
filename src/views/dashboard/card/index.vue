<template>
  <el-card class="box-card">
    <div class="title">
      {{ title }}
      <i class="el-icon-info" />
    </div>
    <div class="data">
      {{ data }}
    </div>
    <slot />
    <slot name="footer" />
  </el-card>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.title{
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}
.data{
  font-size: 30px;
  text-align: justify;
}
</style>
