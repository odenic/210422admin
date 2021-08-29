<template>
  <div>
    <CategorySelector :disabled="isShow" />
    <AttrList v-if="!isShow" :show.sync="isShow" />
    <AddandUpdate v-if="isShow" :show.sync="isShow" />
  </div>
</template>

<script>
import CategorySelector from '@/components/CategorySelector/index.vue'
import AttrList from './AttrList/index.vue'
import AddandUpdate from './AddanUpdate/index.vue'
export default {
  name: 'Attr',
  components: {
    CategorySelector,
    AttrList,
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
