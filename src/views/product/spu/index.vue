<template>
  <div>
    <CategorySelector :name="'Spu管理'" :disabled="isShow" />
    <SpuList v-if="!isShow" :show.sync="isShow" />
    <AddandUpdate v-if="isShow" :show.sync="isShow" />
  </div>
</template>

<script>
import CategorySelector from '@/components/CategorySelector'
import SpuList from './SpuList'
import AddandUpdate from './AddandUpdate'
export default {
  name: 'Spu',
  components: {
    CategorySelector,
    SpuList,
    AddandUpdate
  },
  data() {
    return {
      isShow: false
    }
  }
}
</script>

<style lang="scss" scoped></style>
