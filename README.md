# chrome-plugin-account-saver
帮助用户区分登录环境的chrome插件

### 数据结构
```
const typeList = [
  {
    envName: '环境名称',
    id: 1,
    envList: [{
      name: '',
      id: 1,
      protocol: 'http://',
      host: ''
    }]
  }
]
```