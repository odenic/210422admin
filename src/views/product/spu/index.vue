<template>
  <div>
    <CategorySelector :name="'Spu管理'" :disabled="isShow !== 1" />
    <SpuList v-if="isShow === 1" :show.sync="isShow" @setSpuInfo="spuInfo = $event" />
    <AddandUpdate v-if="isShow === 2" :show.sync="isShow" />
    <AddSku v-if="isShow === 3" :info="spuInfo" :show.sync="isShow" />
  </div>
</template>

<script>
import CategorySelector from '@/components/CategorySelector'
import SpuList from './SpuList'
import AddandUpdate from './AddandUpdate'
import AddSku from './AddSku'
export default {
  name: 'Spu',
  components: {
    CategorySelector,
    SpuList,
    AddandUpdate,
    AddSku
  },
  data() {
    return {
      isShow: 1,
      spuInfo: {}
    }
  }
}
</script>

<style lang="scss" scoped></style>
