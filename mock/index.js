import Mock from 'mockjs'
Mock.mock(/\/mock\/test/g, {
  ret: 0,
  data: {
    mtime: '@datetime',
    'value|1-100': 1,
    nickname: '@cname',
    avatar: "@image('100x50','#ffcc33','#FFF','png','小凡')",
  },
})
