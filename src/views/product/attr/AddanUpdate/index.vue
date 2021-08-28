<template>
  <el-card class="container">
    <el-form label-width="80px">
      <el-form-item label="属性名">
        <el-input class="add-input long" placeholder="请输入属性名" />
      </el-form-item>
    </el-form>

    <el-button type="primary" icon="el-icon-plus" class="btn">添加属性值</el-button>

    <el-table border class="table">
      <el-table-column type="index" align="center" label="序号" width="50" />
      <el-table-column label="属性值名称" />
      <el-table-column label="操作" />
    </el-table>

    <el-button type="primary" class="btnsmall">确定</el-button>
    <el-button class="btnsmall" @click="$emit('update:show', false)">取消</el-button>
  </el-card>
</template>
<script>
export default {

}
</script>

<style lang="scss" scoped>
.long{
  width: 250px;
}
.btn{
  margin-bottom: 20px;
}
.btnsmall{
  margin-top: 20px;
}
</style>
