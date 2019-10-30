<template>
  <div class="login">
    <p class="title">请填写您个人使用的手机号</p>
    <section class="form">
      <div class="tel">
        <span class="text">手机号</span>
        <input
          type="number"
          class="inputTel"
          placeholder="请输入手机号"
          @input="checkNo(phone)"
          v-model="phone"
        />
      </div>
      <div class="code">
        <span class="text">验证码</span>
        <div class="codeEdit">
          <input type="number" placeholder="请输入验证码" v-model="code" />
          <span class="getCode" @click="getCode">{{codeText == '获取验证码'? '获取验证码' :againCode }}</span>
        </div>
      </div>
    </section>
    <div class="bottom">
      <!-- <span class="btnLogin" @click="submit">登录</span> -->
      <button open-type="getUserInfo" class="btnLogin" @getuserinfo="bindGetUserInfo">登录</button>
    </div>
  </div>
</template>
<script>
import { validatePhone, toast } from "../../utils/validate";
export default {
  data() {
    return {
      phone: "",
      code: "",
      codeText: "获取验证码",
      timer: null
    };
  },
  computed: {
    againCode() {
      return `${this.codeText}S`;
    }
  },
  methods: {
    checkNo(e) {
      let reg = /^\S+$/;
      console.log(e);
      if (e) {
        if (new RegExp(reg).test(e) == false) {
          this.phone = this.phone.trim();
        }
      }
    },
    detail() {},
    bindGetUserInfo(e) {
      if (e.mp.detail.rawData) {
        if (this.phone == "") {
          toast("请输入手机号");
          return;
        }
        if (!validatePhone(this.phone)) {
          toast("请输入正确的手机号");
          return;
        }
        if (this.code == "") {
          toast("请输入验证码");
          return;
        }
        this.submit().then(res => {
          if (res == "200") {
            wx.setStorageSync("userInfo", JSON.stringify(e.target.userInfo));
            wx.reLaunch({
              url: "../my/main"
            });
          } else return;
        });
        wx.login({
          success: res => {
            if (res.code) {
              this.axios
                .post({
                  url: "/api/auth",
                  data: { code: res.code }
                })
                .then(re => {
                  if (re.data.status == "200") {
                    wx.setStorageSync("openid", re.data.data.openid);
                  }
                });
            }
          }
        });
      }
    },
    getCode() {
      //倒计时
      if (this.phone == "") {
        toast("请输入手机号");
        return;
      }
      if (!validatePhone(this.phone)) {
        toast("请输入正确的手机号");
        return;
      }
      if (!this.timer) {
        this.codeText = 60;
        this.getCodeSms();
        this.timer = setInterval(() => {
          if (this.codeText > 1) {
            this.codeText--;
            this.codeText < 10
              ? (this.codeText = "0" + this.codeText)
              : (this.codeText = this.codeText);
          } else {
            clearInterval(this.timer);
            this.timer = null;
            this.codeText = "获取验证码";
          }
        }, 1000);
      }
    },
    submit() {
      return new Promise((resolve, reject) => {
        this.axios
          .post({
            url: "/api/login",
            data: {
              phone: this.phone,
              code: this.code
            }
          })
          .then(res => {
            if (res.data.status == "200") {
              wx.setStorageSync("token", res.data.data.token);
              resolve(res.data.status);
            } else {
              toast("验证码错误");
              reject("验证码错误");
              return;
            }
          });
      });
    },
    getCodeSms() {
      //获取验证码
      if (validatePhone(this.phone) && this.phone != "") {
        this.axios
          .post({
            url: "/api/sms",
            data: {
              phone: this.phone
            }
          })
          .then(res => {
            if ((res.data.status = "200")) {
              wx.showToast({
                title: "发送成功",
                icon: "none",
                duration: 2000
              });
            }
          });
      } else {
        toast("请输入正确的手机号");
        return;
      }
    }
  }
};
</script>
<style  scoped>
.login {
  width: 100%;
  height: 100vh;
  background: #f4f4f4;
}
.title {
  padding: 25rpx 20rpx;
  box-sizing: border-box;
  font-size: 28rpx;
  color: #666;
}
.form {
  padding: 25rpx 20rpx;
  box-sizing: border-box;
  background: white;
}
.tel,
.code {
  display: flex;
  padding: 35rpx 0;
  box-sizing: border-box;
}
.tel {
  border-bottom: 1px solid #e2e2e2;
}
.text {
  font-size: 30rpx;
  font-weight: 550;
  margin-right: 80rpx;
}
.codeEdit {
  display: flex;
  align-items: center;
}
.getCode {
  font-size: 30rpx;
  font-weight: 550;
  color: #0070cc;
  text-align: center;
}
.bottom {
  padding: 0 20rpx;
  box-sizing: border-box;
}
.btnLogin {
  display: block;
  border-radius: 50rpx;
  text-align: center;
  width: 100%;
  line-height: 90rpx;
  color: white;
  font-size: 30rpx;
  font-weight: 500;
  margin-top: 45rpx;
  background: #0070cc;
}
</style>