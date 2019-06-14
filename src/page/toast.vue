<script>
 import { Toast } from "../../package/index.js";
export default {
  name: '',
  data() { 
    return {

    }
  },
  methods:{
    showToast(type){
      Toast[type]('轻提示！',2500)
    }
  },
  template:"<div><button >错误提示</button></div>"
 }
</script>

<template>
  <div class=""><button @click="showToast('error')">错误提示</button> </div>
</template>

<style   scoped>
</style>