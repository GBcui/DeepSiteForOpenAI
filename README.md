---
title: DeepSite
emoji: 🐳
colorFrom: blue
colorTo: blue
sdk: docker
pinned: true
app_port: 5173
license: mit
short_description: Generate any application with DeepSeek
models:
  - deepseek-ai/DeepSeek-V3-0324
---

# DeepSite 🚀

DeepSite 是一个基于 React + TypeScript + Vite 构建的智能应用生成器，集成了 Monaco Editor 和 OpenAI，提供强大的代码编辑和 AI 辅助功能。

## 技术栈 💻

- **前端框架**: React 19
- **开发语言**: TypeScript 5.7
- **构建工具**: Vite 6
- **UI 框架**: Tailwind CSS 4
- **代码编辑器**: Monaco Editor
- **AI 集成**: OpenAI API
- **其他特性**: 
  - React Speech Recognition
  - React Markdown
  - React Toastify

## 快速开始 🚀

### 环境要求

- Node.js >= 16
- npm 或 yarn
- Docker（可选，用于容器化部署）

### 本地开发

1. 克隆仓库：
```bash
git clone <repository-url>
cd deepsite
```

2. 安装依赖：
```bash
npm install
```

3. 配置环境变量：
```bash
cp .env.example .env
# 编辑 .env 文件，填入必要的配置信息
```

4. 启动开发服务器：
```bash
npm run dev
```

5. 构建生产版本：
```bash
npm run build
```

## 项目结构 📁

```
deepsite/
├── src/
│   ├── components/     # React 组件
│   ├── config/        # 配置文件
│   ├── assets/        # 静态资源
│   └── main.tsx       # 应用入口
├── services/          # 后端服务
├── middlewares/       # Express 中间件
├── utils/            # 工具函数
├── public/           # 公共资源
└── dist/             # 构建输出目录
```

## 开发命令 ⌨️

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run preview` - 预览生产构建
- `npm run lint` - 运行 ESLint 检查
- `npm start` - 启动生产服务器

## 环境变量配置 ⚙️

在 `.env` 文件中配置以下环境变量：

```env
VITE_APP_TITLE=DeepSite
OPENAI_API_KEY=your_api_key
PORT=5173
```

## 贡献指南 🤝

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

