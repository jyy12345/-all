<template>
  <div class="enter">
    <ul class="main">
      <li class="mainavatar">
        <span class="text">头像</span>
        <div class="avatar logo"></div>
      </li>
      <li class="mainLis">
        <span class="text">公司</span>
        <div class="company">
          <span class="subText" style="color:#0070cc;">北京细水科技有限公司</span>
          <!-- <div class="el-down"></div> -->
        </div>
      </li>
      <li class="mainLis">
        <span class="text">姓名</span>
        <span class="subText">张先生</span>
      </li>
      <li class="mainLis">
        <span class="text">职位</span>
        <span class="subText">xxx</span>
      </li>
      <li class="mainLis">
        <span class="text">省份</span>
        <span class="subText">北京</span>
      </li>
      <li class="mainLis">
        <span class="text">手机号</span>
        <span class="subText" style="color:#0070cc;">152****1111</span>
      </li>
      <li class="mainLis">
        <span class="text">性别</span>
        <span class="subText">男</span>
      </li>
      <li class="mainLis">
        <span class="text">出生年月</span>
        <span class="subText">1990-09-10</span>
      </li>
    </ul>
    <footer class="footer">
      <span class="submit">提交</span>
    </footer>
  </div>
</template>
<script>
import "../../../../static/wxss/enter.wxss";
export default {
  data() {
    return {
      avatar: "" //头像
    };
  }
};
</script>
<style scoped>
</style>