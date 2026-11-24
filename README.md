# React Todo 示例项目

基于 **React 19 + Vite** 构建的待办事项应用。

## 功能

- ✅ 添加待办事项（支持回车快捷键）
- ✅ 点击文字切换完成/未完成状态
- ✅ 删除待办事项
- ✅ 按状态筛选（全部 / 进行中 / 已完成）
- ✅ 实时统计任务数量

## 快速开始

```bash
# 1. 进入项目目录
cd react-todo-demo

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 浏览器打开 http://localhost:5173
```

## 项目结构

```
react-todo-demo/
├── public/           # 静态资源
├── src/
│   ├── main.jsx      # 应用入口
│   ├── App.jsx       # 主组件（Todo 逻辑）
│   ├── App.css       # 组件样式
│   └── index.css     # 全局样式
├── index.html        # HTML 模板
├── vite.config.js    # Vite 配置
└── package.json      # 项目配置
```

## 技术要点

| 概念 | 说明 |
|------|------|
| `useState` | 管理组件状态（todos、inputValue、filter） |
| `useCallback` | 缓存事件处理函数，避免不必要的重渲染 |
| 组件拆分 | `TodoItem`、`FilterButton` 作为独立子组件 |
| 条件渲染 | 根据 filter 状态筛选列表，空列表显示提示 |
| CSS 动画 | 页面加载时的滑入动画、按钮悬停效果 |
