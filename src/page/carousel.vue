<script>
import Vue from 'vue'
import { Carousel } from "../../package/index.js";
Vue.use(Carousel);
console.log(Carousel)
let image1 = require("../../src/assets/zly (1).png");
let image2 = require("../../src/assets/zly (4).jpeg");
let image3 = require("../../src/assets/zly (8).jpg");
let image4 = require("../../src/assets/zly (12).jpg");
let image5 = require("../../src/assets/zly (20).jpg");

export default {
  name: "demo",
  data() {
    return {
      imgs: [image1, image2, image3, image4, image5]
    };
  },
  methods:{
    change(index){
      //console.log(index)
    }
  }
};
</script>

<template>
  <div class="demo">
    <jq-carousel @changeEnd="change">
      <template>
        <jq-carousel-item
          v-for="(item,index) in imgs"
          :key='index'
        >
          <div class="box box-1">
            <img
              :src="item"
              alt=""
            >
          </div>
        </jq-carousel-item>
      </template>
    </jq-carousel>
  </div>
</template>

<style   scoped>
.box {
  height: 200px;
  position: relative;
}
 .box img{
   position: absolute;
   top:50%;
   transform: translateY(-50%);
   width: 100%; 
 }
</style>