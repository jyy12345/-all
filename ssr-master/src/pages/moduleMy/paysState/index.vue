<template>
  <div class="paysstate myticket">
    <header class="header">
      <div
        v-for="(item,index) in stateList"
        :key="index"
        :class="{'border_bottom':borderIndex == index}"
        @click="borderactive(index)"
      >{{item}}</div>
    </header>
    <section class="stateContent" v-if="list.length">
      <div class="content" v-for="(item,index) in list" :key="index" @click="goPay(item)">
        <div class="contentHeader">
          <div class="icon">
            <img src="/static/images/paysStateCode.png" alt />
          </div>
          <span class="contentheaderText">订单号：{{item.order_sn}}</span>
        </div>
        <section class="listChildren">
          <!--  @click="details(item)" -->
          <div class="listPhoto">
            <img :src="item.meeting_cover" alt />
          </div>
          <div class="listText">
            <div class="listTextTop" style="padding-bottom:0;">{{item.meeting_name}}</div>
            <div class="listTextBottom">
              <span>{{item.meeting_date}} {{item.meeting_week}}</span>
              <div class="info">
                <div class="infoLogo">
                  <img src="/static/images/map.png" alt />
                </div>
                <span>{{item.meeting_address}}</span>
              </div>
            </div>
          </div>
        </section>
        <section class="operation">
          <div class="oper">
            <span class="pay" v-if="item.gopayIsHide" @click.stop="goPay(item)">去支付</span>
            <span class="cancel" v-if="item.order_status == '1'" @click.stop="cancel(item,index)">取消订单</span>
            <!-- <span class="cancel" v-if="item.order_status == '2'" @click="refund">退款</span> -->
            <!-- <span class="cancel" v-if="item.order_status == '3'">申请开票</span> -->
          </div>
        </section>
      </div>
    </section>
    <p class="no" v-else>暂无订单信息</p>
  </div>
</template>
<script>
import "../../../../static/wxss/conetnt.wxss";
export default {
  data() {
    return {
      stateList: ["待支付", "已支付", "已结束", "全部订单"],
      borderIndex: 0,
      list: [],
      lastPage: 1,
      currentPage: 1,
      url: ""
    };
  },
  onLoad(v) {
    //state判断当前是哪一个状态
    this.borderIndex = v.state;
    this.currentPage = 1;
    this.url = this.domains;
    this.list = [];
    this.init(this.borderIndex ? Number(this.borderIndex) + 1 : 1);
  },
  onReachBottom() {
    this.lower();
  },
  methods: {
    cancel(v, index) {
      this.axios
        .post({
          url: "/api/personal/orderCancel",
          data: { order_id: v.id }
        })
        .then(res => {
          if (res.data.status == "200") {
            wx.showToast({
              title: "取消订单成功",
              icon: "none",
              duration: 1000
            });
            this.list.splice(index, 1);
          }
        });
    },
    refund() {
      //退款
      wx.navigateTo({ url: `../refund/main` });
    },
    goPay(v) {
      console.log(v,'vvvvv'); 
      // order_status判断当前订单状态之前字段为status
      if (v.order_status == "1") {
        let query = {
          meeting: {
            title: v.meeting_name, //标题
            start_time: v.meeting_start_time, //开始时间
            end_time: v.meeting_end_time, //结束时间
            meeting_id: v.meeting_id, //会议Id
            address: v.meeting_detail_address, //地点
            cover: v.meeting_cover,
            is_open_wechat: v.is_open_wechat
          },
          unique_sn: v.unique_sn, //订单唯一标识
          order_ids: [
            {
              order_sn: v.order_sn,
              id: v.id,
              unique_sn: v.unique_sn,
              username: v.username
            }
          ], //订单号群
          receipt: v.receipt ,//线下支付的基本信息
          channel: v.channel //生成订单的时候用户选择的支付方式  1-线上微信支付，2-线下支付，3现场支付
        };
        wx.navigateTo({
          url: `../../moduleMeeting/pay/main?data=${JSON.stringify(
            query
          )}&meeting_id=${v.meeting_id}&soft=${v.amount}`
        });
      } else return;
    },

    lower() {
      this.currentPage++;
      if (this.currentPage <= this.lastPage)
        this.init(Number(this.borderIndex) + 1, this.currentPage);
      else {
        wx.showToast({
          title: "我是有底线的",
          icon: "none",
          duration: 1000
        });
        return;
      }
    },
    borderactive(index) {
      this.borderIndex = index;
      this.list = [];
      this.currentPage = 1;
      this.init(index + 1);
    },
    init(status = 1, page = 1) {
      //status：1待支付，2-已支付，3已结束，4全部
      this.axios
        .post({
          url: "/api/personal/orderList",
          data: { status: status, page: page }
        })
        .then(res => {
          if (res.data.status == "200") {
            this.lastPage = res.data.data.last_page;
         
            res.data.data.data.forEach(item => {
              // this.$set(item, "order_ids", item.id);
              item.meeting_cover = this.domains + item.meeting_cover
              if (item.order_status == "1" && item.is_open_wechat)
                this.$set(item, "gopayIsHide", true);
              else this.$set(item, "gopayIsHide", false);
            });
            this.list = [...this.list, ...res.data.data.data];
          }
        });
    }
  }
};
</script>
<style  scoped>
.myticket {
  position: relative;
  width: 100%;
  height: 100vh;
  /* overflow: auto; */
  background: #f4f4f4;
}
.border_bottom {
  border-bottom: 1px solid #0070cc;
}
.header {
  display: flex;
  justify-content: space-between;
  padding: 20rpx 40rpx 0 40rpx;
  box-sizing: border-box;
  background: white;
}
.header > div {
  font-size: 30rpx;
  font-weight: 500;
  color: #222222;
  text-align: center;
  padding-bottom: 30rpx;
  box-sizing: border-box;
}
.stateContent {
  padding: 20rpx;
  box-sizing: border-box;
}
.content {
  background: white;
  margin-bottom: 10rpx;
}
.contentHeader {
  width: 100%;
  padding: 20rpx 10rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.listText {
  width: calc(100% - 260rpx);
}
.icon {
  width: 24rpx;
  height: 30rpx;
  margin-right: 15rpx;
}
.icon img {
  width: 100%;
  height: 100%;
}
.contentheaderText {
  font-size: 28rpx;
  color: #666;
}
.operation {
  padding: 15rpx 20rpx;
  box-sizing: border-box;
  border-top: 1px solid #f1f1f1;
  display: flex;
  justify-content: flex-end;
}
.oper {
  display: flex;
}
.oper > span {
  display: block;
  text-align: center;
  width: 160rpx;
  border-radius: 50rpx;
  line-height: 50rpx;
  font-size: 26rpx;
}
.pay {
  color: white;
  background: #0070cc;
  margin-right: 15rpx;
}
.cancel {
  color: #666;
  border: 1px solid #f1f1f1;
}
.no {
  text-align: center;
  font-size: 30rpx;
  color: #666;
  margin-top: 30rpx;
}

.listTextBottom {
  margin-top: 29rpx;
}
</style>