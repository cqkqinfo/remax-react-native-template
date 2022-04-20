# Remax React Native

使用 Remax 开发原生应用，支持直接使用 remax 里的跨平台方法、生命周期、less module 和样式继承，去掉了很多 RN 的使用限制，不支持样式嵌套，可以搭配[凯桥全平台 UI 库](https://cqkqinfo.github.io/ui/)一起使用。

![image](https://kq-static.oss-cn-beijing.aliyuncs.com/ui/remax-rn-test.gif)

## Getting Start

开发前需要[配置 ReactNative 环境](https://www.react-native.cn/docs/environment-setup)

安装依赖

```bash
# 执行下面命令装包，没有yarn的话需要先安装 https://yarn.bootcss.com/
yarn
# 如果需要开发iOS平台
cd ios && pod install
```

运行项目

```bash
# 选定要进行开发的平台，如 android，并调试
yarn dev:android
```

小程序开发者工具打开项目下的 `dist/[target]` 目录。

android 如需开发原生代码：android studio 打开 `android` 目录。

iOS 如需开发原生代码：xcode 打开 `ios` 目录。

## 构建

```bash
# 选定要构建的平台，如 wechat，并执行构建
$ yarn build:wechat
```

使用小程序开发者工具打开项目下的 `dist/[target]` 目录，上传代码即可。

`ios`请用`xcode`工具构建

## 钉钉交流群

<img width="320" src="https://kq-static.oss-cn-beijing.aliyuncs.com/common-img/IMG_8025.JPG">
