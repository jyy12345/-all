//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    section: [                            
      { name: '推荐', id: '1001' }, { name: '起范儿', id: '1032' },
      { name: '求真科学营', id: '1003' }, { name: '健康自测', id: '1004' },
      { name: '急救自救', id: '1005' }, { name: '常见疾病', id: '1021' },
      { name: '星动计划', id: '1006' }
    ],
    background: ['https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640', 'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640', 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'],
    indicatorDots: true,
    indicatorColor: 'rgba(196, 196, 196, .3)',
    indicator_active:'#fff',
    autoplay: true,
    interval: 2000,
    duration: 1000
  },
  onLoad: function () {
    
  }
})
