<template>
  <div class="confirm">
    <section class="shop">
      <div class="shopHeader">
        <div class="headerLogo">
          <img :src="item.meeting.cover" alt />
        </div>
        <div class="headerText">{{item.meeting.title}}</div>
      </div>
      <p class="time border">
        <span class="timeLogo">
          <img src="/static/images/time.png" alt />
        </span>
        <span class="timeText">{{start_time}}-{{end_time}}</span>
      </p>
      <p class="map border">
        <span class="mapLogo">
          <img src="/static/images/map.png" alt />
        </span>
        <span class="timeText">{{item.meeting.address}}</span>
      </p>
      <div class="money border">
        <div class="moneyLeft">
          <span class="moneyLogo">
            <img src="/static/images/money.png" alt />
          </span>
          <span class="timeText">票价</span>
        </div>
        <span class="moneyRight">￥{{item.meeting.amount}}/张</span>
      </div>
      <div class="number border">
        <div class="moneyLeft">
          <span class="moneyLogo" style="width:26rpx;height:26rpx;">
            <img src="/static/images/number.png" alt />
          </span>
          <span class="timeText">数量</span>
        </div>
        <div class="numberEdit">
          <span class="off" @click="off" v-if="number != 0">
            <img src="/static/images/off.png" alt />
          </span>
          <span class="num" v-if="number != 0">{{number}}</span>
          <span class="add off" @click="add">
            <img src="/static/images/add.png" alt />
          </span>
        </div>
      </div>
    </section>
    <section class="personnel">
      <div class="personnelHeader">
        <div class="personnelLogo">
          <img src="/static/images/tel.png" alt />
        </div>
        <div class="personnelText">选择参会人员</div>
      </div>
      <div class="personnelList">
        <div class="listTr">
          <span>姓名</span>
          <span>岗位</span>
        </div>
        <ul class="uls" v-if="userList.length">
          <li class="lis" v-for="(it,index) in userList" :key="index" @click="userIndex(index)">
            <picker
              @change="bindPickerChange"
              range-key="username"
              :range="item.userList"
              class="picker"
            >
              <span class="list" style="width:100%;">{{it.username}}</span>
            </picker>
            <span class="list">{{it.position}}</span>
          </li>
        </ul>
        <p class="no" v-else>暂无人员</p>
      </div>
    </section>
    <section class="instructions">
      <p class="inst">说明</p>
      <span class="instText">
        <p>请及时付款，避免座位释放。</p>
      </span>
    </section>
    <section class="soft">
      <div class="sortNum">
        <span>合计：</span>
        <span>￥{{soft}}元</span>
      </div>
      <span class="confir" @click="pay">订座</span>
    </section>
  </div>
</template>
<script>
import { time, toast } from "../../../utils/validate";
export default {
  data() {
    return {
      money: 1000,
      number: 0, //票数
      meeting_id: "", //会议id
      userList: [],
      userListIndex: 0,
      item: {},
      url: ""
    };
  },
  onLoad(v) {
    this.url = this.domains;
    this.meeting_id = v.meeting_id;
    this.item = JSON.parse(v.item);
    this.item.meeting.cover = this.domains + this.item.meeting.cover;
  },
  onShow() {
    this.userList = [];
    this.number = 0;
  },
  computed: {
    soft() {
      //总和
      return this.number * Number(this.item.meeting.amount);
    },
    start_time() {
      //开始时间
      return time(this.item.meeting.start_time);
    },
    end_time() {
      //结束时间
      return time(this.item.meeting.end_time);
    }
  },
  methods: {
    userIndex(index) {
      this.userListIndex = index;
    },
    bindPickerChange(e) {
      let index = Number(e.mp.detail.value);
      let { username, id, position, phone } = this.item.userList[index];
      let repeat = this.userList.some(v => {
        return v.username == username;
      });
      if (repeat) {
        wx.showToast({
          title: "参会人员不能重复",
          icon: "none",
          duration: 1000
        });
        return;
      } else {
        this.$set(this.userList[this.userListIndex], "username", username);
        this.$set(this.userList[this.userListIndex], "id", id);
        this.$set(this.userList[this.userListIndex], "position", position);
        this.$set(this.userList[this.userListIndex], "phone", phone);
      }
    },
    off() {
      if (this.number <= 0) return (this.number = 0);
      else this.number--;
      this.userList.pop();
    },
    add() {
      this.number++;
      this.userList.push({
        username: "选择人员",
        position: "",
        id: ""
      });
    },
    pay() {
      let length = this.userList.length;
      for (let i = length - 1; i >= 0; i--) {
        if (this.userList[i].username == "选择人员") this.userList.splice(i, 1);
      }
      this.number = this.userList.length;
      let doc = this.userList.every(v => {
        return v.username != "选择人员";
      });
      if (this.userList.length && doc) {
        let userList = [];
        this.userList.forEach(item => {
          userList.push({
            id: item.id,
            phone: item.phone,
            username: item.username
          });
        });
        let query = {
          meeting_id: this.meeting_id, //会议id
          total_amount: this.soft, //总金额
          user_ids: JSON.stringify(userList) //购买人员
        };
        this.axios
          .post({
            url: "/api/order/confirm",
            data: query
          })
          .then(res => {
            if (res.data.status == "200") {
              res.data.data.meeting.cover =
                this.domains + res.data.data.meeting.cover;
              wx.navigateTo({
                url:
                  "../pay/main?soft=" +
                  this.soft +
                  "&data=" +
                  JSON.stringify(res.data.data) +
                  "&meeting_id=" +
                  this.meeting_id //会议Id
              });
            } else if (res.data.status == "400") {
              toast(res.data.message);
            }
          });
      } else {
        toast("请选择人员");
        return;
      }
    }
  }
};
</script>
<style  scoped>
.confirm {
  width: 100%;
  height: 100vh;
  background: #0070cc;
  background: url(https://img-blog.csdnimg.cn/20191010150102879.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zOTc3MzIxOA==,size_16,color_FFFFFF,t_70)
    no-repeat;
  background-size: cover;
  padding: 40rpx 20rpx 120rpx 20rpx;
  box-sizing: border-box;
  position: relative;
  overflow: auto;
}
.shop {
  width: 100%;
  border-radius: 15rpx;
  background: white;
  padding-top: 40rpx;
  box-sizing: border-box;
}
.shopHeader {
  display: flex;
  padding: 0 30rpx 40rpx 30rpx;
  box-sizing: border-box;
}
.headerLogo {
  width: 226rpx;
  height: 154rpx;
  margin-right: 30rpx;
  /* background: rebeccapurple; */
}
.headerLogo img {
  width: 100%;
  height: 100%;
}
.headerText {
  width: calc(100% - 256rpx);
  height: 83rpx;
  font-size: 30rpx;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.border {
  padding: 30rpx;
  box-sizing: border-box;
  border-top: 1px solid #f1f1f1;
  align-items: center;
  display: flex;
}
.timeLogo {
  display: flex;
  align-self: auto;
  width: 30rpx;
  height: 30rpx;
  margin-right: 15rpx;
}
.timeLogo img {
  width: 100%;
  height: 100%;
}
.timeText {
  font-size: 30rpx;
  color: #666;
}
.no {
  font-size: 27rpx;
  color: #666;
  line-height: 70rpx;
  text-align: center;
  background: white;
}
.mapLogo {
  display: block;
  width: 28rpx;
  height: 34rpx;
  margin-right: 15rpx;
}
.mapLogo img {
  width: 100%;
  height: 100%;
}
.money {
  justify-content: space-between;
}
.moneyLeft {
  display: flex;
  align-items: center;
}
.moneyLogo {
  width: 30rpx;
  height: 30rpx;
  display: flex;
  align-self: auto;
  margin-right: 15rpx;
}
.moneyLogo img {
  width: 100%;
  height: 100%;
}
.moneyRight {
  font-size: 33rpx;
  font-weight: 500;
}
.number {
  justify-content: space-between;
}
.numberEdit {
  display: flex;
}
.off,
.add {
  display: block;
  width: 44rpx;
  height: 45rpx;
  border-radius: 50%;
  /* text-align: center;
  line-height: 40rpx;
  font-size: 30rpx; */
}
.off img {
  width: 100%;
  height: 100%;
}
.num {
  font-size: 30rpx;
  font-weight: 500;
  margin: 0 15rpx;
}
/* .off {
  border: 1px solid #0070cc;
  color: #0070cc;
} */
/* .add {
  background: #0070cc;
  color: white;
} */
.personnelHeader {
  display: flex;
  align-items: center;
  padding: 30rpx 25rpx;
  box-sizing: border-box;
}
.personnelLogo {
  width: 33rpx;
  height: 33rpx;
  margin-right: 15rpx;
}
.personnelLogo img {
  width: 100%;
  height: 100%;
}
.personnelText {
  font-size: 30rpx;
}
.listTr {
  border-radius: 10rpx;
  background: white;
  text-align: center;
  display: flex;
}
.listTr > span {
  display: block;
  width: 50%;
  font-size: 30rpx;
  font-weight: 550;
  line-height: 60rpx;
}
.lis {
  display: flex;
  background: #f9f9f9;
  position: relative;
  text-align: center;
  border-top: 1px solid #f1f1f1;
  height: 60rpx;
}
.lis:first-child {
  border: none;
}
.list {
  display: block;
  width: 50%;
  line-height: 60rpx;
  font-size: 27rpx;
  color: #666666;
}
.picker {
  width: 50%;
}
.instructions {
  padding: 25rpx;
  box-sizing: border-box;
  background: #eaf6ff;
  border: 1px solid #48a0e8;
  margin-top: 20rpx;
}
.inst {
  font-size: 26rpx;
  padding-left: 15rpx;
  font-weight: 600;
  color: #48a0e8;
  position: relative;
  margin-bottom: 20rpx;
}
.inst::before {
  content: "*";
  color: #48a0e8;
  position: absolute;
  left: -1%;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20rpx;
}
.instText > p {
  font-size: 25rpx;
  color: #666666;
}
.soft {
  width: 100%;
  height: 100rpx;
  position: fixed;
  left: 0;
  bottom: 0;
  background: white;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20rpx;
  box-sizing: border-box;
}
.softNum {
  display: flex;
}
.sortNum > span:nth-child(1) {
  font-size: 25rpx;
  color: #ccc;
}
.sortNum > span:nth-child(2) {
  font-size: 35rpx;
  font-weight: 600;
  color: #0070cc;
}
.confir {
  display: block;
  width: 435rpx;
  line-height: 80rpx;
  text-align: center;
  font-size: 30rpx;
  font-weight: 600;
  color: white;
  border-radius: 50rpx;
  background: #0070cc;
}
</style>