export default {
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  },
  mounted() {
    window.addEventListener('resize', this.resize)
  },
  methods: {
    resize() {
      this.myChart.resize()
    }
  }
}
