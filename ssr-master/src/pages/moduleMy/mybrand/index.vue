<template>
  <div class="brand">
    <div v-if="company.length">
      <h3 class="brandh3">企业获奖信息</h3>
      <ul class="branduls">
        <li class="brandlis" v-for="(item,index) in company" :key="index">
          <img :src="url + item" alt />
        </li>
      </ul>
    </div>
    <p class="no" v-else>暂无获奖信息</p>
  </div>
</template>
<script>
import "../../../../static/wxss/brand.wxss";
export default {
  data() {
    return {
      company: [],
      url: ""
    };
  },
  mounted() {
    this.url = this.domains;
    this.init();
  },
  methods: {
    init() {
      this.axios
        .post({
          url: "/api/personal/company"
        })
        .then(res => {
          if (res.data.status == "200") {
            this.company = res.data.data.company;
          } else if (res.data.status == "400") {
            wx.showToast({
              title: res.data.message,
              icon: "none",
              duration: 2000
            });
          }
        });
    }
  }
};
</script>
<style scopecd>
.brandh3 {
  font-size: 30rpx;
  color: #666;
  margin-bottom: 20rpx;
}
.no {
  font-size: 30rpx;
  color: #666;
  margin-top: 30rpx;
  text-align: center;
}
</style>