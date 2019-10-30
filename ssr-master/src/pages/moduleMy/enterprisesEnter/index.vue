<template>
  <div class="enter">
    <ul class="main">
      <li class="mainavatar">
        <span class="text">头像</span>
        <div class="avatar logo">
          <img :src="avatar" alt />
        </div>
      </li>
      <li class="mainLis">
        <span class="text">公司</span>
        <!-- <div class="company" v-if="certificationIsHide">
          <span class="subText">{{companyName}}</span>
        </div>-->
        <!-- <span class="info" @click="infoHide" v-else>
          <img src="/static/images/noenterprisesEnter.png" alt />
          <span class="subText">请选择公司</span>
        </span>-->
        <span class="subText" @click="infoHide">{{companyName}}</span>
      </li>
      <li class="mainLis">
        <span class="text">姓名</span>
        <span class="subText" v-if="nameIshide">{{name}}</span>
        <input
          type="text"
          style="text-align:right;"
          class="subText"
          placeholder-style="color:#555;"
          placeholder="请输入姓名"
          v-model="name"
          v-else
        />
      </li>
      <li class="mainLis">
        <span class="text">职位</span>
        <picker
          mode="selector"
          class="position"
          :range="positionList"
          range-key="name"
          @change="positionChange"
        >
          <!-- <input
            type="text"
            style="text-align:right;"
            placeholder="请输入职位"
            class="subText"
            v-model="position"
          />-->
          <span class="subText">{{position}}</span>
        </picker>
      </li>
      <li class="mainLis">
        <span class="text">省份</span>
        <picker mode="selector" :range="provinceList" @change="provinceChange">
          <!-- <input
            type="text"
            style="text-align:right;"
            placeholder="请输入省份"
            class="subText"
            v-model="province"
          />-->
          <span class="subText">{{province}}</span>
        </picker>
      </li>
      <li class="mainLis">
        <span class="text">手机号</span>
        <span
          class="subText"
          style="color:#0070cc;"
          @click="if_pop = !if_pop"
        >{{if_pop ? tel : phonetxt}}</span>
      </li>
      <li class="mainLis">
        <span class="text">性别</span>
        <picker mode="selector" :range="genderList" @change="genderChange">
          <!-- <input
            type="text"
            style="text-align:right;"
            placeholder="请输入性别"
            class="subText"
            v-model="gender"
          />-->
          <span class="subText">{{gender}}</span>
        </picker>
      </li>
      <li class="mainLis">
        <span class="text">出生年月</span>
        <picker mode="date" start="1800-01-01" end="2019-10-17" @change="yearChange">
          <!-- <input
            type="text"
            style="text-align:right;"
            placeholder="请输入出生年月"
            class="subText"
            v-model="year"
          />-->
          <span class="subText">{{year}}</span>
        </picker>
      </li>
    </ul>
    <footer class="footer">
      <span class="submit" @click="submit">保存</span>
    </footer>
    <vague
      v-if="vagusIsHide"
      :companyList="companyList"
      @detailsUpdate="detailsUpdate"
      @retu="retu"
    ></vague>
  </div>
</template>
<script>
import "../../../../static/wxss/enter.wxss";
import vague from "../../../components/vagueSearch";
import { toast } from "../../../utils/validate";
export default {
  data() {
    return {
      avatar: "", //头像
      name: "张先生",
      companyName: "", //公司名称
      position: "", //职位
      positionList: ["总经理", "部门经理"],
      province: "北京", //省份
      provinceList: [
        "北京",
        "广东",
        "山东",
        "江苏",
        "河南",
        "上海",
        "河北",
        "浙江",
        "香港",
        "陕西",
        "湖南",
        "重庆",
        "福建",
        "天津",
        "云南",
        "四川",
        "广西",
        "安徽",
        "海南",
        "江西",
        "湖北",
        "山西",
        "辽宁",
        "台湾",
        "黑龙江",
        "内蒙古",
        "澳门",
        "贵州",
        "甘肃",
        "青海",
        "新疆",
        "西藏",
        "吉林",
        "宁夏"
      ],
      tel: "152****1111", //手机号
      gender: "男",
      genderList: ["男", "女"],
      year: "1990-09-10",
      vagusIsHide: false, //模糊搜索显示隐藏
      companyList: [],
      companyIshide: false,
      if_pop: true,
      phonetxt: "",
      company_id: 0, //公司id
      certificationIsHide: false, //判断认证状态 注：这里为什么直接在v-if中拿1 2 3来判断当前状态因为mpvue在v-if||v-show不支持复杂运算 || && 都算
      nameIshide: false
    };
  },
  onLoad(v) {
    // this.certification = Number(v.certification);
    if (v.certification == 2 || v.certification == 3) {
      this.nameIshide = true;
      this.certificationIsHide = true;
    } else {
      this.nameIshide = false;
      this.certificationIsHide = false;
    }
    this.avatar = v.avatarUrl;
  },
  mounted() {
    this.init();
    this.positionInit();
  },
  components: { vague },
  methods: {
    positionChange(e) {
      this.position = this.positionList[e.target.value]["name"];
    },
    genderChange(e) {
      this.gender = this.genderList[e.target.value];
    },
    provinceChange(e) {
      // let value = e.target.value;
      // if (value[0] == value[1]) this.province = value[1] + value[2];
      // else this.province = value[0] + value[1] + value[2];
      this.province = this.provinceList[e.target.value];
    },
    yearChange(e) {
      this.year = e.target.value;
    },
    retu() {
      this.vagusIsHide = false;
    },
    positionInit() {
      //获取职位列表
      this.axios
        .post({
          url: "/api/company/position"
        })
        .then(res => {
          if (res.data.status == "200") this.positionList = res.data.data;
          else toast(res.data.message);
        });
    },
    submit() {
      if (this.companyName == "" || this.companyName == "请选择公司") {
        toast("公司名称没有填写");
        return;
      }
      if (this.name == "") {
        toast("姓名没有填写");
        return;
      }
      if (this.position == "" || this.position == "请选择职位") {
        toast("职位没有填写");
        return;
      }
      if (this.province == "" || this.province == "请选择省份") {
        toast("省份没有填写");
        return;
      }
      if (this.gender == "") {
        toast("性别没有填写");
        return;
      }
      wx.setStorageSync(
        "userInfo",
        JSON.stringify({ nickName: this.name, avatarUrl: this.avatar })
      );
      let query = {
        company_id: this.company_id, //公司id
        username: this.name, //姓名
        position: this.position, //职位
        province: this.province, //省份
        birth: this.year //出生日期
      };
      this.axios
        .post({
          url: `/api/personal/update`,
          data: query
        })
        .then(res => {
          if (res.data.status == "200") {
            toast("更新成功");
            wx.reLaunch({ url: "../../my/main" });
          } else if (res.data.status == "400") {
            toast(res.data.message);
          }
        });
    },
    infoHide() {
      if (this.certificationIsHide) this.vagusIsHide = false;
      else this.vagusIsHide = true;
      // this.vagusIsHide = true;
    },
    init() {
      this.axios
        .post({
          url: `/api/personal/info`
        })
        .then(res => {
          if (res.data.status == "200") {
            let data = res.data.data;
            this.gender = data.gender == 1 ? "男" : "女";
            this.year = data.birth;
            // this.avatar = data.cover;
            this.province = data.province ? data.province : "请选择省份";
            this.phonetxt = data.phone;
            this.tel = String(data.phone).replace(
              /(\d{3})\d{4}(\d{4})/,
              "$1****$2"
            );
            // if (data.companyName != "") {
            //   this.companyName = data.company_name;
            //   // this.certification = 3;
            // } else {
            //   // this.certification = 1;
            // }
            this.companyName =
              data.company_name != "" ? data.company_name : "请选择公司";
            this.position = data.position ? data.position : "请选择职位";
            this.name = data.username;
          }
        });
    },
    detailsUpdate(item) {
      //模糊搜索回调
      this.vagusIsHide = false;
      this.companyName = item.name;
      this.company_id = item.id;
      // this.certificationIsHide = true;
    }
  }
};
</script>
<style scoped>
.enter {
  position: relative;
}
.info {
  width: 134rpx;
  height: 54rpx;
}
.info > img {
  width: 100%;
  height: 100%;
}
.subText {
  display: block;
  text-align: right;
  font-weight: 500;
}
/* .position > span{
  font-size: 30rpx;
  color: #555555;
  font-weight: 500;
} */
</style>