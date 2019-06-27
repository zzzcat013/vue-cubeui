<template>
  <div class="about">
    <h1>This is an about page</h1>
    <cube-button @click="showDialog">show dialog</cube-button>
  </div>
</template>
<script>
  export default {
    methods: {
      showDialog() {
        this.$createDialog({
          type: 'alert',
          title: '提示',
          content: 'Cube-UI 已经成功安装！'
        }).show()
      }
    }
  }
</script>