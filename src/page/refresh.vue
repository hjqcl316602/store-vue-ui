<script>
import Vue from 'vue'
 import { Refresh } from "../../package/index.js";
Vue.use(Refresh) 
export default {
  name: "",
  data() {
    return {
      list:10
    };
  },
  methods: {
    onRefresh() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.list = 20;
          reject("数据加载失败");
        }, 2000);
      });
    },
    onPull(pageY) {
      console.log(pageY);
    }, 
  },
};
</script>

<template>
  <div class="">
    <jq-refresh
      @pull="onPull"
      :on-refresh="onRefresh"
    >
      <div
        class="list jq-border_bottom"
        v-for="(item,index) in list"
        :key="index"
      >
        list - {{index}}
      </div>
    </jq-refresh>
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