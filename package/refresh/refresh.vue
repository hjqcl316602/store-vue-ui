<script>
import { getScrollEventTarget, getScrollTop } from "../utils";

export default {
  props: {
    onRefresh: {
      type: Function
    }
  },
  name: "jq-refresh",
  data() {
    return {
      headHeight: 50,
      status: "normal",
      message: "下拉刷新"
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$nextTick(() => {
        // 获取当前refresh节点
        this._refreshTrack = this.$refs["refresh-track"];
        // 获取滚动元素
        this._scrollTrack = getScrollEventTarget(this.$el);
        //console.log(this._refreshTrack)
        //console.log(this._scrollTrack)
      });
    },
    /**
     * @name: 判断滚动元素是否是触顶
     * @msg:  如果元素是触顶的话，才能进行下滑事件
     */
    isCeiling() {
      return getScrollTop(this._scrollTrack) === 0;
    },
    /**
     * @name: 手指触摸开始
     */
    touchstart(e) {
      this._isCeiling = this.isCeiling();
      this._moveTranY = 0;
      this._startPos = 0;
      if (this._isCeiling && this.status == "normal") {
        this.message = "下拉刷新";
        this._startPos = e.touches[0].pageY || e.touches[0].clientY;
        this._refreshTrack.style.transition = "transform 0s";
      }
    },
    /**
     * @name: 手指滑动
     */
    touchmove(e) {
      let moveY = e.touches[0].pageY - this._startPos;

      if (this._isCeiling && moveY >= 0 && this.status == "normal") {
        //console.log(moveY);
        this._moveTranY = this.ease(moveY);
        this.$emit("pull", this._moveTranY);
        if (this._moveTranY >= this.headHeight) {
          this.message = "释放刷新";
        } else {
          this.message = "下拉刷新";
        }
        this._refreshTrack.style.transform =
          "translateY(" + this._moveTranY + "px)";
        e.cancelable && e.preventDefault();
      }
    },
    /**
     * @name: 手指触摸结束
     */
    touchend(e) {
      if (this._isCeiling && this.status == "normal") {
        this._refreshTrack.style.transition = "transform 0.4s ease";
        if (this._moveTranY > this.headHeight + 10) {
          this._moveTranY = this.headHeight;
          this.status = "loading";
          this.message = "加载中...";
          this._refreshTrack.style.transform =
            "translateY(" + this._moveTranY + "px)";
          // 使用两种方式 1.添加一个onRefresh方法，必须要返回promise 2.等待多少时间去触发事件
          if (this.onRefresh) {
            this.onRefresh()
              .then(message => {
                this.status = "normal";
                this.message = message || "加载完成";
                this._refreshTrack.style.transform = "translateY(0px)";
              })
              .catch(message => {
                this.status = "normal";
                this.message = message || "加载失败";
                this._refreshTrack.style.transform = "translateY(0px)";
              });
          } else {
            setTimeout(() => {
              this.status = "normal";
              this.message = "加载完成";
              this._refreshTrack.style.transform = "translateY(0px)";
              this.$emit("refresh");
            }, 3000);
          }
        } else {
          this.status = "normal";
          this.message = "加载完成";
          this._refreshTrack.style.transform = "translateY(0px)";
        }
      }
    },
    /**
     * @name: 缓动函数，
     * @msg:  需要计算抛物线函数 和 一次函数的重合点，增加动画的舒适性
     * @return: [number]
     */
    ease(height) {
      const { headHeight } = this;
      return height < headHeight
        ? height
        : height < headHeight * 2
        ? Math.round(headHeight + (height - headHeight) / 2)
        : Math.round(headHeight * 1.5 + (height - headHeight * 2) / 4);
    }
  }
};
</script>

<template>
  <div class="jq-refresh">
    <div
      class="jq-refresh-track"
      ref='refresh-track'
      @touchstart='touchstart'
      @touchmove='touchmove'
      @touchend='touchend'
    >
      <div class="jq-refresh-header">
        <slot name='header'>
          <div class="jq-refresh-header-content">{{ message }}</div>
        </slot>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<style   scoped>
</style>