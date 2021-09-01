<template>
  <div>
    <CategorySelector :disabled="isShow" />
    <AttrList v-if="!isShow" :show.sync="isShow" @setAttr="attr = $event" />
    <AddandUpdate v-if="isShow" :attr="attr" :show.sync="isShow" @setAttr="attr = $event" />
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
      isShow: false,
      attr: {
        id: '',
        attrName: '',
        attrValueList: []
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
