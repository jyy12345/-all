<template>
  <div class="infoNumber">{{num}}</div>
</template>
<script>
export default {
  props: {
    num: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {};
  }
};
</script>
<style  scoped>
.infoNumber {
  width: 35rpx;
  height: 35rpx;
  border-radius: 50%;
  font-size: 20rpx;
  line-height: 35rpx;
  color: white;
  background: #0070cc;
  position: absolute;
  right: 30%;
  top: -10%;
}
</style>