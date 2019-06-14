<script>
export default {
  name: "jq-toast",
  props: {
    type: {
      type: String,
      default:'default'
    },
    content: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    changeVisible(status){
      this.visible = status
    },
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    }
  },
  computed: {}
};
</script>

<template>
  <div
    class="jq-toast"
    :class="[{'is-active':visible},'jq-toast--'+type ]"
  >
    <span>{{ content }}</span>
  </div>
</template>

<style   scoped>
</style>