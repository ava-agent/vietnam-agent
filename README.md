# 越南旅游指南 (Vietnam Travel Guide)

一站式越南旅游指南原生移动应用，为中国游客量身打造。

## 功能模块

### 1. 越南必备物品
- 6大分类，40+物品清单
- 勾选状态本地持久化 (AsyncStorage)
- 进度追踪，一键全选/清除
- 必备物品高亮标注 + 小贴士

### 2. 越南金钱换算
- 实时人民币/越南盾汇率换算
- 快捷金额一键转换
- 越南物价参考 (12项常见消费)
- 换钱小贴士 (银行/ATM/黑市)

### 3. 常用软件推荐
- 12款精选App (Grab/Google Maps/Booking等)
- 分类筛选 (交通/导航/住宿/支付/通讯/美食/工具)
- 一键跳转应用商店下载
- 展开查看使用技巧

### 4. 景点攻略
- 5大热门城市 (胡志明市/河内/岘港/芽庄/富国岛)
- 每城包含：景点/美食/交通/预算
- 景点评分、门票、开放时间
- 每日预算参考 (经济/中等/舒适)

## 技术栈

| 技术 | 版本 |
|------|------|
| React Native | 0.84.0 |
| TypeScript | 5.8+ |
| React Navigation | 7.x |
| AsyncStorage | 2.x |
| Vector Icons (Ionicons) | 10.x |

## 项目结构

```
src/
├── components/common/    # 通用组件 (Card, Badge, SectionHeader)
├── constants/            # 字符串常量
├── context/              # ChecklistContext (状态管理)
├── data/                 # 静态数据 (清单/汇率/App/景点)
├── hooks/                # 自定义Hooks
├── navigation/           # 导航配置 (Tab + Stack)
├── screens/              # 页面组件
│   ├── checklist/        # 必备物品 (列表 + 详情)
│   ├── currency/         # 金钱换算
│   ├── apps/             # 常用软件
│   └── attractions/      # 景点攻略 (列表 + 城市详情)
├── theme/                # 主题系统 (颜色/字体/间距/阴影)
├── types/                # TypeScript类型定义
└── utils/                # 工具函数 (格式化/存储/链接)
```

## 快速开始

### 环境要求
- Node.js >= 22
- JDK 17 (Android)
- Xcode 15+ (iOS, macOS only)

### 安装

```bash
npm install
```

### 运行

```bash
# Android
npm run android

# iOS
cd ios && pod install && cd ..
npm run ios

# Metro Dev Server
npm start
```

### 测试

```bash
# 运行所有测试 (33个)
npm test

# TypeScript 类型检查
npx tsc --noEmit

# ESLint 代码规范
npx eslint src/ App.tsx
```

## 构建发布

### Android APK

```bash
cd android && ./gradlew assembleRelease
```

输出路径: `android/app/build/outputs/apk/release/app-release.apk`

> 注意: Release构建需要在 `android/gradle.properties` 中配置签名密钥

### CI/CD

项目配置了 GitHub Actions 自动化流水线:
- **推送 main**: 自动构建 APK + 运行测试
- **创建 Tag (v\*)**: 自动发布 GitHub Release 并上传 APK
- **Pull Request**: 自动运行 TypeScript 检查 + Jest 测试

## 代码质量

- TypeScript 严格模式 - 零错误
- ESLint - 零警告
- Jest 测试 - 33个测试全部通过
- 无障碍支持 - accessibilityRole/accessibilityLabel
- 性能优化 - useCallback/useMemo/React.memo

## License

MIT
