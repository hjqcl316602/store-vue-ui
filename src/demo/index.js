export default {
  name: "demo",
  props: {
    name: [String]
  },
  data() {
    return {
      value: "黄军泉",
      show: false
    };
  },
  render(h) {
    let { show } = this
    console.log(show)
    return <div class="jq-padding" vShow={this.show}>dcsdsdsdsdsds</div>;
  }
};
