<template>
  <div class="brand">
    <ul class="branduls" v-if="list.length">
      <li class="brandlis" v-for="(item,index) in list" :key="index">
        <img :src="url + item" alt />
      </li>
    </ul>
    <p class="no" v-else>暂无数据</p>
  </div>
</template>
<script>
import "../../../../static/wxss/brand.wxss";
export default {
  data() {
    return {
      list: [],
      url: ""
    };
  },
  onLoad(v) {
    this.url = this.domains;
    this.init(v.id);
  },
  methods: {
    init(id) {
      this.axios
        .post({
          url: "/api/meeting/company",
          data: { meeting_id: id }
        })
        .then(res => {
          if (res.data.status == "200") {
            this.list = res.data.data.company;
          }
        });
    }
  }
};
</script>
<style scopecd>
.no {
  text-align: center;
  font-size: 35rpx;
  color: #666;
  margin-top: 30rpx;
}
</style>