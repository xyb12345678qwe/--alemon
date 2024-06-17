## 前言

[QQ 开放平台](https://q.qq.com/#/)

[KOOK 平台](https://developer.kookapp.cn/doc/)

> 配置了解[https://alemonjs.com](https://alemonjs.com/)

## 使用方法

先在目录下创建alemon.login.ts文件

里面输入

```js
import { ALoginOptions } from 'alemonjs'
export default ALoginOptions({
  test: {
   .....
  }
})
```

```sh
npm run app
```

- 开发模式

```sh
npm run dev
```

- 打包应用

```sh
npm run build
```

- 后台运行

```sh
npm run start
```

- 杀死运行

```sh
npm run pm2 kill
```
