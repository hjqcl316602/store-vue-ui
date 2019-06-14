<script>
import Vue from 'vue'
 import { Loadmore } from "../../package/index.js";
 Vue.use(Loadmore)
export default {
  name: "",
  data() {
    return {
      list: 30
    };
  },
  methods: {
     
    onLoad() {
      setTimeout(() => {
        this.list += 5;
      }, 1000);
    }
  }
};
</script>

<template>
  <div class="">
    <jq-loadmore @load="onLoad">
      <div
        class="list jq-border_bottom"
        v-for="(item,index) in list"
        :key="index"
      >
        list - {{index}}
      </div>
    </jq-loadmore>
  </div>
</template>

<style   scoped>
.list {
  height: 50px; 
  text-align: center;
  background: #fff;
  line-height: 50px;
}
</style>