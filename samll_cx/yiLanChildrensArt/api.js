import md5 from 'md5.js';

const TEST_HOST = "https://mobile-test.jd.com", //测试接口
  PROD_HOST = "https://pub.yilanmeishu.com"; //新建接口

var getsignByData = function (obj) {
  return md5(JSON.stringify(obj) + md5("15510050497" + "de67f0c0-edea-441f-806a-759673f1e870"));
};

var token = "de67f0c0-edea-441f-806a-759673f1e870";
let isTest = false,
  host = isTest ? TEST_HOST : PROD_HOST,
  api = {
    "core": host +"/api/xiaochengxu/home/query_module_1.ajax",//我们是这样的   中心介绍  课程体系
    "Student": host +"/api/xiaochengxu/home/query_module_1_student_works.ajax",//学员作品
    "studentdesit": host +"/api/xiaochengxu/home/query_module_1_student_works_detail.ajax",//学员作品详情
    "teacherTeam": host +"/api/xiaochengxu/home/query_module_1.ajax",//教师团队
    "artCircles": host +"/api/xiaochengxu/home/query_activity_arrange.ajax",//艺术圈首页
    "appreciation": host +"/api/xiaochengxu/home/query_art_appreciation.ajax",//艺术鉴赏
    "appreciationDist": host +"/api/xiaochengxu/home/query_beauty_history_artist_story.ajax",//艺术鉴赏详情
    "masterWorks": host +"/api/xiaochengxu/home/query_master_works.ajax",//大师作品
    "masterWorksBf": host +"/api/xiaochengxu/home/query_master_works_detail.ajax",//大师作品播放
    "activity": host + "/api/xiaochengxu/home/query_activity_arrange_sign_up.ajax",//活动安排表单提交
    "myBaby": host +"/api/xiaochengxu/user/student.ajax",//我的宝贝首页菜单
    "babyWorks": host +"/api/xiaochengxu/user/baby_works.ajax",//宝贝作品
    "makeup": host +"/api/xiaochengxu/user/supplement_course.ajax",//请假补课首页
    "leave": host +"/api/xiaochengxu/user/supplement_leave_submit.ajax",//请假
    "lessonsup": host +"/api/xiaochengxu/user/query_supplement_course.ajax",//补课
    "makeupsuccess": host +"/api/xiaochengxu/user/supplement_course_submit.ajax",//补课提交
    "classadjustment": host +"/api/xiaochengxu/user/class_update.ajax",//班级调整
    "classsubit": host +"/api/xiaochengxu/user/class_update_submit.ajax",//班级调整提交
    "leaveData": host +"/api/xiaochengxu/user/query_supplement_course_num.ajax",//请假需补课天数
    "myBabys": host + "/api/xiaochengxu/user/invitations.ajax",//帮友邀约
    "myBabysbtn": host + "/api/xiaochengxu/user/invitations_submit.ajax",//帮友邀约提交
    "exchange": host +"/api/xiaochengxu/user/query_exchange.ajax",//兑换
    "exchangebtn": host +"/api/xiaochengxu/user/exchange_submit.ajax",//兑换提交
    "integralDetails": host +"/api/xiaochengxu/user/current_integarl_list.ajax",//积分明细
    "activityContent": host +"/api/xiaochengxu/user/activity_content_list.ajax",//活动内容
    "news": host +"/api/xiaochengxu/user/latest_notice.ajax",//最新消息
    "readNews": host +"/api/xiaochengxu/user/latest_notice_submit.ajax",//已阅
    "studentarchives": host +"/api/xiaochengxu/user/student_files.ajax",//学生档案
    "curriculum": host +"/api/xiaochengxu/user/teacher.ajax",//老师模块首页
    "curriculumCode": host + "/api/xiaochengxu/user/teaching_case.ajax",//老师模块首页课程编号查询教案
    "teachingPlanname": host +"/api/xiaochengxu/user/teaching_case.ajax",//获取教案name
    "lesson": host +"/api/xiaochengxu/user/query_teaching_case.ajax",  //根据id获取教案
    "inquiryCourse": host +"/api/xiaochengxu/user/query_course_student.ajax",
    "courseContent": host +"/api/xiaochengxu/user/query_course_info.ajax",//获取课程内容
    "classBegins": host +"/api/xiaochengxu/user/student_can_class.ajax",//判断是否可以上课
    "worksDetails": host +"/api/xiaochengxu/home/query_module_3_work_detail.ajax",//作品详情
    "worksList": host +"/api/xiaochengxu/home/query_module_3.ajax",//上传作品首页list
    "currevaluation": host +"/api/xiaochengxu/user/course_comment.ajax",//老师页面课程评价
    "verificationCode": host +"/api/xiaochengxu/user/get_verification_code.ajax",//获取验证码,
    "auditionTime": host +"/api/xiaochengxu/auditions/experience_time.ajax",//试听时段
    "audition": host + "/api/xiaochengxu/auditions/experience.ajax",//试听提交
    "logos": host +"/api/xiaochengxu/user/login.ajax",//登录
    "hdAp": host +"/api/xiaochengxu/home/query_activity_arrange_detail.ajax",//活动安排详情
    "huodAp": host +"/api/xiaochengxu/home/query_module_2.ajax",//艺术圈
    "babydetile": host +"/api/xiaochengxu/user/baby_works_detail.ajax",//宝贝作品详情
    "evaluateSuess": host +"/api/xiaochengxu/user/course_comment_finish.ajax",//评价完成提交
    "upende": host +"/api/xiaochengxu/home/query_module_3_work_upload.ajax",//拍照测评
    "md5": function (obj) {
      return md5(obj);
    },
    "getParams": function (obj) {
      obj.time = Date.parse(new Date());
      var params = {
        // 'username': wx.getStorageSync("s-username"),
        'username': "15510050497",
        'args': JSON.stringify(obj),
        'sign': getsignByData(obj)
      };
      return params;
    },
    "token": token

  }


export default api