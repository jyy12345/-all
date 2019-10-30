<template>
  <div class="vague">
    <input
      type="text"
      class="input"
      v-model="obj.name"
      placeholder="请输入公司关键字进行搜索"
      @input="change(obj.name)"
    />
    <ul class="uls" v-if="vagusIsHide">
      <li
        class="lis"
        v-for="(item,index) in companyList"
        :key="index"
        @click="details(item)"
      >{{item.name}}</li>
    </ul>
    <div class="detail">
      <span class="retu" @click="retu">返回</span>
      <span class="retu ok" @click="ok">确认</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      obj: { name: "", id: "" },
      companyList: [],
      vagusIsHide: false
    };
  },
  methods: {
    details(item) {
      this.obj = {
        name: item.name,
        id: item.id
      };
      this.vagusIsHide = false;
    },
    change(name) {
      if (name != "") {
        this.company(name);
        this.vagusIsHide = true;
      } else this.vagusIsHide = false;
    },
    retu() {
      this.$emit("retu");
    },
    ok() {
      this.$emit("detailsUpdate", this.obj);
    },
    company(name) {
      //获取公司列表
      this.axios
        .post({
          url: "/api/company/index",
          data: { name: name }
        })
        .then(res => {
          if (res.data.status == "200") {
            this.companyList = res.data.data;
          }
        });
    }
  }
};
</script>
<style  scoped>
.vague {
  width: 100%;
  height: 100vh;
  background: rgb(243, 247, 250);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
  padding: 20rpx;
  box-sizing: border-box;
}
.input {
  height: 70rpx;
  background: white;
  padding: 0 20rpx;
  box-sizing: border-box;
}
.uls {
  width: 100%;
  height: 200rpx;
  overflow: auto;
  padding: 10rpx;
  background: white;
  margin: 30rpx 0;
  box-sizing: border-box;
}
.lis {
  line-height: 60rpx;
  font-size: 30rpx;
  color: #666;
}
.detail {
  display: flex;
  justify-content: space-between;
  padding: 0 150rpx;
  margin-top: 30rpx;
}
.detail > span {
  display: block;
  width: 45%;
  text-align: center;
  line-height: 70rpx;
  border-radius: 50rpx;
  text-align: center;
  font-size: 30rpx;
}
.retu {
  background: white;
}
.ok {
  background: royalblue;
  color: white;
}
</style>