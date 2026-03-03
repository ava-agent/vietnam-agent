# 越南旅游指南 (Vietnam Travel Guide)

一站式越南旅游指南原生移动应用，为中国游客量身打造，帮助您轻松规划越南之旅。

## 功能模块

### 1. 🎒 越南必备物品
- **6大分类**：证件类、衣物类、药品类、电子设备、洗漱用品、其他物品
- **40+物品清单**：每个物品都有详细说明和实用小贴士
- **智能追踪**：勾选状态本地持久化，永不丢失
- **必备标注**：关键物品高亮提醒，避免遗漏
- **一键操作**：全选/清除，快速管理

### 2. 💰 越南金钱换算
- **实时换算**：输入人民币金额，自动计算越南盾
- **快捷金额**：常用金额一键转换 (100/500/1000等)
- **物价参考**：12项常见消费参考 (咖啡、米粉、出租车等)
- **换钱攻略**：银行、ATM、金店换汇技巧

### 3. 📱 常用软件推荐
- **12款精选App**：Grab、Google Maps、Booking、Agoda等
- **分类筛选**：交通/导航/住宿/支付/通讯/美食/工具
- **一键下载**：直接跳转 App Store / Google Play
- **使用技巧**：每款App都有详细使用指南

### 4. 🏖️ 景点攻略
- **5大热门城市**：胡志明市、河内、岘港、芽庄、富国岛
- **每城包含**：
  - 热门景点 (评分、门票、开放时间、小贴士)
  - 美食推荐 (价格、特色、必点)
  - 交通指南 (机场到市区、市内交通)
  - 预算参考 (经济/中等/舒适三档)

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React Native | 0.84.0 | 跨平台移动开发框架 |
| TypeScript | 5.8+ | 类型安全 |
| React Navigation | 7.x | 导航管理 |
| AsyncStorage | 2.x | 本地数据持久化 |
| Vector Icons | 10.x | 图标库 (Ionicons) |
| Jest | 29.x | 单元测试 |

## 项目结构

```
vietnam-agent/
├── App.tsx                     # 应用入口
├── src/
│   ├── components/common/      # 通用组件
│   │   ├── Card.tsx           # 卡片容器
│   │   ├── Badge.tsx          # 标签徽章
│   │   ├── SectionHeader.tsx  # 区块标题
│   │   ├── ErrorBoundary.tsx  # 错误边界
│   │   └── Loading.tsx        # 加载状态
│   ├── constants/              # 常量定义
│   │   └── strings.ts         # 中文字符串
│   ├── context/                # 全局状态
│   │   └── ChecklistContext.tsx
│   ├── data/                   # 静态数据
│   │   ├── checklist.ts       # 清单数据
│   │   ├── currency.ts        # 汇率数据
│   │   ├── apps.ts            # App推荐数据
│   │   └── attractions.ts     # 景点数据
│   ├── hooks/                  # 自定义Hooks
│   │   ├── useCurrencyConverter.ts
│   │   └── useAppFilter.ts
│   ├── navigation/             # 导航配置
│   │   ├── RootNavigator.tsx
│   │   └── types.ts
│   ├── screens/                # 页面组件
│   │   ├── checklist/         # 必备物品
│   │   ├── currency/          # 金钱换算
│   │   ├── apps/              # 常用软件
│   │   └── attractions/       # 景点攻略
│   ├── theme/                  # 主题系统
│   │   ├── colors.ts          # 颜色定义
│   │   ├── typography.ts      # 字体样式
│   │   ├── spacing.ts         # 间距规范
│   │   └── shadows.ts         # 阴影效果
│   ├── types/                  # 类型定义
│   └── utils/                  # 工具函数
│       ├── formatCurrency.ts  # 货币格式化
│       ├── storage.ts         # 存储工具
│       └── openLink.ts        # 链接工具
├── __tests__/                  # 测试文件
├── android/                    # Android 原生代码
├── ios/                        # iOS 原生代码
└── .github/workflows/          # CI/CD 配置
```

## 快速开始

### 环境要求

| 依赖 | 版本 |
|------|------|
| Node.js | >= 22.11.0 |
| JDK | 17 (Android) |
| Xcode | 15+ (iOS, macOS only) |
| Android SDK | API 34+ |

### 安装

```bash
# 克隆项目
git clone https://github.com/ava-agent/vietnam-agent.git
cd vietnam-agent

# 安装依赖
npm install

# iOS 需要安装 Pods
cd ios && pod install && cd ..
```

### 运行

```bash
# Android
npm run android

# iOS
npm run ios

# 启动开发服务器
npm start
```

### 测试

```bash
# 运行所有测试
npm test

# TypeScript 类型检查
npx tsc --noEmit

# ESLint 代码规范检查
npm run lint
```

## 构建发布

### Android Release APK

```bash
# 1. 配置签名 (首次)
# 编辑 android/gradle.properties 添加:
VIETNAM_RELEASE_STORE_FILE=vietnam-release.keystore
VIETNAM_RELEASE_STORE_PASSWORD=your-password
VIETNAM_RELEASE_KEY_ALIAS=vietnam-guide
VIETNAM_RELEASE_KEY_PASSWORD=your-password

# 2. 构建
cd android && ./gradlew assembleRelease

# 3. 输出位置
# android/app/build/outputs/apk/release/app-release.apk
```

### iOS Release

```bash
# 使用 Xcode 构建
# 1. 打开 ios/VietnamGuide.xcworkspace
# 2. 选择 Product > Archive
# 3. 上传到 App Store Connect
```

## CI/CD

项目配置了 GitHub Actions 自动化流水线：

| 触发条件 | 执行操作 |
|----------|----------|
| 推送到 main | 构建 APK + 运行测试 |
| 创建 Tag (v*) | 发布 GitHub Release + 上传 APK |
| Pull Request | TypeScript 检查 + Jest 测试 |

### 配置 GitHub Secrets

在仓库 Settings → Secrets 中添加：

| Secret | 说明 |
|--------|------|
| RELEASE_KEYSTORE_BASE64 | keystore 文件的 base64 编码 |
| RELEASE_STORE_PASSWORD | keystore 密码 |
| RELEASE_KEY_ALIAS | 密钥别名 |
| RELEASE_KEY_PASSWORD | 密钥密码 |

## 代码质量

| 指标 | 状态 |
|------|------|
| TypeScript | ✅ 零错误 |
| ESLint | ✅ 零警告 |
| Jest 测试 | ✅ 33/33 通过 |
| 无障碍支持 | ✅ accessibilityRole/Label |
| 性能优化 | ✅ useCallback/useMemo |

## 更新日志

### v1.0.0 (2026-03-03)
- 🎉 首次发布
- ✨ 四大核心模块：必备物品、金钱换算、常用软件、景点攻略
- 🎨 越南风格主题设计
- 📱 支持 iOS 和 Android
- 🌐 完整中文化

## 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## License

MIT License - 详见 [LICENSE](LICENSE) 文件

---

<p align="center">
  Made with ❤️ for Vietnam travelers
</p>
