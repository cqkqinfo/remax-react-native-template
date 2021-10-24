# Remax React Native

使用 Remax 开发原生应用，支持 less module 和样式继承，不支持样式嵌套，可以搭配[凯桥全平台 UI 库](https://cqkqinfo.github.io/ui/)一起使用。

![image](https://kq-static.oss-cn-beijing.aliyuncs.com/ui/remax-rn-test.gif)

## Getting Start

安装依赖

```bash
yarn
```

调试项目

```bash
# 选定要进行开发的平台，如 ios，并调试
yarn dev:ios
```

使用小程序开发者工具打开项目下的 `dist/[target]` 目录。

## 构建

```bash
# 选定要构建的平台，如 wechat，并执行构建
$ yarn build:wechat
```

使用小程序开发者工具打开项目下的 `dist/[target]` 目录，上传代码即可。

`ios`请用`xcode`工具构建

## 钉钉交流群

<img width="320" src="https://kq-static.oss-cn-beijing.aliyuncs.com/common-img/IMG_8025.JPG">
