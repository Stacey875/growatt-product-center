# Growatt Product Center V1.3 — Leadership Preview

可直接部署至 GitHub Pages 的静态产品知识平台。

## V1.3 已完成

- 首页 Dashboard 与领导汇报入口
- Residential Digital Products 产品线总览
- Product Portfolio 生命周期与迁移状态矩阵
- New ShinePhone 产品定位、用户、功能架构与当前重点问题
- Cloud → Plant → Collector → Device 平台架构
- Device Center 与设备兼容矩阵
- Capability / Schema / New Device Enablement
- Migration Center、Product Governance、Metrics 与 Roadmap
- 中英文切换、全局搜索、响应式布局
- 静态资源版本参数，减少 GitHub Pages 浏览器缓存问题

## 如何验证版本

1. 打开仓库根目录 `README.md`，标题应为 `V1.3`。
2. 打开 `app.js` 搜索 `V1.3`，应能找到多个结果。
3. 打开线上网站，左侧底部应显示 `V1.3 · Leadership Preview`。
4. 页面标题应显示 `Growatt Product Center · V1.3`。

## 部署

将以下文件覆盖上传到 GitHub 仓库根目录：

- `index.html`
- `styles.css`
- `app.js`
- `README.md`
- `LEADERSHIP-DEMO.md`
- `.nojekyll`

提交后等待 GitHub Pages 自动更新，再使用 `Ctrl + Shift + R` 强制刷新。
