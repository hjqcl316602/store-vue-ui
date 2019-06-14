<script>
import {
  getBodyScrollTop,
  getClientHeight,
  getScrollHeight,
  throttle
} from "../utils";

export default {
  name: "jq-loadmore",
  props: {
    threshold: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {};
  },
  mounted() {
    window.onscroll = () => {
      throttle(this.loadmore);
    };
  },
  methods: {
    loadmore() {
      let bodyScrollTop = getBodyScrollTop();
      let clientHeight = getClientHeight();
      let scrollHeight = getScrollHeight();
      //alert(bodyScrollTop + " " + clientHeight + " " + scrollHeight);
      if (bodyScrollTop + clientHeight + this.threshold >= scrollHeight) {
        this.$emit("load");
      }
    }
  },
  beforeDestroy() {
    window.onscroll = null;
  }
};
</script>

<template>
  <div class="jq-loadmore">
    <slot></slot>
  </div>
</template>

<style   scoped>
</style>