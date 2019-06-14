<script>
export default {
  name: "jq-carousel",
  data() {
    return {
      carousel: {
        width: 0,
        index: 0,
        items: 0
      },
      left: 0,
      minMove: 30,
      isTransition: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$nextTick(() => {
        this.carousel.width = this.$refs["carousel"]["offsetWidth"];
        this.carousel.items = this.$refs["carousel-wrap"].children.length;
        this.setInterval();
      });
    },
    /**
     * @name: 添加定时器 
     */
    setInterval() {
      this.clearInterval()
      this._carouselTimer = setInterval(() => {
        if (this.carousel.index === this.carousel.items - 1) {
          this.carousel.index = 0;
        } else {
          this.carousel.index++;
        }
        this.moveToIndex(this.carousel.index);
      }, 3000);
    },
    /**
     * @name: 清除定时器 
     */
    clearInterval() {
      clearInterval(this._carouselTimer);
      this._carouselTimer = null ;
    },
    /**
     * @name: 手指触摸滑动 
     */
    touchstart(e) {
      this._touchStartX = e.touches[0].pageX || e.touches[0].clientX;
      this._startLeft = this.left;
    },
    /**
     * @name: 手指触摸结束
     */
    touchmove(e) {
      this.clearInterval()
      this._touchEndX = e.touches[0].pageX || e.touches[0].clientX;
      let moveX = this._touchEndX - this._touchStartX;
      let moveTranX = this.ease(Math.abs(moveX),this.carousel.width,this.carousel.width/2)
      let moveValue = moveX >= 0 ? moveTranX :- moveTranX ;

      this.left = this._startLeft + moveValue;
    },
    /**
     * @name: 手指触摸开始 
     */
    touchend(e) {
      let moveX = this._touchStartX - this._touchEndX;
      
      if (moveX > this.carousel.width / 3) {
        this.carousel.index = Math.min(
          ++this.carousel.index,
          this.carousel.items - 1
        );
      } else if (moveX < -this.carousel.width / 3) {
        this.carousel.index = Math.max(--this.carousel.index, 0);
      }
      this.moveToIndex(this.carousel.index);
      this.setInterval()
    },
    /**
     * @name: 缓动函数，
     * @msg:  需要计算抛物线函数 和 一次函数的重合点，增加动画的舒适性
     * @return: [number]
     */
    ease(value, x = 300, y = 150) {
      let p = (y * y) / (2 * x);
      let coincide = 2 * p; 
      return value > coincide ?  Math.sqrt(2 * p * value) : value ;
    },
    /**
     * @name: 移动 
     */
    moveToIndex() {
      this.isTransition = true;
      this.left = - this.carousel.index * this.carousel.width;
      this.$refs["carousel-wrap"].addEventListener("transitionend", e => {
        this.isTransition = false;
        this.$emit('changeEnd',this.carousel.index)
      });
    },
  },
  beforeDestroy(){
    this.clearInterval()
  }
};
</script>

<template>
  <div
    class="jq-carousel"
    ref='carousel'
  >
    <div
      class="jq-carousel-wrap"
      :class="{'move':isTransition }"
      @touchstart='touchstart'
      @touchmove='touchmove'
      @touchend='touchend'
      ref='carousel-wrap'
      :style="{'left':this.left+'px' }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style   scoped>
</style>