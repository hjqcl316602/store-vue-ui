<template>
  <div id="app">
    <router-view></router-view>
    <demo name="ksdjsjkd"></demo>
    <demo2></demo2>
  </div>
</template>
<script>
import Vue from "vue";
import demo2 from "./demo/demo.vue";
import demo from "./demo/index.js";

console.log(demo2);
export default {
  name: "App",
  components: { demo, demo2 },
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>


