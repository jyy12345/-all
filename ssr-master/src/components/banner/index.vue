<template>
  <div>
    <swiper
      class="cont"
      @change="switchItem($event)"
      :current="currentTab"
      circular="true"
      indicator-dots="true"
      skip-hidden-item-layout="true"
    >
      <swiper-item v-for="(item,index) in bannerList" :key="index" >
        <div class="banner" @click="look(item)">
          <img :src="url + item.cover" alt />
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
export default {
  props: {
    bannerList: {
      type: Array,
      defalut: () => {
        return [1, 2, 3];
      }
    }
  },
  data() {
    return {
      currentTab: 0, //当前所在滑块的index
      url: ""
    };
  },
  mounted() {
    this.url = this.domains;
    console.log(this.bannerList);
  },
  methods: {
    switchItem(v) {
      console.log(v);
    },
    look(v) {
      console.log(v);
      wx.navigateTo({
        url:"../../pages/moduleMeeting/signin/main?id=" + v.id
      })
    }
  }
};
</script>
<style scoped>
.banner {
  width: 100%;
  height: 355rpx;
  background: rosybrown;
}
.banner img {
  width: 100%;
  height: 100%;
}
</style>